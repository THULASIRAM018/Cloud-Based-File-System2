import { FaFile, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileWord, FaFolder, FaRegStar, FaStar } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FileOrFolderItem } from "../Directory/Directory";
import { useUserContext } from "../../Context Api/UserContext";
import "./style.css";
import "./Responsive.css";

const iconMap: Record<string, { icon: IconType; color: string }> = {
  image: { icon: FaFileImage, color: "text-blue-500" },
  excel: { icon: FaFileExcel, color: "text-green-500" },
  word: { icon: FaFileWord, color: "text-blue-500" },
  pdf: { icon: FaFilePdf, color: "text-red-400" },
  ppt: { icon: FaFilePowerpoint, color: "text-orange-500" },
  video: { icon: FaFileVideo, color: "text-purple-500" },
  folder: { icon: FaFolder, color: "text-yellow-500" },
  default: { icon: FaFile, color: "text-gray-500" },
};

function getFileType(name: string) {
  const extension = name.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(extension || "")) return "image";
  if (["xlsx", "xls"].includes(extension || "")) return "excel";
  if (["doc", "docx"].includes(extension || "")) return "word";
  if (extension === "pdf") return "pdf";
  if (["ppt", "pptx"].includes(extension || "")) return "ppt";
  if (["mp4", "avi", "mov", "wmv", "mkv", "webm"].includes(extension || "")) return "video";
  return "default";
}

type Props = {
  data: FileOrFolderItem[];
  setData: React.Dispatch<React.SetStateAction<FileOrFolderItem[]>>;
  onOpenFolder?: (path: string) => void;
  onPreviewFile?: (file: FileOrFolderItem) => void;
};

function FilesAndFolders({ data, setData, onOpenFolder, onPreviewFile }: Props) {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { userName } = useUserContext();
  const [starred, setStarred] = useState<FileOrFolderItem[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!userName) return;
    axios.get(`${API}/api/starred/${userName}`, { withCredentials: true }).then((response) => {
      if (response.data.success) setStarred(response.data.data);
    }).catch(console.error);
  }, [API, userName, data]);

  const toggleStar = async (item: FileOrFolderItem) => {
    try {
      if (starred.some((entry) => entry.fileId === item._id)) {
        const response = await axios.delete(`${API}/api/starred/${item._id}?userName=${userName}`, { withCredentials: true });
        if (response.data.success) setStarred(response.data.data);
      } else {
        const response = await axios.post(`${API}/api/starred`, { ...item, userName }, { withCredentials: true });
        if (response.data.success) setStarred(response.data.data);
      }
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error?.response?.data?.message || "Something went wrong" });
    }
  };

  const download = async (item: FileOrFolderItem) => {
    try {
      const type = item.type === "folder" ? "folder/download" : "file/download";
      const response = await axios.get(`${API}/api/${type}/${item.path}`, { responseType: "blob", withCredentials: true });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = `${item.name}${item.type === "folder" ? ".zip" : ""}`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error?.response?.data?.message || "Download failed" });
    }
  };

  const remove = async (item: FileOrFolderItem) => {
    try {
      const endpoint = item.type === "folder" ? "folder" : "file/delete";
      const response = await axios.delete(`${API}/api/${endpoint}`, { data: { path: item.path, parentPath: item.parentPath }, withCredentials: true });
      if (response.data.success) setData(response.data.data);
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error?.response?.data?.message || "Delete failed" });
    }
  };

  return <div className="directory-container">{data.map((item) => {
    const entry = iconMap[item.type === "folder" ? "folder" : getFileType(item.name)] || iconMap.default;
    const Icon = entry.icon;
    const isStarred = starred.some((star) => star.fileId === item._id || star._id === item._id);
    return <div key={item._id} className="directory-box">
      <div className="relative"><div className="flex justify-between mb-2 items-center">{item.type === "folder" ? <div /> : isStarred ? <FaStar className="text-xl cursor-pointer" onClick={() => toggleStar(item)} /> : <FaRegStar className="text-xl cursor-pointer" onClick={() => toggleStar(item)} />}<BsThreeDotsVertical className="cursor-pointer" onClick={() => setActiveDropdown(activeDropdown === item._id ? null : item._id)} /></div>
      {activeDropdown === item._id && <div className="absolute right-0 top-6 bg-gray-100 rounded shadow-md z-10"><p onClick={() => download(item)} className="px-4 py-1 text-green-500 cursor-pointer">Download</p><hr /><p onClick={() => remove(item)} className="px-4 py-1 text-red-500 cursor-pointer">Delete</p></div>}</div>
      <Icon className={`directory-icon ${entry.color}`} />
      <p className="text-center text-blue-600 break-words text-sm cursor-pointer mt-2" onClick={() => item.type === "folder" ? (onOpenFolder ? onOpenFolder(item.path) : navigate(`/dashboard/${item.path}`)) : (onPreviewFile ? onPreviewFile(item) : navigate(`/preview/${item.path}`))}>{item.name || "Untitled"}</p>
    </div>;
  })}</div>;
}

export default FilesAndFolders;

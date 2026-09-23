import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useUserContext } from "../../Context Api/UserContext";
import FilesAndFolders from "../Files and Folders/FilesAndFolders";

export type FileOrFolderItem = {
  _id: string;
  name: string;
  path: string;
  parentPath: string;
  type: string;
  __v: number;
  fileId?: string;
  userName?: string;
};

function Directory() {
  const API = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<FileOrFolderItem[]>([]);
  const [storageUsage, setStorageUsage] = useState("-");
  const [storagePercent, setStoragePercent] = useState(0);
  const pathAfterDashboard = decodeURIComponent(location.pathname.replace(/^\/?dashboard\/?/, ""));
  const effectivePath = pathAfterDashboard || userName || "";

  const fetchStorage = async () => {
    try {
      const response = await axios.get(`${API}/api/folder/size/${effectivePath}`, { withCredentials: true });
      const size = Number(response.data.size || 0);
      setStorageUsage(size.toFixed(2));
      setStoragePercent(Math.min(100, size));
    } catch {
      setStorageUsage("-");
      setStoragePercent(0);
    }
  };

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const response = await axios.get(`${API}/api/folder/fetch/${effectivePath}`, { withCredentials: true });
        if (response.data.success) setData(response.data.data);
      } catch (error: any) {
        console.error("Error fetching folder data:", error);
        Swal.fire({ icon: "error", title: error?.response?.data?.message || "Something went wrong" });
      }
    };
    if (effectivePath) fetchFolder();
    fetchStorage();
  }, [effectivePath]);

  useEffect(() => {
    fetchStorage();
  }, [data]);

  const createFolder = async () => {
    const result = await Swal.fire({ title: "Create a folder", input: "text", showCancelButton: true });
    if (!result.value) return;
    try {
      const response = await axios.post(`${API}/api/folder/${effectivePath}`, { folderName: result.value }, { withCredentials: true });
      if (response.data.success) setData(response.data.data);
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error?.response?.data?.message || "Folder creation failed" });
    }
  };

  const uploadFile = async () => {
    const result = await Swal.fire({ title: "Select a file", input: "file", showCancelButton: true });
    const file = result.value as File | undefined;
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userName", userName || "");
    try {
      const response = await axios.post(`${API}/api/file/${effectivePath}`, formData, { withCredentials: true });
      if (response.data.success) setData(response.data.data);
    } catch (error: any) {
      Swal.fire({ icon: "error", title: error?.response?.data?.message || "Upload failed" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-1">
        {pathAfterDashboard !== userName && <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600"><FaArrowLeft />Back</button>}
        <h3 className="text-2xl font-semibold text-gray-800 break-words">{pathAfterDashboard}/</h3>
        <div className="flex flex-col gap-1 text-sm text-gray-600 ml-4 min-w-[180px]">
          <span>Storage used: {storageUsage} MB ({storagePercent.toFixed(0)}%)</span>
          <div className="w-full bg-gray-200 rounded h-2"><div className="bg-blue-500 h-2 rounded" style={{ width: `${storagePercent}%` }} /></div>
        </div>
      </div>
      <hr className="w-full border-t border-gray-300 my-2" />
      <div className="flex justify-end gap-3">
        <button onClick={uploadFile} className="bg-black text-white px-4 py-2 rounded hidden md:block">Upload</button>
        <button onClick={createFolder} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hidden md:block">Create Folder</button>
        <div className="md:hidden relative"><BsThreeDotsVertical onClick={() => setIsOpen(!isOpen)} />{isOpen && <div className="absolute right-0 bg-gray-200 z-10"><p onClick={uploadFile} className="px-4 py-2">Upload</p><p onClick={createFolder} className="px-4 py-2">Create Folder</p></div>}</div>
      </div>
      {data.length === 0 ? <p className="text-center text-gray-500 text-lg mt-10">No files found.</p> : <FilesAndFolders data={data} setData={setData} onOpenFolder={(path) => navigate(`/dashboard/${path.split("/").map(encodeURIComponent).join("/")}`)} onPreviewFile={(file) => navigate(`/preview/${file.path}`)} />}
    </div>
  );
}

export default Directory;

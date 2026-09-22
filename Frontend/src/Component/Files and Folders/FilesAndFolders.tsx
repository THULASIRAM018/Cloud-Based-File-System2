import {
  FaFileImage,
  FaFileWord,
  FaFilePdf,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileVideo,
} from "react-icons/fa6";
import { FaFolder, FaFile, FaRegStar, FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { FileOrFolderItem } from "../Directory/Directory";
import "./style.css";
import "./Responsive.css";
import {  useNavigate } from "react-router-dom";
import axios, { AxiosProgressEvent } from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../Context Api/UserContext";

interface iconMapValue {
  color: string;
  icon: IconType;
}

const iconMap: Record<string, iconMapValue> = {
  image: { icon: FaFileImage, color: "text-blue-500" },
  excel: { icon: FaFileExcel, color: "text-green-500" },
  word: { icon: FaFileWord, color: "text-blue-500" },
  pdf: { icon: FaFilePdf, color: "text-red-400" },
  ppt: { icon: FaFilePowerpoint, color: "text-orange-500" },
  video: { icon: FaFileVideo, color: "text-purple-500" },
  folder: { icon: FaFolder, color: "text-yellow-500" },
  default: { icon: FaFile, color: "text-gray-500" },
};

const getFileTypeFromName = (name: string): string => {
  const extension = name.split(".").pop()?.toLowerCase();
  if (!extension) return "default";

  if (["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(extension))
    return "image";
  if (["xlsx", "xls"].includes(extension)) return "excel";
  if (["doc", "docx"].includes(extension)) return "word";
  if (["pdf"].includes(extension)) return "pdf";
  if (["ppt", "pptx"].includes(extension)) return "ppt";
  if (["mp4", "avi", "mov", "wmv", "mkv", "webm"].includes(extension))
    return "video";

  return "default";
};

<<<<<<< HEAD
interface FilesAndFoldersProps {
  data: FileOrFolderItem[];
  setData: React.Dispatch<React.SetStateAction<FileOrFolderItem[]>>;
  onOpenFolder?: (folderPath: string) => void;
}

function FilesAndFolders({ data, setData, onOpenFolder }: FilesAndFoldersProps) {
  // Upload state
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // Get current folder path from URL
  const currentFolderPath = (() => {
    const match = window.location.pathname.match(/dashboard\/(.*)/);
    return match ? decodeURIComponent(match[1]) : "";
  })();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("folderPath", currentFolderPath);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/file/upload`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
          },
        }
      );
      const { success, data, message } = response.data;
      if (success) {
        Swal.fire({ icon: "success", title: message || "Upload successful", customClass: { popup: "custom-swal-popup" } });
        setData(data);
        setSelectedFiles(null);
      } else {
        Swal.fire({ icon: "error", title: "Upload failed", text: message || "Something went wrong", customClass: { popup: "custom-swal-popup" } });
      }
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Upload failed", text: error?.response?.data?.message || "Something went wrong", customClass: { popup: "custom-swal-popup" } });
    }
    setUploading(false);
    setUploadProgress(0);
  };
  const navigate = useNavigate();
  const [previewFile, setPreviewFile] = useState<FileOrFolderItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
=======
function FilesAndFolders({
  data,
  setData,
}: {
  data: FileOrFolderItem[];
  setData: React.Dispatch<React.SetStateAction<FileOrFolderItem[]>>;
}) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const API = import.meta.env.VITE_API_URL;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  const pathUrl=location.pathname

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const [starred, setStarred] = useState<FileOrFolderItem[]>([]);
  const { userName } = useUserContext();

  useEffect(() => {
    if (!userName) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          `${API_BASE_URL}/starred/${userName}`,
          { withCredentials: true }
=======
          `${API}/api/starred/${userName}`
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        );
        const { success, data } = response.data;
        if (success) {          
          setStarred(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userName,data]);

  const addToStarred = async (item: FileOrFolderItem) => {
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("path", item.path);
      formData.append("parentPath", item.parentPath);
      formData.append("type", item.type);
      formData.append("_id", item._id);
      formData.append("userName", userName || "");
      const response = await axios.post(
<<<<<<< HEAD
        `${API_BASE_URL}/starred`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
=======
        `${API}/api/starred`,
        formData,
        {
          headers: { 'Content-Type': 'application/json'  },
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        }
      );
  
      const { data, success } = response.data;
  
      if (success) {        
        setStarred(data);
        // Swal.fire({
        //   icon: "success",
        //   title: "Added to Starred",
        //   customClass: {
        //     popup: "custom-swal-popup",
        //   },
        // });
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };
  

  const removeFromStarred = async (item: FileOrFolderItem) => {
    try {
      let response;
<<<<<<< HEAD
      if (pathUrl === '/starred') {
        response = await axios.delete(
          `${API_BASE_URL}/starred/${item.fileId}?userName=${userName}`,
          { withCredentials: true }
        );
      } else {
        response = await axios.delete(
          `${API_BASE_URL}/starred/${item._id}?userName=${userName}`,
          { withCredentials: true }
        );
      }
      const { success, data } = response.data;
      if (success) {
        setStarred(data);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
=======
      if (pathUrl==='/starred') {
        response = await axios.delete(
          `${API}/api/starred/${item.fileId}?userName=${userName}`
        );
      }else{
        response = await axios.delete(
          `${API}/api/starred/${item._id}?userName=${userName}`
        );
      }
      
      const { success, data } = response.data;
      if (success) {        
        setStarred(data);
        // Swal.fire({
        //   icon: "success",
        //   title: "Unstarred Successfully",
        //   customClass: {
        //     popup: "custom-swal-popup",
        //   },
        // });
      }
    } catch (error:any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `${error?.response.data.message}`||'Something went wrong',
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };

  const handleDownload = async (item: FileOrFolderItem) => {
    try {
      Swal.fire({
        title: `Downloading`,
        html: `<b>Progress: <span id="download-progress">0</span>%</b>`,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: "custom-swal-popup",
        },
      });

      const url =
        item.type === "folder"
<<<<<<< HEAD
          ? `${API_BASE_URL}/folder/download/${item.path}`
          : `${API_BASE_URL}/file/download/${item.path}`;

      const response = await axios.get(url, {
        responseType: "blob",
        withCredentials: true,
=======
          ? `${API}/api/folder/download/${item.path}`
          : `${API}/api/file/download/${item.path}`;

      const response = await axios.get(url, {
        responseType: "blob",
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        onDownloadProgress(progressEvent: AxiosProgressEvent) {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            const progressSpan = document.getElementById("download-progress");
            if (progressSpan) {
              progressSpan.textContent = progress.toString();
            }
          }
        },
      });

      // Create a temporary link to trigger download
      const blob = new Blob([response.data]);
      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = `${item.name}${item.type === "folder" ? ".zip" : ""}`;
      document.body.appendChild(link); // required for Firefox
      link.click();
      link.remove();
      URL.revokeObjectURL(urlBlob); // prevent memory leak

      Swal.fire({
        icon: "success",
        title: "Download Complete!",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Something went wrong",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };

  const handleDelete = async (item: FileOrFolderItem) => {
    try {
      let response;
<<<<<<< HEAD
=======

>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      const requestData = {
        path: item.path,
        parentPath: item.parentPath,
      };
<<<<<<< HEAD
      if (item.type === "folder") {
        response = await axios.delete(`${API_BASE_URL}/folder`, {
          data: requestData,
          withCredentials: true,
        });
      } else {
        response = await axios.delete(`${API_BASE_URL}/file/delete`, {
          data: requestData,
          withCredentials: true,
        });
      }
      const { success, data, message } = response.data;
=======

      if (item.type === "folder") {
        response = await axios.delete(`${API}/api/folder`, {
          data: requestData,
        });
      } else {
        response = await axios.delete(`${API}/api/file/delete`, {
          data: requestData,
        });
      }

      const { success, data, message } = response.data;

>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      if (success) {
        Swal.fire({
          icon: "success",
          title: message || "Deleted successfully",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
<<<<<<< HEAD
        setData(data);
=======
        setData(data); // update the UI
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Something went wrong",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };

<<<<<<< HEAD
  const handleNameClick = async (item: FileOrFolderItem) => {
    if (item.type === "folder") {
      // Always use navigate to go inside folder
      navigate(`/dashboard/${encodeURIComponent(item.path)}`);
    } else {
      setPreviewFile(item);
      // Fetch file as blob for preview (for images and pdf)
      const ext = item.name.split('.').pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "pdf"].includes(ext || "")) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/file/view/${item.path}`,
            { responseType: 'blob', withCredentials: true }
          );
          const url = URL.createObjectURL(response.data);
          setPreviewUrl(url);
        } catch (err) {
          setPreviewUrl(null);
        }
      } else {
        setPreviewUrl(null);
      }
=======
  const handleNameClick = (item: FileOrFolderItem) => {
    if (item.type === "folder") {
      navigate(`/dashboard/${item.path}`);
    } else {
      navigate(`/preview/${item.path}`);
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
    }
  };

  return (
    <div>
      <div className="directory-container">
        {data.map((item) => {
          const fileType =
            item.type === "folder" ? "folder" : getFileTypeFromName(item.name);
          const { icon: Icon, color } = iconMap[fileType] || iconMap.default;
<<<<<<< HEAD
          const isStarred = pathUrl === "/starred"
            ? starred.some((star) => star._id === item._id)
            : starred.some((star) => star.fileId === item._id);
=======
          
          // const fileIdToCheck = item.fileId || item._id;
          
          const isStarred =pathUrl === "/starred"? starred.some((star) => star._id === item._id): starred.some((star) => star.fileId === item._id);
                    
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
          return (
            <div key={item._id} className="directory-box">
              <div className="relative">
                <div className="flex justify-between mb-2 items-center">
                  {item.type === "folder" ? (
                    <div></div>
                  ) : isStarred ? (
                    <FaStar
                      className="text-xl cursor-pointer"
                      onClick={() => removeFromStarred(item)}
                    />
                  ) : (
                    <FaRegStar
                      className="text-xl cursor-pointer"
                      onClick={() => addToStarred(item)}
                    />
                  )}
                  <BsThreeDotsVertical
                    className="directory-threedot cursor-pointer"
                    onClick={() => toggleDropdown(item._id)}
                  />
                </div>

                {activeDropdown === item._id && (
                  <div className="absolute right-0 top-[1.1rem] mt-1 bg-gray-100 rounded-sm shadow-md z-10 text-sm">
                    <p
                      onClick={() => handleDownload(item)}
                      className="px-4 py-1 hover:bg-gray-300 text-green-500 cursor-pointer"
                    >
                      Download
                    </p>
                    <hr className="w-full" />
                    <p
                      onClick={() => handleDelete(item)}
                      className="px-4 py-1 hover:bg-gray-300 text-red-500 cursor-pointer"
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>

              <Icon className={`directory-icon ${color}`} />
              <p
                className="text-center text-blue-600 break-words text-sm cursor-pointer mt-2"
                onClick={() => handleNameClick(item)}
              >
                {item.name || "Untitled"}
              </p>
            </div>
          );
        })}
      </div>
<<<<<<< HEAD

      {/* File Preview Modal */}
      {previewFile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => { setPreviewFile(null); if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); } }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              minHeight: 200,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#eee",
                border: "none",
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => { setPreviewFile(null); if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); } }}
            >
              X
            </button>
            <h2 style={{ marginBottom: 16 }}>{previewFile.name}</h2>
            {/* Preview content by file type */}
            {(() => {
              const ext = previewFile.name.split('.').pop()?.toLowerCase();
              if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(ext || "") && previewUrl) {
                return (
                  <img
                    src={previewUrl}
                    alt={previewFile.name}
                    style={{ maxWidth: "80vw", maxHeight: "60vh" }}
                  />
                );
              }
              if (["pdf"].includes(ext || "") && previewUrl) {
                return (
                  <iframe
                    src={previewUrl}
                    title={previewFile.name}
                    style={{ width: "80vw", height: "60vh" }}
                  />
                );
              }
              if (["txt", "md", "csv", "json", "log", "xml", "js", "ts", "html", "css"].includes(ext || "") && previewUrl) {
                // For text-based files, fetch and show text content
                return (
                  <iframe
                    src={previewUrl}
                    title={previewFile.name}
                    style={{ width: "80vw", height: "60vh", background: '#f9f9f9', border: '1px solid #eee' }}
                  />
                );
              }
              // For other file types, show file info and download link
              return (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{previewFile.name}</p>
                  <p>Type: {ext || 'unknown'}</p>
                  <a
                    href={`${API_BASE_URL}/file/download/${previewFile.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#007bff", fontWeight: 'bold', fontSize: '1rem', marginTop: '12px', display: 'inline-block' }}
                  >
                    Download file
                  </a>
                </div>
              );
            })()}
          </div>
        </div>
      )}
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
    </div>
  );
}

export default FilesAndFolders;

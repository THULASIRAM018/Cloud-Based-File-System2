import { useEffect, useState } from "react";
import FilesAndFolders from "../Files and Folders/FilesAndFolders";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosProgressEvent } from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../../Context Api/UserContext";
import { FaArrowLeft } from "react-icons/fa";

export type FileOrFolderItem = {
  _id: string;
  name: string;
  path: string;
  parentPath: string;
  type: "folder" | "file";
  __v: number;
  fileId?: string;
  userName?: string;
};

function Directory() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
<<<<<<< HEAD
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
=======
  const API = import.meta.env.VITE_API_URL;
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  const pathAfterDashboard = decodeURIComponent(
    location.pathname.replace(/^\/?dashboard\/?/, "")
  );
  const [data, setData] = useState<FileOrFolderItem[]>([]);
<<<<<<< HEAD
  const [storageUsage, setStorageUsage] = useState<string>("-");
  const [storagePercent, setStoragePercent] = useState<number>(0);
  const MAX_STORAGE_MB = 100; // Set your quota here
  const { userName } = useUserContext();
  const navigate = useNavigate();


  // This must come after navigate is defined!
  const handleOpenFolder = (folderPath: string) => {
    navigate(`/dashboard/${folderPath.split('/').map(encodeURIComponent).join('/')}`);
  };

  // File preview handler
  const handlePreviewFile = (file: FileOrFolderItem) => {
    // Navigate to a preview page with the fileId (or use a modal if you prefer)
    navigate(`/preview/${file._id}`);
  };

  const effectivePath = pathAfterDashboard || userName || "";

  // Fetch storage usage and percent
  const fetchStorage = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/folder/size/${effectivePath}`,
        { withCredentials: true }
      );
      if (res.data && res.data.success) {
        setStorageUsage(res.data.size);
        const percent = Math.min(100, (parseFloat(res.data.size) / MAX_STORAGE_MB) * 100);
        setStoragePercent(percent);
      } else {
        setStorageUsage("-");
        setStoragePercent(0);
      }
    } catch {
      setStorageUsage("-");
      setStoragePercent(0);
    }
  };

=======
  const { userName } = useUserContext();
  const navigate = useNavigate();

>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          `${API_BASE_URL}/folder/fetch/${effectivePath}`,
=======
          `${API}/api/folder/fetch/${pathAfterDashboard}`,
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
          { withCredentials: true }
        );
        const { success, data } = response.data;
        if (success) {
          setData(data);
        }
      } catch (error: any) {
        console.error("Error fetching folder data:", error);
        Swal.fire({
          icon: "error",
          title: `${error?.response.data.message}` || "Something went wrong",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    };
    fetchData();
<<<<<<< HEAD
    fetchStorage();
  }, [pathAfterDashboard]);

  // Update storage after file/folder changes
  useEffect(() => {
    fetchStorage();
    // eslint-disable-next-line
  }, [data]);

=======
  }, [pathAfterDashboard]);

>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  const CreateFolder = async () => {
    const { value: folderName } = await Swal.fire({
      title: "Create a folder",
      input: "text",
      inputLabel: "Folder name",
      inputPlaceholder: "Enter folder name",
      showCancelButton: true,
      customClass: {
        popup: "custom-swal-popup",
        input: "custom-swal-input",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        return null;
      },
    });

    if (folderName) {
      try {
        const response = await axios.post(
<<<<<<< HEAD
          `${API_BASE_URL}/folder/${effectivePath}`,
          {
            folderName,
          },
          { withCredentials: true }
=======
          `${API}/api/folder/${pathAfterDashboard}`,
          {
            folderName,
          }
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        );
        const { success, data } = response.data;

        if (success) {
          setData(data);
          Swal.fire({
            icon: "success",
            title: "Folder created",
            text: `Folder "${folderName}" created successfully!`,
            customClass: {
              popup: "custom-swal-popup",
            },
          });
<<<<<<< HEAD
          // Open the newly created folder using the FilesAndFolders callback
          const newPath = effectivePath ? `${effectivePath}/${folderName}` : folderName;
          handleOpenFolder(newPath);
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error?.response.data.message || "Something went wrong",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    }
  };

  const handleFile = async () => {
    const { value: file } = (await Swal.fire({
      title: "Select a file",
      input: "file",
      inputAttributes: {
        accept: "*", // Accept all file types
        "aria-label": "Upload a file",
      },
      showCancelButton: true,
      customClass: {
        popup: "custom-swal-popup",
      },
    })) as { value: File | null };

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userName", userName || "");

    Swal.fire({
      title: `Uploading: ${file.name}`,
      html: `<b>Progress: <span id="upload-progress">0</span>%</b>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: "custom-swal-popup",
      },
    });

    try {
      const response = await axios.post(
<<<<<<< HEAD
        `${API_BASE_URL}/file/${effectivePath}`,
=======
        `${API}/api/file/${pathAfterDashboard}`,
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
<<<<<<< HEAD
          withCredentials: true,
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              const progressSpan = document.getElementById("upload-progress");
              if (progressSpan) {
                progressSpan.textContent = progress.toString();
              }
            }
          },
        }
      );

      const { success, data } = response.data;
      if (success) {
        setData(data);
        Swal.fire({
          icon: "success",
          title: "Upload Complete!",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error?.response?.data?.message || "Something went wrong",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
    }
  };

  return (
    <div className="">
      {/* User Info Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-1">
        {pathAfterDashboard !== userName && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft size={20} />
            <span className="text-base font-medium">Back</span>
          </button>
        )}

        <h3 className="text-2xl font-semibold text-gray-800 break-words flex items-center gap-1">
          {pathAfterDashboard}
          <span className="text-gray-500">/</span>
        </h3>
<<<<<<< HEAD
        <div className="flex flex-col gap-1 text-sm text-gray-600 ml-4 min-w-[180px]">
          <div className="flex items-center gap-2">
            <span>Storage used:</span>
            <span className="font-semibold">{storageUsage} MB</span>
            <span className="ml-2">({storagePercent.toFixed(0)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${storagePercent}%`, transition: 'width 0.5s' }}
            ></div>
          </div>
        </div>
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-gray-300 my-2" />

      {/* Section Header with Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800"></h3>

        <div className="flex gap-3">
          <button
            onClick={handleFile}
            className="bg-black cursor-pointer hidden md:block text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Upload
          </button>
          <button
            onClick={CreateFolder}
            className="bg-gray-200 cursor-pointer hidden md:block text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Create Folder
          </button>
          <div className=" py-2 relative inline-block text-left md:hidden">
            <BsThreeDotsVertical
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            />
            {isOpen && (
              <div className="absolute right-0 top-[2rem] bg-gray-300  rounded shadow-md z-10">
                <p
                  onClick={handleFile}
                  className="px-5 py-1 hover:bg-gray-400 cursor-pointer text-center whitespace-nowrap "
                >
                  Upload File
                </p>
                <hr className="w-full" />
                <p
                  onClick={CreateFolder}
                  className="px-5 py-1 hover:bg-gray-400 cursor-pointer text-center whitespace-nowrap "
                >
                  Create Folder
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No files found.
        </p>
      ) : (
<<<<<<< HEAD
        <FilesAndFolders
          data={data}
          setData={setData}
          onOpenFolder={handleOpenFolder}
          onPreviewFile={handlePreviewFile}
        />
=======
        <FilesAndFolders data={data} setData={setData} />
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
      )}
      {/* <div>
        <div className="flex gap-4 text-center">
          <FaFolder />
          <p>1744202100757-923260063-offer (1).jpg</p>
        </div>
        <hr className="w-full text-black" />
      </div> */}
    </div>
  );
}

export default Directory;

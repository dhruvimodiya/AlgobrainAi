// button click aaply copy and delete on image , video ,document
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { IoMdDocument } from "react-icons/io";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GalleryIcon } from "./GalleryIcon";
import { MusicIcon } from "./MusicIcon";
import { VideoIcon } from "./VideoIcon";
import { PlusIcon } from "./PlusIcon";

export default function Task3() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [documentUrls, setDocumentUrls] = useState([]);
  const [showUrls, setShowUrls] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (type) => {
    setLoading(true);
    const apiUrl = "http://localhost:3030/api/files";

    try {
      const response = await axios.get(apiUrl);
      if (type === "images") setImageUrls(response.data.images || []);
      if (type === "videos") setVideoUrls(response.data.videos || []);
      if (type === "documents") setDocumentUrls(response.data.documents || []);
    } catch (error) {
      toast.error(`Error fetching ${type} data`);
    } finally {
      setLoading(false);
    }
  };

  const handleShowContent = (type) => {
    console.log("typetype",type)
    setShowUrls(type);
    fetchData(type);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Copied to clipboard");
    }).catch(() => {
      toast.error("Failed to copy");
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3030/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        fetchData("image");
      }
    } catch (error) {
      toast.error("Failed to upload file.");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:3030/api/files/${type}/${id}`);
      toast.success("Deleted successfully");
      fetchData(type);
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={onOpen} color="primary" className="mb-4">
        Open Media Library
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold">Media Library</ModalHeader>
              
              <div className="flex justify-end mb-4">
                <Button
                  className="bg-green-700 text-background"
                  endContent={<PlusIcon />}
                  size="sm"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Upload
                </Button>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileSelect} />
              </div>

              <ModalBody>
              <Tabs
  aria-label="Media Types"
  variant="bordered"
  fullWidth
  selectedKey={showUrls}  // Bind the active tab
  onSelectionChange={(key) => handleShowContent(key)} // Handle tab change
>
  <Tab key="images" title={<div className="flex items-center space-x-2"><GalleryIcon /><span>Photos</span></div>} />
  <Tab key="videos" title={<div className="flex items-center space-x-2"><VideoIcon /><span>Videos</span></div>} />
  <Tab key="documents" title={<div className="flex items-center space-x-2"><MusicIcon /><span>Documents</span></div>} />
</Tabs>

                {loading && (
                  <div className="flex justify-center items-center">
                    <Spinner size="lg" color="primary" />
                  </div>
                )}

                {/* Display media based on selected type */}
                {!loading && showUrls === "images" && (
                  <div className="grid grid-cols-3 gap-4">
                    {imageUrls.length > 0 ? (
                      imageUrls.map((item, index) => (
                        <Card key={index} className="max-w-[300px] relative">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img src={item.url} alt="Image" className="w-full h-auto hover:scale-110 hover:opacity-70 transition-transform duration-200 ease-in-out" />
                          </a>
                          <Tooltip content="Copy URL" color="primary">
                            <FaCopy className="absolute top-2 right-2 cursor-pointer" onClick={() => handleCopy(item.url)} />
                          </Tooltip>
                          <Tooltip content="Delete" color="error">
                            <MdDelete className="absolute top-2 left-40 cursor-pointer" onClick={() => handleDelete(item.url.split("/").pop(), showUrls)} />
                          </Tooltip>
                        </Card>
                      ))
                    ) : (
                      <p>No images available.</p>
                    )}
                  </div>
                )}

                {!loading && showUrls === "videos" && (
                  <div className="grid grid-cols-3 gap-4">
                    {videoUrls.length > 0 ? (
                      videoUrls.map((item, index) => (
                        <Card key={index} className="max-w-[300px] relative">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <video src={item.url} className="w-full h-auto hover:scale-110 hover:opacity-70 transition-transform duration-200 ease-in-out" controls></video>
                          </a>
                          <Tooltip content="Copy URL" color="primary">
                            <FaCopy className="absolute top-2 right-2 cursor-pointer" onClick={() => handleCopy(item.url)} />
                          </Tooltip>
                          <Tooltip content="Delete" color="error">
                            <MdDelete className="absolute top-2 left-40 cursor-pointer" onClick={() => handleDelete(item.url.split("/").pop(), showUrls)} />
                          </Tooltip>
                        </Card>
                      ))
                    ) : (
                      <p>No videos available.</p>
                    )}
                  </div>
                )}

                {!loading && showUrls === "documents" && (
                  <div className="grid grid-cols-3 gap-4">
                    {documentUrls.length > 0 ? (
                      documentUrls.map((item, index) => (
                        <Card key={index} className="max-w-[300px] relative">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <IoMdDocument className="w-40 h-28" />
                          </a>
                          <Tooltip content="Copy URL" color="primary">
                            <FaCopy className="absolute top-2 right-2 cursor-pointer" onClick={() => handleCopy(item.url)} />
                          </Tooltip>
                          <Tooltip content="Delete" color="error">
                            <MdDelete className="absolute top-2 left-40 cursor-pointer" onClick={() => handleDelete(item.url.split("/").pop(), showUrls)} />
                          </Tooltip>
                        </Card>
                      ))
                    ) : (
                      <p>No documents available.</p>
                    )}
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color="danger" onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

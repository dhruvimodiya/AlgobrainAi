import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { IoMdDocument } from "react-icons/io";
import { Tabs, Tab } from "@nextui-org/react";
import { GalleryIcon } from "./GalleryIcon";
import { MusicIcon } from "./MusicIcon";
import { VideoIcon } from "./VideoIcon";
import { PlusIcon } from "./PlusIcon";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { FaCopy } from "react-icons/fa6";

export default function Task3() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State variables for images, videos, and documents
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [documentUrls, setDocumentUrls] = useState([]);
  const [showUrls, setShowUrls] = useState(null); // To track which type of URLs to show (image, video, document)
  const [loading, setLoading] = useState(false); // To track loading state
  const [copySuccess, setCopySuccess] = useState(""); // To show feedback for copy action
  const [uploadSuccess, setUploadSuccess] = useState(""); // State to store success message

  // Function to fetch data from the API based on type (image, video, document)
  const fetchData = async (type) => {
    setLoading(true); // Start loading
    let apiUrl = "http://localhost:3030/api/files";

    try {
      const response = await axios.get(apiUrl);
      console.log(`🚀 ~ fetchData ~ ${type} response:`, response);

      // Set the appropriate state based on the content type
      if (type === "image") {
        setImageUrls(response.data.images || []); // Fallback to empty array if no images
      } else if (type === "video") {
        setVideoUrls(response.data.videos || []); // Fallback to empty array if no videos
      } else if (type === "document") {
        setDocumentUrls(response.data.documents || []); // Fallback to empty array if no documents
      }
    } catch (error) {
      console.error(`Error fetching ${type} URLs:`, error);
      if (type === "image") setImageUrls([]);
      if (type === "video") setVideoUrls([]);
      if (type === "document") setDocumentUrls([]);
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  // Handler to load and show different content types
  const handleShowContent = (type) => {
    setShowUrls(type); // Set the type of URLs to display
    fetchData(type); // Fetch data from the API based on the type (image, video, document)
  };

  // Function to copy URL to clipboard
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(`Copied!`); // Show success message
      setTimeout(() => setCopySuccess(""), 2000); // Clear success message after 2 seconds
    });
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file); // Trigger the upload function
    }
  };
  // Function to upload the file (mock implementation)
  const uploadFile = async(file) => {
    // Perform the file upload here (e.g., using an API endpoint)
    const formData = new FormData(); 
    console.log("🚀 ~ uploadFile ~ fromData:", formData)
    console.log("File uploaded:", file.name);
   
    formData.append("file",file);

    try {
      // Perform the file upload here (using Axios and API endpoint)
      const response = await axios.post("http://localhost:3030/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "file-upload8.p.rapidapi.com",
          "x-rapidapi-key": "your-rapidapi-key-here",
        },
      })

      if (response.status === 200) {
        setUploadSuccess("File uploaded successfully!");

        // Fetch the updated image list from the server
        fetchImages();
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadSuccess("Failed to upload file.");
    }

    // Clear the success message after 3 seconds
    setTimeout(() => setUploadSuccess(""), 3000);
  };

    // Function to fetch updated images after upload
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/files");
      setImageUrls(response.data.images || []); // Update the image URLs state
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Function to trigger the hidden file input
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <>
      <Button onClick={onOpen} color="primary" className="mb-4">
        Open Modal
      </Button>

      <Modal
        size={"3xl"}
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold mb-4">
                Media Library
              </ModalHeader>
              {/* buttons */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-end me-3 gap-3 items-end">

                {/* ---------upload------------------- */}
                  <Button
                    className="bg-green-700 text-background"
                    endContent={<PlusIcon />}
                    size="sm"
                    onClick={triggerFileInput} // Click event triggers the file input
                  >
                    Upload
                  </Button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileSelect} // When a file is selected
                  />

                  {/* Display success message */}
                  {uploadSuccess && (
                    <p className="text-green-500 text-center mt-2">
                      {uploadSuccess}
                    </p>
                  )}
                  {/* -----------delete---------------- */}

                  <Button
                    className="bg-gray-600 text-background"
                    endContent={<PlusIcon />}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>


              <ModalBody>
                <Tabs aria-label="Options" color="primary" variant="bordered">
                  <Tab
                    key="photos"
                    title={
                      <div
                        className="flex items-center space-x-2"
                        onClick={() => handleShowContent("image")}
                      >
                        <GalleryIcon />
                        <span>Photos</span>
                      </div>
                    }
                  />
                  <Tab
                    key="videos"
                    title={
                      <div
                        className="flex items-center space-x-2"
                        onClick={() => handleShowContent("video")}
                      >
                        <VideoIcon />
                        <span>Videos</span>
                      </div>
                    }
                  />
                  <Tab
                    key="music"
                    title={
                      <div
                        className="flex items-center space-x-2"
                        onClick={() => handleShowContent("document")}
                      >
                        <MusicIcon />
                        <span>Document</span>
                      </div>
                    }
                  />
                </Tabs>


                
                {/* Conditionally render content based on selected type */}
                {loading && (
                  <p className="text-center text-gray-500">Loading...</p>
                )}{" "}
                {/* Display loading indicator when fetching data */}
                {/* Display the copy success message */}
                {copySuccess && (
                  <p className="text-green-500 text-center mb-1">
                    {copySuccess}
                  </p>
                )}
                {!loading && showUrls === "image" && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {imageUrls.length > 0 ? (
                      imageUrls.map((item, index) => (
                        <div key={index}>
                          <Card className="max-w-[300px]">
                            <CardHeader className="flex justify-end">
                              <FaCopy
                                className="w-4 h-4"
                                onClick={() => handleCopy(item.url)}
                              />
                            </CardHeader>
                            <CardBody>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                              >
                                <img
                                  src={item.url}
                                  alt="Image"
                                  className="w-full h-auto"
                                />
                              </a>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <p>No image URLs available.</p>
                    )}
                  </div>
                )}
                {!loading && showUrls === "video" && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {videoUrls.length > 0 ? (
                      videoUrls.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Card className="max-w-[300px]">
                            <CardHeader className="flex justify-end">
                              <FaCopy
                                className="w-4 h-4"
                                onClick={() => handleCopy(item.url)}
                              />
                            </CardHeader>
                            <CardBody>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                              >
                                <video
                                  src={item.url}
                                  className="w-full h-auto"
                                ></video>
                              </a>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <p>No video URLs available.</p>
                    )}
                  </div>
                )}
                {!loading && showUrls === "document" && (
                  <div className="mt-4 space-y-2 grid grid-cols-3 gap-4">
                    {documentUrls.length > 0 ? (
                      documentUrls.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Card className="max-w-[300px]">
                            <CardHeader className="flex justify-end">
                              <FaCopy
                                className="w-4 h-4"
                                onClick={() => handleCopy(item.url)}
                              />
                            </CardHeader>
                            <CardBody>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                              >
                                <IoMdDocument className="w-40 h-28" />
                              </a>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <p>No document URLs available.</p>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

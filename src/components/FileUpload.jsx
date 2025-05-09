/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const FileUpload = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  const myCustomColor = "#FAFAFA";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Log the selected file
    console.log('Selected File:', file);
  
    // Pass the selected file to the parent component
    onFileChange(file);
  };
  

  const handleCustomButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="mt-7 flex items-center ">
        <button
          type="button"
          onClick={handleCustomButtonClick}
          className="bg-blue-500 text-black h-56 w-5/6 px-5 py-2 rounded-md"
          style={{ backgroundColor: myCustomColor }}
        >
          Upload Image
          <FontAwesomeIcon icon={faCloudArrowUp} className='text-4xl relative -top-5 text-gray-500 right-20'/>
        </button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Formats: PNG, JPG</p>
        </div>
    </div>
  );
};

export default FileUpload;

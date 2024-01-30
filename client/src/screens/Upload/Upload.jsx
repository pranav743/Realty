import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState();
  const [previewSrc, setPreviewSrc] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setPreviewSrc(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSrc) return;

    uploadImage(previewSrc);
  };

  const uploadImage = async (image) => {
    console.log(image);
    try {
      await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: image }),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white">
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full items-center"
        >
          <label
            htmlFor="image_upload"
            className="border rounded-md mt-10 flex items-center justify-center gap-4 cursor-pointer w-2/3"
          >
            <span className="text-2xl p-4 text-center">Upload Image</span>
          </label>
          <input
            type="file"
            name="image"
            id="image_upload"
            onChange={handleChange}
            value={file}
            className=""
            hidden
          />
          <button
            type="submit"
            className="px-3 py-1 text-xl rounded-md bg-[#0b2239] max-w-max"
          >
            Submit
          </button>
        </form>
      </div>

      {previewSrc && (
        <div className="my-10 flex flex-col justify-center items-center">
          <div className="text-3xl">Preview</div>
          <img src={previewSrc} className="w-96"></img>
        </div>
      )}
    </div>
  );
};

export default Upload;

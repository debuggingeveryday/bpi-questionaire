import React, { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";

const InputFile = (props: any) => {
  return (
    <>
      <label htmlFor="uploadFile1"
      className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
        <IoMdCloudUpload className="text-xl mr-2 fill-white inline" />
          Upload
        <input type="file" accept=".txt,text/plain" onChange={props.onChange} id="uploadFile1" className="hidden" />
      </label>
    </>
  )
}

export default InputFile;

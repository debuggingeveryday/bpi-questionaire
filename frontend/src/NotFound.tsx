import React from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen grid mx-auto">
      <div>
        <button type="button" className="flex" onClick={() => navigate(-1)}><IoMdArrowBack className="mt-1" />Back</button>      
      </div>
      <div className="w-1/2 place-self-center">
        <h1 className="text-center text-5xl">404 Not Found</h1>
      </div>
    </div>
  )
}

export default NotFound;

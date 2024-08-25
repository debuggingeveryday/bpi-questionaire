import React from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../../Store/Store';
import { TfiWrite } from "react-icons/tfi";
import { GrPowerReset } from "react-icons/gr";
import { FaFileUpload } from "react-icons/fa";

function Welcome() {
  const { showAlert, updateShowAlert, resetQuestion, updateShowUploadFileResult } = useStoreContext();
  let navigate = useNavigate();

  const resetTest = () => {
    updateShowAlert({
      show: true,
      color: 'bg-yellow-500',
      title: 'Questionaire reset!',
      message: 'questionaire has been reset'
    })

    resetQuestion()
  }
  
  return (
    <>
      <div className="grid place-content-center items-center h-screen">
        <div className="grid gap-y-5">
          <h1 className="text-center text-5xl font-bold font-sans">
            BPI Questionaire
          </h1>
          <div className="grid grid-cols-3 gap-x-5">
            <button type="button" onClick={() => navigate("/questionaire/1")} className="bg-sky-500 rounded-lg text-white py-4 text-2xl flex justify-center space-x-2"><TfiWrite className="mt-1" /><span>Take exam</span></button>
            <button type="button" onClick={resetTest} className="bg-red-500 px-3 rounded-lg text-white py-4 text-2xl flex justify-center space-x-2">
              <GrPowerReset className="mt-1" /><span>Reset question</span></button>
            <button type="button" className="bg-yellow-500 rounded-lg text-white py-4 text-2xl flex justify-center space-x-2" onClick={updateShowUploadFileResult}><FaFileUpload className="mt-1" /><span>Upload result</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;



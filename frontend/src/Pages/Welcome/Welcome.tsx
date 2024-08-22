import React from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../../Store/Store';

function Welcome() {
  const { showAlert, updateShowAlert, resetQuestion } = useStoreContext();
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
      <div>
        <button type="button">Upload result</button>
      </div>
      <div className="grid place-content-center items-center h-screen">
        <div className="grid gap-y-5">
          <h1 className="text-center text-5xl font-bold font-sans">
            BPI Questionaire
          </h1>
          <div className="grid grid-cols-2">
            <button type="button" onClick={() => navigate("/questionaire/1")} className="place-self-center bg-sky-500 w-36 rounded-lg text-white py-4 text-2xl">Start</button>
            <button type="button" onClick={resetTest} className="place-self-center bg-red-500 w-36 rounded-lg text-white py-4 text-2xl">Reset test</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;



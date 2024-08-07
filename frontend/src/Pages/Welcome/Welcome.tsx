import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../../Store/Store'

function Welcome() {
  const { test, updateTest } = useStoreContext();
  let navigate = useNavigate();

  useEffect(() => {

    return () => {}
  }, [])
  
  return (
    <div className="grid place-content-center items-center h-screen">
      <div className="grid gap-y-5">
        <h1 className="text-center text-5xl font-bold font-sans">
          BPI Questionaire
        </h1>
        <button type="button" onClick={() => navigate("/questionaire/1")} className="place-self-center bg-sky-500 w-36 rounded-lg text-white py-4 text-2xl">Start</button>
      </div>
    </div>
  );
}

export default Welcome;



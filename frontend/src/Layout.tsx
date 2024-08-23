import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './Router'
import Alert from './Components/Alert'
import { useStoreContext } from './Store/Store'
import Modal from './Components/Modal'
import InputFile from './Components/InputFile'
import CryptoJS from 'crypto-js';

function Layout() {
  const { showAlert, showUploadFileResult, updateShowUploadFileResult } = useStoreContext();
  const { show, color, title, message } = showAlert
  const [ file, setFile ] = useState<File | null>(null)
  const [ cypherText, setCypherText ] = useState('')
  const [ bpiResult, setBpiResult ] = useState({})

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files;

    if (file) {
      let reader: any = new FileReader();

      if (reader && file[0]) {
        reader.readAsText(file[0], "UTF-8");
        reader.onload = (event: any) => setCypherText(event.target.result)
        reader.onerror = (event: any) => console.log("Error", event)
        
        setFile(file[0])
      }
    }
  }

  function calculate() {

  }

  function showResult () {
    const password: any = window.prompt("Enter password", "");

    if (password !== '123') window.alert("Incorrect password")
 
    if (password && cypherText) {
      const bytes = CryptoJS.AES.decrypt(cypherText, password);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setBpiResult(JSON.parse(originalText))
      console.table(bpiResult)
    } else {
      window.alert("Enter password and upload file")
    }
  }
  
  return (
    <>
      <Modal show={showUploadFileResult}>
        <p>{file?.name}</p>
        <InputFile onChange={(event: any) => onFileUpload(event)} />
        <div className="grid grid-cols-2">
          <button type="button" className="text-slate-100 bg-slate-900 p-2 px-4 rounded-lg justify-self-start" onClick={showResult}>Show result</button>
          <button type="button" className="justify-self-end text-slate-900 border border-lg border-slate-900 bg-slate-100 p-2 px-4 rounded-lg" onClick={updateShowUploadFileResult}>Close</button>
        </div>
      </Modal>
      <Alert showAlert={show} bgColor={color} title={title} message={message} />
      <div className="bg-gradient-to-b from-sky-200 max-w h-screen">
      <RouterProvider router={router} />
      </div>
    </>
  )
};

export default Layout;

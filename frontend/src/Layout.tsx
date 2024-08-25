import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './Router';
import Alert from './Components/Alert';
import { useStoreContext } from './Store/Store';
import Modal from './Components/Modal';
import InputFile from './Components/InputFile';
import CryptoJS from 'crypto-js';
import * as XLSX from 'xlsx';
import * as CLINICAL_SCALES from './constants/clinical_scales';

interface ICurrentValue {
  index: number;
  questions: string;
  answer: boolean;
}

interface ITotal {
  categoryName: string,
  value: number;
}

interface IResult {
  total: ITotal[];
  currentValue: ICurrentValue;
  currentIndex: number;
  baseValue: ICurrentValue;
}

function Layout() {
  // TODO: restructure layout and seperate the feature of file upload and decryptor

  const { showAlert, showUploadFileResult, updateShowUploadFileResult } = useStoreContext();
  const { show, color, title, message } = showAlert
  const [ file, setFile ] = useState<File | null>(null)
  const [ cypherText, setCypherText ] = useState('')
  const [ bpiResult, setBpiResult ] = useState<any>({})

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file: any = event.target.files;
    
    if (file[0].type !== "text/plain") return window.alert("Invalid file type")

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

  function calculate(result: ICurrentValue[]) {
    let initialValue = Object.keys(CLINICAL_SCALES).reduce<any>((total, currentValue, currentIndex, baseValue) => {
      total.push({
        category: currentValue,
        count: 0
      })

      return total;
    }, [])

    let newResult = result.reduce<any>((total, currentValue, currentIndex, baseValue) => {
      const {index, answer, questions} = currentValue;

      Object.entries(CLINICAL_SCALES).forEach(([categoryName, {_true, _false}]: any) => {
        const categoryIndex = total.indexOf(total.find((item: any) => item.category === categoryName))
        
        if (_true.includes(index) && answer === true) {
          total[categoryIndex].count++
        }
        if (_false ? _false.includes(index) : false && answer === false) {
          total[categoryIndex].count++
        }
      });

      return total;
    }, initialValue)

    return [newResult, result]
  }

  async function showResult () {
    const password: any = window.prompt("Enter password", "");
    
    if (!password) return
    if (password !== process.env.REACT_APP_PASSPHASE) return window.alert("Invalid password")

    if (password && cypherText) {
      try {
        const bytes = CryptoJS.AES.decrypt(cypherText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        let [finalResult, answeredCollection] = calculate(JSON.parse(originalText))

        const worksheetFinalResult: any = await XLSX.utils.json_to_sheet(finalResult);
        const worksheetAnsweredCollection: any = await XLSX.utils.json_to_sheet(answeredCollection)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetFinalResult, "BPI Result");
        XLSX.utils.book_append_sheet(workbook, worksheetAnsweredCollection, "BPI Answered")
        const [ fileName, _ ]: any = file?.name.split(".");
        XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
      } catch (error) {
        window.alert("Invalid format file")
      }
    }
  }
  
  return (
    <>
      <Modal show={showUploadFileResult}>
        <p>{file?.name}</p>
        <InputFile onChange={(event: any) => onFileUpload(event)} />
        <div className="grid grid-cols-2">
          <button type="button" className="text-slate-100 bg-slate-900 p-2 px-4 rounded-lg justify-self-start" onClick={showResult}>Download result</button>
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

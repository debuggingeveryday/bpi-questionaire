import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import * as XLSX from 'xlsx'
import { useStoreContext } from '../../Store/Store'
import { FaHome } from "react-icons/fa";

// TODO: create constants directory and file
const URL = "http://localhost:8000/questionaires"
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900",
}

interface IQuestionareStatus {
  data?: any;
}

function Questionaire() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [questionaire, setQuestionaire] = useState()
  const [questionaireStatus, setQuestionaireStatus] = useState<IQuestionareStatus>({})
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState()
  const [isDirty, setIsDirty] = useState()
  const [isFinish, setIsFinish] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showPrevious, setShowPrevious] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const {showAlertSuccess, updateShowAlertSuccess} = useStoreContext()

  useEffect(() => {
    // TODO: refractor to destructuring object
    const data = questionaireStatus?.data
    
    if (id) {
      setShowNext(id >= data?.total)
      setShowPrevious(parseInt(id) <= 1)
      if (data) setShowSubmit(data?.countAnswered === data?.total)
    }
    //if (isFinish) navigate('/finished')
    
    return () => {}
  }, [questionaireStatus])
  
  useEffect(() => {
    if (showSubmit === true) updateShowAlertSuccess()

  }, [showSubmit])
  

  const fetchQuestionaire = async () => {
    const response = await fetch(`${URL}/data/${id}`, {
      method: 'GET'
    });

    const data = await response.json();
    setQuestion(data?.questions);
    setAnswer(data?.answer);
    setIsDirty(data?.isDirty);

    if (! data) navigate("/NotFound")
  }

  const fetchQuestionaireStatus = async () => {
    const response = await fetch(`${URL}/status`, {
      method: 'GET'
    });

    const data = await response.json()
    
    setQuestionaireStatus((value: any) => ({...value, data}))
  }

  const answerQuestionaire = async (answer: any) => {
    const response = await fetch(`${URL}/answer/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: answer,
      })
    })
    
    const data = await response.json();

    fetchQuestionaire();
    fetchQuestionaireStatus();
  }

  useEffect(() => {
    fetchQuestionaire();
    fetchQuestionaireStatus();
    return () => console.log("clean up")
  }, [])


  const next = (() => {
    if (id) navigate(`/questionaire/${parseInt(id) + 1}`)
  })

  const back = (() => {
    if (id) navigate(`/questionaire/${parseInt(id) - 1}`)
  })


  const exportFile = async () => {
    const response = await fetch(`${URL}/export`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    
    let data = await response.json()

    const rows = data?.map((item: any) => {
        delete item.isDirty
        delete item.id

        return item
    })

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported_Result");
    
    // TODO: make a util and put this to time.ts
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];

    const [hour, minutes, seconds] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    const fileName = `${year}${month}${day}${hour}${minutes}${seconds}_bpi-result.xlsx`

    XLSX.writeFile(workbook, fileName, { compression: true });
  }

  return (
    <>
    <Link className="ml-5 hover:underline flex" to={"/"}><FaHome className="mt-1 mr-1" />Home</Link>
    <div className="h-screen grid">
      <div className="w-2/3 mx-auto place-self-center">
        <div className="grid grid-cols-2 justify-between">
          <div className="place-self-start">
            <button className={`flex text-2xl hover:underline ${showPrevious ? "hidden" : ""}`} onClick={back}><IoMdArrowBack className="mt-1" />Previous</button>
          </div>
          <div className="place-self-end">
            <button className={`flex text-2xl hover:underline ${showNext ? "hidden" : ""}`} onClick={next}>Next<IoArrowForwardSharp className="mt-1" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 min-w-1/8 p-8 gap-y-16">
          <h1 className="text-5xl col-span-2 font-bold text-center text-gray-500">{question}</h1>
        </div>
        <div className="grid grid-cols-2 gap-x-16">
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-end text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(true)}><span>True</span></button>
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-start text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && !answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(false)}><span>False</span></button>
        </div>
        <div className="flex space-x-2">
          {questionaireStatus && Object.values(questionaireStatus).map((item: any) => (
              <h1 className="text-2xl">{item.countAnswered}/{item.total}</h1>
          ))}
          <button type="button" onClick={exportFile} className={`text-2xl hover:underline ${!showSubmit ? "hidden" : ""}`}>Export</button>
        </div>
      </div>
    </div>
    </>
  );
}



export default Questionaire;

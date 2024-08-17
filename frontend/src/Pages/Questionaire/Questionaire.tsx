import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import * as XLSX from 'xlsx'
import { useStoreContext } from '../../Store/Store'
import { FaHome } from "react-icons/fa";
//import { answerQuestion } from "../../Data/questionaire"
// TODO: create constants directory and file
const URL = "http://localhost:8000/questionaires"
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900",
}

function Questionaire() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [questionaireId, setQuestionaireId] = useState(id ? parseInt(id) : null)
  const [questionTitle, setQuestionTitle] = useState('')
  const [answer, setAnswer] = useState()
  const [isDirty, setIsDirty] = useState()
  const [isFinish, setIsFinish] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showPrevious, setShowPrevious] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const {
    test,
    question,
    updateTest,
   
    showAlert,
    updateShowAlert,

    statusQuestion,
    answerQuestion,
    updateQuestion,
    updateStatusQuestion,
    resetQuestion
  } = useStoreContext()

  useEffect(() => {
    // TODO: refractor to destructuring object
    const { countAnswered, total } = statusQuestion;

    if (id) {
      setShowNext(id >= total)
      setShowPrevious(+id <= 1)
      setShowSubmit(countAnswered === total)
    }

    //if (isFinish) navigate('/finished')
    
    return () => {}
  }, [statusQuestion])
  
  useEffect(() => {
    if (showSubmit === true)
      updateShowAlert({
        show: true,
        color: 'bg-green-400',
        title: 'Done!',
        message: 'Done questionaire now you can export the file!'
      })

  }, [showSubmit])
  

  const fetchQuestionaire = () => {
    let data = question.find((item: any) => item.id === questionaireId) || {};
    let { questions, answer, isDirty } = data;

    setQuestionTitle(questions);
    setAnswer(answer);
    setIsDirty(isDirty);

    if (! data) navigate("/NotFound")
  }

  const fetchQuestionaireStatus = () => {
    updateStatusQuestion()
  }

  const answerQuestionaire = async (value: any) => {
    if (!id) throw new Error("No value id and answer")
    answerQuestion(+id, value)
    fetchQuestionaire();
    updateStatusQuestion()
    //fetchQuestionaireStatus();
  }

  const initializeQuestionaire = () => {
    fetchQuestionaire();
    fetchQuestionaireStatus();
    updateStatusQuestion()
  }

  useEffect(() => {
    initializeQuestionaire()

    console.log("on load Questionaire.tsx")
    return () => console.log("clean up")
  }, [])


  const next = (() => {
    if (id) navigate(`/questionaire/${parseInt(id) + 1}`)
  })

  const back = (() => {
    if (id) navigate(`/questionaire/${parseInt(id) - 1}`)
  })


  const exportFile = async () => {
    const data = question
    const rows = data.map(({id, questions, answer}: any) => (
      {
        index: id,
        questions,
        answer
      }
    ))

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

    updateShowAlert({
      show: true,
      color: 'bg-green-400',
      title: 'Exported result!',
      message: 'Exported file successfully!'
    })

    initializeQuestionaire()
  }

  return (
    <>
    <Link className="ml-5 hover:underline flex" to={"/"}><FaHome className="mt-1 mr-1" />Home</Link>
    <h1><pre>{JSON.stringify(test, null, 2)}</pre></h1>
    {/* 
    <div className="absolute"><pre>{JSON.stringify(question, null, 2)}</pre></div>
    <button type="button" onClick={() => updateTest(1)}>update</button>
    */}
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
          <h1 className="text-5xl col-span-2 font-bold text-center text-gray-500">{questionTitle}</h1>
        </div>
        <div className="grid grid-cols-2 gap-x-16">
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-end text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(true)}><span>True</span></button>
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-start text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && !answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(false)}><span>False</span></button>
        </div>
        <div className="flex space-x-2">
          {statusQuestion && (
            <h1 className="text-2xl">{statusQuestion.countAnswered}/{statusQuestion.total}</h1>
          )}
          <button type="button" onClick={exportFile} className={`text-2xl hover:underline ${!showSubmit ? "hidden" : ""}`}>Export</button>
        </div>
      </div>
    </div>
    </>
  );
}



export default Questionaire;

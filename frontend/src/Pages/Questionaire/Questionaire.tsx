import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";

const URL = "http://localhost:8000/questionaires"
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900"
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

  useEffect(() => {
    // TODO: refractor to destructuring object
    const data = questionaireStatus?.data

    if (data?.countAnswered >= data?.total) {
      console.log("Done")
      navigate('/finished')
    } else {
      console.log("Not finish")
    }

    return () => {}
  }, [questionaireStatus])
  

  const fetchQuestionaire = async () => {
    const response = await fetch(`${URL}/data/${id}`, {
      method: 'GET'
    });

    const data = await response.json();
    setQuestion(data?.questions);
    setAnswer(data?.answer);
    setIsDirty(data?.isDirty);

    console.log(data)
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

  return (
    <div className="h-screen grid">
      <div className="w-2/3 mx-auto place-self-center">
        <div className="grid grid-cols-2 min-w-1/8 p-8 gap-y-16">
          <div className="">
            {questionaireStatus && Object.values(questionaireStatus).map((item: any) => (
              <h1 className="text-2xl">{item.countAnswered}/{item.total}</h1>
            ))}
          </div>
          <h1 className="text-5xl col-span-2 font-bold text-center text-gray-500">{question}</h1>
        </div>
        <div className="grid grid-cols-2">
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-center text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(true)}>True</button>
          <button className={`px-8 py-4 m-1 hover:m-0 text-2xl justify-self-center text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ${isDirty && !answer ? STYLE_CLASS.activeButton : STYLE_CLASS.nonActiveButton }`} onClick={() => answerQuestionaire(false)}>False</button>
        </div>
        <div className="grid grid-cols-2 justify-between">
          <button className="flex text-2xl hover:underline" onClick={back}><IoMdArrowBack className="mt-1" />Previous</button>
          <button className="flex text-2xl hover:underline place-self-end" onClick={next}>Next<IoArrowForwardSharp className="mt-1" /></button>
        </div>
      </div>
    </div>
  );
}

export default Questionaire;

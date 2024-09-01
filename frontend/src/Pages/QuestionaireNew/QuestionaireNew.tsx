import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useStoreContext } from '../../Store/Store'
import { FaHome } from "react-icons/fa";
import { saveAs } from 'file-saver'
import CryptoJS from 'crypto-js';

// TODO: create constants directory and file
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900",
}

function Questionaire() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const offset: any = searchParams.get('offset');
  const limit: any = searchParams.get('limit');
  
  const [questionaireId] = useState(id ? +id : null)
  const [questionTitle, setQuestionTitle] = useState('')
  const [answer, setAnswer] = useState()
  const [isDirty, setIsDirty] = useState()
  const [showNext, setShowNext] = useState(false)
  const [showPrevious, setShowPrevious] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [questionList, setQuestionList] = useState<any>([])

  const {
    question,
    updateShowAlert,
    statusQuestion,
    answerQuestion,
    updateStatusQuestion,
  } = useStoreContext()

  useEffect(() => {
    let data = question.filter((item: any) => item.id >= offset && item.id <= limit) || {};
    
    setQuestionList(data)
  }, [])

  useEffect(() => {
    const { countAnswered, total } = statusQuestion;

    if (questionaireId) {
      setShowNext(questionaireId >= total)
      setShowPrevious(questionaireId <= 1)
      setShowSubmit(countAnswered === total)
    }

    return () => {}
  }, [questionaireId, statusQuestion])
  
  useEffect(() => {
    if (showSubmit === true)
      updateShowAlert({
        show: true,
        color: 'bg-green-400',
        title: 'Done!',
        message: 'Done questionaire now you can export the file!'
      })

  }, [questionaireId, showSubmit])
  

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
    if (!questionaireId) throw new Error("No value id and answer")
    answerQuestion(+questionaireId, value)
    fetchQuestionaire();
    updateStatusQuestion()
  }

  const initializeQuestionaire = () => {
    fetchQuestionaire();
    fetchQuestionaireStatus();
    updateStatusQuestion()
  }

  useEffect(() => {
    initializeQuestionaire()
    return () => console.log("clean up")
  }, [])


  const next = (() => {
    if (id && !isDirty) navigate(`/questionaire/${parseInt(id) + 1}`)
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

    const passphrase: any = process.env.REACT_APP_PASSPHASE;
    const encryptedData = await CryptoJS.AES.encrypt(JSON.stringify(rows), passphrase).toString();
    const blob = new Blob([encryptedData], {type: "text/plain;charset=utf-8"});
    const fileName = `${month}${day}${year}${hour}${minutes}${seconds}_bpi-result.txt`
    saveAs(blob, fileName);
   
    updateShowAlert({
      show: true,
      color: 'bg-green-400',
      title: 'Exported result!',
      message: 'Exported file successfully!'
    })

    initializeQuestionaire()
  }

  return (
    <div className="h-screen grid">
      {questionList && (
        <div className="grid grid-cols-2">
          {questionList.map(({id, questions, isDirty, answer}: any) => 
            <div>
              <p className="text-2xl">{questions}</p>
              <button type="button" className="">True</button>
              <button type="button">False</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



export default Questionaire;

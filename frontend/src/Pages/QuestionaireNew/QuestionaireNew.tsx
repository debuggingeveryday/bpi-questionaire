import React, { useState, useEffect, Fragment } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useStoreContext } from "../../Store/Store";
import { FaHome } from "react-icons/fa";
import { saveAs } from "file-saver";
import CryptoJS from "crypto-js";
import DisplayJSON from "../../Components/Debug/DisplayJSON";

// TODO: create constants directory and file
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900",
};

function Questionaire() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initOffset: any = searchParams.get("offset");
  const initLimit: any = searchParams.get("limit");
  const [questionaireId] = useState(id ? +id : null);
  const [showNext, setShowNext] = useState(false);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [questionList, setQuestionList] = useState<any>([]);

  const {
    question,
    updateShowAlert,
    statusQuestion,
    answerQuestion,
    updateStatusQuestion,
  } = useStoreContext();

  useEffect(() => {
    fetchQuestionaire();
  }, []);

  useEffect(() => {
    const { countAnswered, total } = statusQuestion;

    if (questionaireId) {
      setShowNext(questionaireId >= total);
      setShowPrevious(questionaireId <= 1);
      setShowSubmit(countAnswered === total);
    }

    return () => {};
  }, [questionaireId, statusQuestion]);

  useEffect(() => {
    if (showSubmit === true)
      updateShowAlert({
        show: true,
        color: "bg-green-400",
        title: "Done!",
        message: "Done questionaire now you can export the file!",
      });
  }, [questionaireId, showSubmit]);

  const fetchQuestionaire = (offset = initOffset, limit = initLimit) => {
    let data =
      question.filter((item: any) => item.id >= offset && item.id <= limit) ||
      {};

    setQuestionList(data);
  };

  const fetchQuestionaireStatus = () => {
    updateStatusQuestion();
  };

  const initializeQuestionaire = () => {
    fetchQuestionaire();
    fetchQuestionaireStatus();
    updateStatusQuestion();
  };

  useEffect(() => {
    initializeQuestionaire();
    return () => console.log("clean up");
  }, []);

  const exportFile = async () => {
    const data = question;
    const rows = data.map(({ id, questions, answer }: any) => ({
      index: id,
      questions,
      answer,
    }));

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
    const encryptedData = await CryptoJS.AES.encrypt(
      JSON.stringify(rows),
      passphrase
    ).toString();
    const blob = new Blob([encryptedData], {
      type: "text/plain;charset=utf-8",
    });
    const fileName = `${month}${day}${year}${hour}${minutes}${seconds}_bpi-result.txt`;
    saveAs(blob, fileName);

    updateShowAlert({
      show: true,
      color: "bg-green-400",
      title: "Exported result!",
      message: "Exported file successfully!",
    });

    initializeQuestionaire();
  };

  const next = () => {
    navigate("/questionaire-new/query?", { state: { key: "value" } });
  };

  const userAnswer = (id: number, value: boolean) => {
    answerQuestion(id, value);

    fetchQuestionaire();
  };

  return (
    <div className="h-screen grid grid-cols-1 justify-items-center content-center">
      {questionList && (
        <div className="w-3/5 grid grid-cols-1">
          <div className="grid grid-cols-2">
            <button type="button" className="flex">
              <IoMdArrowBack className="mt-1" />
              <p>Back</p>
            </button>
            <button
              type="button"
              onClick={next}
              className="flex justify-self-end"
            >
              <p>Next</p>
              <IoArrowForwardSharp className="mt-1" />
            </button>
          </div>
          <div className="mt-5">
            {questionList.map(
              ({ id, questions, isDirty, answer }: any, index: number) => (
                <div
                  key={index}
                  className="flex text-1xl mb-5 justify-self-end"
                >
                  <div className="grow">
                    <p>
                      {index + 1}. {questions}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 space-x-2 place-content-between">
                    <button
                      type="button"
                      onClick={() => userAnswer(id, true)}
                      className={`text-slate-900 bg-slate-100 border rounded-lg py-2 px-4 ${
                        answer && isDirty && "bg-slate-900 text-white"
                      }`}
                    >
                      True
                    </button>
                    <button
                      type="button"
                      onClick={() => userAnswer(id, false)}
                      className={`text-slate-900 bg-slate-100 border rounded-lg py-2 px-4 ${
                        !answer && isDirty && "bg-slate-900 text-white"
                      }`}
                    >
                      False
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Questionaire;

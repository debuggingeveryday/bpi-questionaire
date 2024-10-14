import React, { useState, useEffect, Fragment } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useStoreContext } from "../../Store/Store";
import { FaHome } from "react-icons/fa";
import { saveAs } from "file-saver";
import CryptoJS from "crypto-js";
import DisplayJSON from "../../Components/Debug/DisplayJSON";
import { IoMdDownload } from "react-icons/io";

// TODO: create constants directory and file
const STYLE_CLASS = {
  activeButton: "text-slate-100 bg-slate-900",
  nonActiveButton: "bg-white text-slate-900",
};

function Questionaire() {
  let { offset, limit }: any = useParams();
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState<any>([]);
  const [showExport, setShowExport] = useState(false);
  const [visible, setVisibile] = useState<any>({
    showBack: true,
    showNext: true,
  });

  const {
    question,
    updateShowAlert,
    statusQuestion,
    answerQuestion,
    updateStatusQuestion,
  } = useStoreContext();

  const [status, setStatus] = useState(statusQuestion);

  useEffect(() => {
    if (statusQuestion.countAnswered >= statusQuestion.total) {
      updateShowAlert({
        show: true,
        color: "bg-green-400",
        title: "Exported result!",
        message: "Exported file successfully!",
      });

      setShowExport(true);
    }
  }, [statusQuestion]);

  useEffect(() => {
    if (offset <= 1) setVisibile({ ...visible, showBack: false });
    if (limit >= statusQuestion.total)
      setVisibile({ ...visible, showNext: false });
  }, [offset, limit]);

  const fetchQuestionaire = () => {
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

  const back = () => {
    let newOffset = +offset - 10;
    let newLimit = +limit - 10;

    navigate(`/questionaire/${newOffset}/${newLimit}`);
  };

  const next = () => {
    let newOffset = +offset + 10;
    let newLimit = +limit + 10;

    navigate(`/questionaire/${newOffset}/${newLimit}`);
  };

  const userAnswer = (id: number, value: boolean) => {
    answerQuestion(id, value);
    fetchQuestionaire();
  };

  return (
    <div className="h-screen grid grid-cols-1 justify-items-center content-center">
      <div className="flex justify-self-start space-x-2">
        <Link className="ml-5 hover:underline flex justify-self-start" to={"/"}>
          <FaHome className="mt-1 mr-1" />
          Home
        </Link>
        <p className="justify-self-end">
          from: {offset} to: {limit} total: {statusQuestion.total}
        </p>
      </div>
      {questionList && (
        <div className="w-3/5 grid grid-cols-1">
          <div className="grid grid-flow-col">
            <button
              onClick={back}
              type="button"
              className={`flex justify-self-start ${
                !visible.showBack && "hidden"
              }`}
            >
              <IoMdArrowBack className="mt-1" />
              <p>Back</p>
            </button>
            <button
              type="button"
              onClick={next}
              className={`flex justify-self-end ${
                !visible.showNext && "hidden"
              }`}
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
                      {+offset + index}. {questions}
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
          {showExport && (
            <>
              <button
                type="button"
                onClick={exportFile}
                className="text-2xl hover:underline flex"
              >
                <p>Export answer</p>
                <IoMdDownload className="mt-2" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Questionaire;

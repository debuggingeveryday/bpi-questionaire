/* TODO: seperate state and function by it's purposes */

import { createContext, useContext, useState, useEffect } from 'react';
import { getAllQuestionaire, answerQuestionaire, statusQuestionaire, resetQuestionaire } from "../Data/questionaire"

const SHOW_ALERT = {
  show: false,
  color: '',
  title: '',
  message: ''
}

interface IShowAlert {
  show?: boolean;
  color?: string;
  title?: string;
  message?: string;
}

interface IStoreContext {
  test?: any;
  updateTest: (value: any) => void;
  
  // Alert

  showAlert: IShowAlert;
  updateShowAlert: (value: IShowAlert) => void;

  // Question
  question: any;
  updateQuestion: () => void;
  answerQuestion: (id: number, value: boolean) => void;
  statusQuestion: any;
  updateStatusQuestion: () => void;
  resetQuestion: () => void;
}

export const StoreContext = createContext<IStoreContext>({
  test: '',
  updateTest: (value) => {},

  // Alert
  showAlert: {},
  updateShowAlert: (value: IShowAlert) => {},

  // Question
  question: {},
  updateQuestion: () => {},
  answerQuestion: (id, value) => {},
  statusQuestion: {},
  updateStatusQuestion: () => {},
  resetQuestion: () => {}
});

export default function Store({children}: {children: any}) {
  const [ test, setTest ] = useState();
  
  const [showAlert, setShowAlert] = useState({})

  const [ question, setQuestion] = useState(getAllQuestionaire)

  const [ statusQuestion, setStatusQuestion ] = useState(statusQuestionaire(question))

  useEffect(() => {
    //console.log(findById(1))
  }, [])
  

  const updateShowAlert = (value: IShowAlert) => {
    setShowAlert(value)

    setTimeout(() => {
      setShowAlert(SHOW_ALERT)
    }, 3000);
  }

  const updateQuestion = () => {
    
  }

  const answerQuestion = (id: number, value: boolean) => {
    answerQuestionaire(id, value)
  }

  const updateStatusQuestion = () => {
    setStatusQuestion(statusQuestionaire(question))
  }

  const updateTest = (value: any) => {
    setTest(value)
  }

  const resetQuestion = () => {
    setQuestion((prev: any) => {
      let oldData = prev.map((item: any) => {
        item.isDirty = false;
        item.answer = false;

        return item
      })

      return oldData
    })

    setStatusQuestion(statusQuestionaire(question))
    resetQuestionaire()
  }

  const storeState = {
    test,
    updateTest,
    
    // Alert
    showAlert,
    updateShowAlert,
    
    // Questionaire
    question,
    updateQuestion,
    answerQuestion,
    updateStatusQuestion,
    statusQuestion,
    resetQuestion
  }

  return (
    <StoreContext.Provider value={storeState}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext);

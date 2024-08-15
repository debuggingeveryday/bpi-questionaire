import { createContext, useContext, useState, useEffect } from 'react';
import { getAllQuestionaire, answerQuestionaire, statusQuestionaire, resetQuestionaire } from "../Data/questionaire"

interface IStoreContext {
  test?: any;
  updateTest: (value: any) => void;
  showAlertSuccess: boolean;
  updateShowAlertSuccess: () => void;
  showAlertWarn: boolean;
  updateShowAlertWarn: () => void;
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
  showAlertSuccess: false,
  updateShowAlertSuccess: () => {},
  showAlertWarn: false,
  updateShowAlertWarn: () => {},
  question: {},
  updateQuestion: () => {},
  answerQuestion: (id, value) => {},
  statusQuestion: {},
  updateStatusQuestion: () => {},
  resetQuestion: () => {}
});

export default function Store({children}: {children: any}) {
  const [ test, setTest ] = useState();
  const [ showAlertSuccess, setShowAlertSuccess ] = useState(false)
  const [ showAlertWarn, setShowAlertWarn ] = useState(false)
  const [ question, setQuestion] = useState(getAllQuestionaire)

  const [ statusQuestion, setStatusQuestion ] = useState(statusQuestionaire(question))

  useEffect(() => {
    //console.log(findById(1))
  }, [])
  

  const updateShowAlertSuccess = () => {
    setShowAlertSuccess(true)

    setTimeout(() => {
      setShowAlertSuccess(false)
    }, 3000);
  }

  const updateShowAlertWarn = () => {
    setShowAlertWarn(true)

    setTimeout(() => {
      setShowAlertWarn(false)
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
    statusQuestion,
    showAlertSuccess,
    updateShowAlertSuccess,
    showAlertWarn,
    updateShowAlertWarn,
    question,
    updateQuestion,
    answerQuestion,
    updateStatusQuestion,
    resetQuestion
  }

  return (
    <StoreContext.Provider value={storeState}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext);

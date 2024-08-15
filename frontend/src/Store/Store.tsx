import { createContext, useContext, useState } from 'react';

interface IStoreContext {
  test?: any;
  updateTest: (newValue: any) => void;
  questionaireStats: any;
  showAlertSuccess: boolean;
  updateShowAlertSuccess: () => void;
  showAlertWarn: boolean;
  updateShowAlertWarn: () => void;
}

export const StoreContext = createContext<IStoreContext>({
  test: '',
  updateTest: () => {},
  questionaireStats: {},
  showAlertSuccess: false,
  updateShowAlertSuccess: () => {},
  showAlertWarn: false,
  updateShowAlertWarn: () => {}
});

export default function Store({children}: {children: any}) {
  const [ test, setTest ] = useState();
  const [ showAlertSuccess, setShowAlertSuccess ] = useState(false)
  const [ showAlertWarn, setShowAlertWarn ] = useState(false)
  const [ questionaireStats, setQuestionaireStats ] = useState({})

  const updateTest = (newValue: any) => setTest(value => newValue)

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



  const storeState = {
    test,
    updateTest,
    questionaireStats,
    showAlertSuccess,
    updateShowAlertSuccess,
    showAlertWarn,
    updateShowAlertWarn
  }

  return (
    <StoreContext.Provider value={storeState}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext);

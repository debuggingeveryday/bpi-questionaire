import { createContext, useContext, useState } from 'react';

interface IStoreContext {
  test?: any;
  updateTest: (newValue: any) => void;
  questionaireStats: any;
}

export const StoreContext = createContext<IStoreContext>({
  test: '',
  updateTest: () => {},
  questionaireStats: {}
});

export default function Store({children}: {children: any}) {
  const [ test, setTest ] = useState();
  const [ questionaireStats, setQuestionaireStats ] = useState({})

  const updateTest = (newValue: any) => setTest(value => newValue)

  const storeState = {
    test,
    updateTest,
    questionaireStats
  }

  return (
    <StoreContext.Provider value={storeState}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext);

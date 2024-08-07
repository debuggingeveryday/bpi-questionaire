import React, { createContext, useContext } from 'react';
import Layout from './Layout'
import Store from './Store/Store'

function App() {
  return (
    <div className="App">
      <Store>
        <Layout />
      </Store>
    </div>
  );
}

export default App;

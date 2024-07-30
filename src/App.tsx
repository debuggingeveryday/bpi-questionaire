import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

function App() {
 
  useEffect(() => {

    return () => console.log("clean up")
  }, [])
  

  return (
    <div className="App">
    
    </div>
  );
}

export default App;

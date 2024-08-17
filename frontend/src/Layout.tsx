import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './Router'
import Alert from './Components/Alert'
import { useStoreContext } from './Store/Store'

function Layout() {
  const { showAlert } = useStoreContext();
  const { show, color, title, message } = showAlert
  
  return (
    <>
      <Alert showAlert={show} bgColor={color} title={title} message={message} />
      <div className="bg-gradient-to-b from-sky-200 max-w h-screen">
      <RouterProvider router={router} />
      </div>
    </>
  )
};

export default Layout;

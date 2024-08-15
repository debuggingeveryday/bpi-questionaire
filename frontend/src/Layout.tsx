import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './Router'
import Alert from './Components/Alert'
import { useStoreContext } from './Store/Store'

function Layout() {
  const { showAlertSuccess, showAlertWarn } = useStoreContext();

  return (
    <>
      {/* TODO: redundant make it reuseable */}
      <Alert showAlert={showAlertSuccess} bgColor="bg-green-400" title="Done test!" description="Now you can export file!" />
      <Alert showAlert={showAlertWarn} bgColor="bg-yellow-300" title="Question cleared!" description="All question and answer has beem cleared!" />
      <div className="bg-gradient-to-b from-sky-200 max-w h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  )
};

export default Layout;

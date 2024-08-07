import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './Router'

function Layout() {
  return (
    <>
      <div className="bg-gradient-to-b from-sky-200 max-w h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  )
};

export default Layout;

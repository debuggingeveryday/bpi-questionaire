import React, { useEffect, useState } from 'react'

const Alert = (props: any) => {
  return (
    <>
    {props.showAlert ? (
    <div className={`fixed right-3 top-3 animate-fade-in rounded-lg w-[600px] h-32 text-[#ffffff] ${props.bgColor}`}>
      <div className="flex flex-row w-full gap-5 justify-center items-center px-5 w-full h-full">
        <div className="my-auto text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
      </div>
      <div>
        <div className="font-bold text-2xl">{props.title || ""}</div>
        <div className="text-lg">{props.message || ""}</div>
      </div>
      </div>
    </div>
    ) : (
      <></>
    )}
    </>
  )

}

export default Alert

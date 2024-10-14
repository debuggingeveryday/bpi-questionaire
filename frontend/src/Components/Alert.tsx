import React, { useEffect, useState } from "react";

const Alert = (props: any) => {
  return (
    <>
      {/* TODO: make conditional component and replace this */}
      {props.showAlert ? (
        <div
          className={`fixed right-3 top-3 animate-fade-in rounded-lg w-[300px] h-20 text-[#ffffff] ${props.bgColor}`}
        >
          <div className="flex flex-row w-full gap-5 justify-center items-center px-5 w-full h-full">
            <div className="my-auto text-1xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-info"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">{props.title || ""}</div>
              <div className="text-sm">{props.message || ""}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;

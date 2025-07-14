import React from 'react';

function PinSuccess() {
  return (
    <div className="flex flex-col items-center justify-center  bg-white rounded-xl shadow-lg  gap-3 pb-6 pt-6 pl-4 pr-4">
      <div className="flex items-center justify-center bg-green-500 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800">등록 완료</h1>
        <p className=" text-sm text-gray-500">보안 PIN 등록이 완료되었습니다.</p>
      </div>
    </div>
  );
}

export default PinSuccess;

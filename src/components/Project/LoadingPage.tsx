import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">로딩중...</p>
    </div>
  );
};

export default LoadingPage;

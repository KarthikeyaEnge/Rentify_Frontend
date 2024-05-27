import React from "react";

const Out = ({ htmlFor, value }) => {
  return (
    <div className="mx-2 mt-5 flex flex-row flex-nowrap flex-shrink justify-evenly items-center">
      <label
        htmlFor="username"
        className="font-sora xl:text-3xl text-xl text-slate-200 "
      >
        {htmlFor}
      </label>
      <input
        type="text"
        name="username"
        className="bg-[#051F3E] rounded-full text-sky-500 font-sora p-2 outline-none ring-1 ring-sky-500 shadow-lg shadow-slate-800 w-1/2"
        value={value}
      />
    </div>
  );
};

export default Out;

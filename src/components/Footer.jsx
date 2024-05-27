// eslint-disable-next-line no-unused-vars
import React from "react";

const Footer = () => {
  return (
    <footer className=" text-center text-2xl font-cinzeldec text-slate-300 min-w-full h-auto p-5  bg-slate-900">
      &copy; Rentify {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;

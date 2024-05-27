// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { useRef } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../utils/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Loginx = () => {
  const user = useRef("");
  const pass = useRef("");

  const { setUsr, setUserdata } = useAuth();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    e.preventDefault();

    const reqdata = {
      user: user.current.value,
      pass: pass.current.value,
    };
    console.log(reqdata);
    const result = await axios.post(
      "https://rentify-backend-pk7r.onrender.com/rentify/login",
      reqdata
    );
    if (result.status === 200) {
      console.log("validated");
      toast.success("login successfull");

      await delay(2000);
      setUsr(user.current.value);
      setUserdata(result.data.data);
      sessionStorage.setItem("user", user.current.value);
      //sessionStorage.setItem("pass", pass.current.value);
      sessionStorage.setItem("userdata", JSON.stringify(result.data.data));
    } else {
      console.log("error");
      toast.error(result.data.message);
    }

    user.current.value = "";
    pass.current.value = "";
  };

  return (
    <>
      {!sessionStorage.getItem("user") ? (
        <main className=" min-h-screen bg-slate-200 overflow-x-hidden">
          <div className="flex flex-col h-screen items-center justify-center flex-nowrap bgimg  z-50 gap-4">
            <h1 className="text-2xl text-slate-900">Hey! 👋 Welcome Back!!</h1>
            <form>
              <h1 className="xl:text-7xl lg:text-6xl text-4xl bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 bg-clip-text text-transparent font-cinzeldec font-bold mb-10 -mt-5 mx-2  ">
                Rentify
              </h1>

              <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                Username
                <input
                  type="text"
                  className="input "
                  placeholder="John Doe"
                  required
                  ref={user}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mt-3 bg-white text-slate-900">
                Password
                <input
                  type="password"
                  placeholder="**********"
                  required
                  ref={pass}
                />
              </label>

              <div className="flex flex-col justify-center  items-center gap-5 mt-2">
                <button
                  type="button"
                  className="btn btn-neutral w-1/2"
                  onClick={(e) => handleLogin(e)}
                >
                  LOG IN
                </button>
                <div className="divider text-slate-900"> or </div>
                <Link to={"/signup"} className="btn btn-info w-1/2">
                  SIGN UP
                </Link>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <Navigate to="/profile" />
      )}
    </>
  );
};

export default Loginx;

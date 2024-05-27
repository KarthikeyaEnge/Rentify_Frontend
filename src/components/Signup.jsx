// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { useRef } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../utils/AuthProvider";
import toast from "react-hot-toast";

const Loginx = () => {
  const user = useRef("");
  const pass = useRef("");
  const fname = useRef("");
  const lname = useRef("");
  const email = useRef("");
  const phone = useRef("");
  const type = useRef("");

  // eslint-disable-next-line no-unused-vars
  const { setUsr, usr } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    const reqdata = {
      user: user.current.value,
      pass: pass.current.value,
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
      phone: phone.current.value,
      type: type.current.value,
    };
    console.log(reqdata);

    const result = await axios.post(
      "http://localhost:3000/rentify/signup",
      reqdata
    );
    if (result.status === 200) {
      toast.success("Registration successfull");
      setUsr(user.current.value);
      sessionStorage.setItem("user", user.current.value);
      sessionStorage.setItem("userdata", reqdata);
    } else {
      toast.error("login failed");
    }
    user.current.value = "";
    pass.current.value = "";
    fname.current.value = "";
    lname.current.value = "";
    email.current.value = "";
    phone.current.value = "";
    type.current.value = "";
  };

  return (
    <>
      {!sessionStorage.getItem("user") ? (
        <main className=" min-h-screen bg-slate-200 overflow-x-hidden">
          <div className="flex flex-col h-screen items-center justify-center flex-nowrap bgimg  z-50 gap-4">
            <h1 className="text-2xl text-slate-900">Hey! 👋 Welcome Back!!</h1>
            <form className="flex flex-col gap-3">
              <h1 className="xl:text-7xl lg:text-6xl text-4xl bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 bg-clip-text text-transparent font-cinzeldec font-bold mb-10 -mt-5 mx-2 ">
                Rentify
              </h1>

              <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                First Name
                <input
                  type="text"
                  className="input "
                  placeholder="John"
                  required
                  ref={fname}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                Last Name
                <input
                  type="text"
                  className="input "
                  placeholder="Doe"
                  required
                  ref={lname}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                UserName
                <input
                  type="text"
                  className="input "
                  placeholder="John Doe"
                  required
                  ref={user}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2  bg-white text-slate-900">
                Password
                <input
                  type="password"
                  placeholder="**********"
                  required
                  ref={pass}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2  bg-white text-slate-900">
                email
                <input
                  type="email"
                  placeholder="xyz@xyz.com"
                  required
                  ref={email}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2  bg-white text-slate-900">
                phone
                <input
                  type="text"
                  placeholder="999-----99"
                  required
                  ref={phone}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-slate-900">Register as</span>
                </div>
                <select
                  className="select select-bordered bg-white text-slate-900"
                  ref={type}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>Seller</option>
                  <option>Buyer</option>
                </select>
              </label>

              <button
                type="button"
                className="btn btn-info w-1/2"
                onClick={(e) => handleSignup(e)}
              >
                Register
              </button>
            </form>
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Loginx;

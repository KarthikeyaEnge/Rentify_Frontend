// eslint-disable-next-line no-unused-vars
import React from "react";
import avatar from "../assets/avatar.gif";
import { useAuth } from "../utils/AuthProvider";
import { Navigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Out from "./Out";
const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  const { usr, setUsr, userdata } = useAuth();
  //const [pass, setPass] = useState();

  /*  useEffect(() => {
    const abortController = new AbortController();
    axios
      .post("http://localhost:3000/rentify/getprop/", { ids: userdata.propid })
      .then((res) => {
        setProperty(res.data.data);
      });
    console.log(props);
    return () => {
      abortController.abort();
    };
  }, []); */

  const title = useRef("");
  const place = useRef("");
  const area = useRef("");
  const nobed = useRef("");
  const nobath = useRef("");
  const lmark = useRef("");

  const handlelogout = async (e) => {
    e.preventDefault();
    toast.success("logged out");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userdata");
    window.location.reload();
  };

  const handlehist = async (e) => {
    e.preventDefault();
    const reqdata = {
      user: usr,
      title: title.current.value,
      place: place.current.value,
      area: area.current.value,
      nobed: nobed.current.value,
      nobath: nobath.current.value,
      lmark: lmark.current.value,
    };

    const result = await axios.post(
      "https://rentify-backend-pk7r.onrender.com/rentify/addprop",
      reqdata
    );
    if (result.status === 200) {
      toast.success("Property Added Successfully");
    } else {
      toast.error("Error Adding Property");
    }
  };

  return (
    <>
      {usr && userdata ? (
        <main className="bg-slate-900 min-h-screen w-auto flex flex-col">
          <div className="w-full flex items-center justify-center">
            <h1 className=" text-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 bg-clip-text text-transparent font-cinzeldec font-bold  mx-2 mt-5  ">
              Rentify
            </h1>
          </div>

          <div className="flex mt-14 flex-col ">
            <h1 className="xl:text-5xl text-4xl font-sora text-slate-200 flex flex-row w-full justify-between items-center">
              DASHBOARD
              <button
                className="p-2 mr-5 text-xl font-sora bg-sky-500 text-slate-900 rounded-xl my-1 shadow-md shadow-slate-950 "
                onClick={(e) => handlelogout(e)}
              >
                logout
              </button>
            </h1>
            <hr className="xl:border-sky-500 xl:border border-0" />
            <img
              src={avatar}
              alt="avatar"
              className=" hidden xl:block xl:w-72  xl:h-64 rounded-full self-center xl:-mt-24 "
            />
          </div>

          <section className="w-full flex flex-col justify-center items-center mt-8">
            <img
              src={avatar}
              alt="avatar"
              className=" xl:hidden rounded-full self-center w-28 h-28 z-10"
            />
            <h1 className="text-sky-200 text-3xl font-nunito">
              {userdata.UserName}:{userdata.Type}
            </h1>
            <form
              action=""
              className="bg-[#4a567ea9] xl:w-1/2 w-80 h-auto p-3 rounded-3xl mt-5"
            >
              <Out htmlFor={"UserName"} value={userdata.UserName} />
              <Out htmlFor={"Password"} value={userdata.Password} />
              <Out htmlFor={"FirstName"} value={userdata.FirstName} />
              <Out htmlFor={"LastName"} value={userdata.LastName} />
              <Out htmlFor={"phone"} value={userdata.Phone} />
              <Out htmlFor={"email"} value={userdata.Email} />
            </form>
          </section>

          {userdata.Type === "Seller" ? (
            <section className="px-8">
              <h1 className="font-sora text-3xl text-white self-start">
                History
              </h1>

              <div className="collapse collapse-plus bg-base-200 mt-2">
                <input type="radio" name="my-accordion-3" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                  Post More Properties..
                </div>
                <div className="collapse-content">
                  <form className="flex flex-col gap-2 p-5">
                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Title
                      <input
                        type="text"
                        className="input "
                        placeholder="2BHK Apartment etc."
                        required
                        ref={title}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Place
                      <input
                        type="text"
                        className="input "
                        placeholder="Hyderabad etc."
                        required
                        ref={place}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Area
                      <input
                        type="number"
                        className="input "
                        placeholder="1000 sqft"
                        required
                        ref={area}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Number of Bedrooms
                      <input
                        type="text"
                        className="input "
                        placeholder="2"
                        required
                        ref={nobed}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Number of Bathrooms
                      <input
                        type="text"
                        className="input "
                        placeholder="2"
                        required
                        ref={nobath}
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-slate-900">
                      Landmarks Nearby
                      <input
                        type="text"
                        className="input "
                        placeholder="Hospitals, Schools, etc."
                        required
                        ref={lmark}
                      />
                    </label>

                    <button
                      className="btn btn-primary"
                      onClick={(e) => handlehist(e)}
                    >
                      <FaPlus /> Add
                    </button>
                  </form>
                </div>
              </div>

              <ul>
                <h1 className="text-3xl font-manrope font-bold">
                  Previous Posts
                </h1>
                {userdata?.propdata &&
                  userdata.propdata.map((items) => {
                    return (
                      <li key={items._id} className="p-2 bg-orange-400 m-3">
                        <div className="card-body bg-slate-800">
                          <h2 className="card-title">{items.Title}</h2>
                          <p>{items.Place}</p>
                          <p> Area: {items.Area}</p>
                          <p>Number of Bedrooms: {items.Nobed}</p>
                          <p>Number of Bathrooms: {items.Nobath}</p>
                          <p>Landmark: {items.Lmark}</p>
                          <div className="card-actions justify-end"></div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ) : null}
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Profile;

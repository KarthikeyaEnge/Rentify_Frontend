// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState, useRef } from "react";
import { useContent } from "../utils/Conprovider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, setData, filter, setFilter } = useContent();
  const [usrdd, setUsrdd] = useState();
  const navigate = useNavigate();

  const hadleAreaFilter = (value) => {
    const filtered =
      value === ""
        ? data
        : data.filter((item) => parseInt(item.Area) <= parseInt(value));
    setFilter(filtered);
  };

  const hadlenobedFilter = (value) => {
    const filtered =
      value === "" ? data : data.filter((item) => item.Nobed === value);
    setFilter(filtered);
  };

  const hadlenobathFilter = (value) => {
    const filtered =
      value === "" ? data : data.filter((item) => item.Nobath === value);
    setFilter(filtered);
  };

  const handleinterest = async (e, user) => {
    e.preventDefault();
    const usr = sessionStorage.getItem("user");
    if (!usr) navigate("/login");
    else {
      const res = await axios.post(
        "https://rentify-backend-pk7r.onrender.com/rentify/getusr/",
        {
          user: user,
        }
      );
      setUsrdd(res.data.data);
      console.log(usrdd);
      const dial = document.getElementById("my_modal_4");
      dial.showModal();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get("https://rentify-backend-pk7r.onrender.com/rentify/getprop/")
      .then((res) => {
        setFilter(res.data.data);
        setData(res.data.data);
      });

    //console.log(data);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-slate-900 p-2">
        <h1 className="text-2xl font-bold font-exo">Filter</h1>
        <div className="flex flex-row flex-wrap gap-2">
          <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-slate-200 w-fit">
            Area(less than)
            <input
              type="number"
              className="input "
              placeholder="500"
              onChange={(e) => hadleAreaFilter(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-slate-200 w-fit">
            No. of Bedrooms
            <input
              type="number"
              className="input "
              placeholder="2"
              onChange={(e) => hadlenobedFilter(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-slate-200 w-fit">
            No. of Bathrooms
            <input
              type="number"
              className="input "
              placeholder="3"
              onChange={(e) => hadlenobathFilter(e.target.value)}
              required
            />
          </label>
        </div>
      </nav>

      <div className="flex flex-col gap-4 p-4">
        {filter?.map((item) => {
          return (
            <div
              className="card card-side bg-slate-700 shadow-xl"
              key={item._id}
            >
              <div className="card-body">
                <h2 className="card-title">{item.Title}</h2>
                <p>{item.Place}</p>
                <p> Area: {item.Area}</p>
                <p>Number of Bedrooms: {item.Nobed}</p>
                <p>Number of Bathrooms: {item.Nobath}</p>
                <p>Landmark: {item.Lmark}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleinterest(e, item.UserName)}
                  >
                    I&apos;m Interested
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {usrdd && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Seller Details</h3>
            <p className="py-4">Name: {usrdd?.UserName}</p>
            <p className="py-4">Email: {usrdd?.Email}</p>
            <p className="py-4">Phone: {usrdd?.Phone}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
};

export default Home;

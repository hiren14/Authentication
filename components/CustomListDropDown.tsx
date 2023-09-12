"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function CustomListDropDown() {
  const { data: session } = useSession(); 
  const router = useRouter();

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);

  const states = ["Select State","UP", "Delhi", "Gujrat"];

  const cities = {
    UP: ["Select city",,"f", "g", "l"],

    Delhi: ["Select city",,"a", "b"],

    Gujrat: ["Select city",,"tr", "trt", "rtt"],
  };

  const adders ={
    tr: ["Select add",,"tr", "trt", "rtt"],
    trt: ["Select add","tr", "trt", "rtt"],
    rtt: ["Select add",,"tr", "trt", "rtt"],
    f:  ["Select add","f", "g", "l"],
    g:  ["Select add","f", "g", "l"],
    l:  ["Select add","f", "g", "l"],
    a: ["Select add","a", "b"],
  };
  const products = ["Select products","moblie", "wire", "led"];

  //  use state
  const [selectedState, setSelectedState] = useState("");
  const [Product, setProduct] = useState("");
  let [fullname, setFullname] = useState("");
  let [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
    const [adder, setAdder] = useState("");

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

fullname = session?.user?.name;
email = session?.user?.email;  
  const next = () => {
    if (formNo === 1 && fullname && email && number) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && selectedState) {
      setFormNo(formNo + 1);
    } 
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", number);
    console.log("city",city);
    console.log("add",adder)
    console.log("p",Product);

    const res = await fetch("api/ewaste-list", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        number,
        selectedState,
        city,
        adder,
        Product,
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname("");
      setEmail("");
      setNumber("");
      setSelectedState("");
      setCity("");
      setProduct("");
      router.push("/sucess");
    }
  };

  return (
   <>
       <div className="grid place-items-center h-screen">

    <form
      onSubmit={handleSubmit}
      className="py-4 mt-4 border-t flex flex-col gap-5"
    >
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <ToastContainer />

          <div className="flex justify-center items-center">
            {formArray.map((v, i) => (
              <>
                <div
                  className={`w-[35px] my-3 text-white rounded-full ${
                    formNo - 1 === i ||
                    formNo - 1 === i + 1 ||
                    formNo === formArray.length
                      ? "bg-blue-500"
                      : "bg-slate-400"
                  } h-[35px] flex justify-center items-center`}
                >
                  {v}
                </div>
                {i !== formArray.length - 1 && (
                  <div
                    className={`w-[85px] h-[2px] ${
                      formNo === i + 2 || formNo === formArray.length
                        ? "bg-blue-500"
                        : "bg-slate-400"
                    }`}
                  ></div>
                )}
              </>
            ))}
          </div>
          {formNo === 1 && (
            <div>
              <div className="flex flex-col mb-2">
                <label htmlFor="name">Name</label>
                <input
            onChange={(e) => setFullname(e.target.value)}
            value={session?.user?.name}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="text"
                  name="fullname"
                  placeholder="name"
                  id="fullname"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={session?.user?.email}
                   className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  id="email"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="batch">Phone number</label>
                <input
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                  type="text"
                  name="number"
                  placeholder="Enter your number"
                />
              </div>
              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={next}
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {formNo === 2 && (
            <div>
              <div className="flex flex-col mb-2">
                <label className="text-slate-500" htmlFor="city">
                  State
                </label>

                <select
                  className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                  name="state"
                  placeholder="state name"
                  id="state"
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                  }}
                >
                  {states.map((state) => {
                    // eslint-disable-next-line react/jsx-key
                    return <option value={state}>{state}</option>;
                  })}
                </select>
              </div>
              <div className="flex flex-col mb-2">
                {/* <label className='text-slate-500' htmlFor="address">Address</label>
              <textarea value={state.address} onChange={inputHandle} row='10' className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="number" name='address' placeholder='address' ></textarea> */}
                {selectedState && (
                  <select
                    className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                    name="city"
                    placeholder="city name"
                    id="city"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  
                  >
                    {cities[selectedState].map((city) => {
                      // eslint-disable-next-line react/jsx-key
                      return <option value={city}>{city}</option>;
                    })}
                  </select>
                )}
</div>
              
              {/* adderes logic  */}
              <div className="flex flex-col mb-2">
                             <label className="text-slate-500" htmlFor="city">
                  address
                </label> 
                {/* <textarea value={state.address} onChange={inputHandle} row='10' className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="number" name='address' placeholder='address' ></textarea> */} 
                {city && (
                  <select
                    className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                    name="adder"
                    placeholder="adder name"
                    id="adder"
                    onChange={(e) => setAdder(e.target.value)}
                    value={adder}
                  
                  >
                    {adders[city].map((adder) => {
                      // eslint-disable-next-line react/jsx-key
                      return <option value={adder}>{adder}</option>;
                    })}
                  </select>
                )}
              </div>
              <div className="mt-4 gap-3 flex justify-center items-center">
                <button
                  onClick={pre}
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Previous
                </button>
                <button
                  onClick={next}
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Next
                </button>
              </div>
              </div>
            
          )}

          {formNo === 3 && (
            <div>
              <div className="flex flex-col mb-2">
                <label htmlFor="district">Device List</label>

                <select
                  className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                  name="products"
                  id="products"
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                >
                  {products.map((products) => {
                    // eslint-disable-next-line react/jsx-key
                    return <option>{products}</option>;
                  })}
                </select>
              </div>
              <div className="mt-4 gap-3 flex justify-center items-center">
                <button
                  onClick={pre}
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Previous
                </button>
                <button
               type="submit"
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}
      </div>
    </form>
</div>
{error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

</>    
  );
}

export default CustomListDropDown;

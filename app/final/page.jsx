"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Final() {
  
    const { data: session } = useSession();    
    const router = useRouter();

  let[fullname, setFullname] = useState("");
   let[emailid, setEmail] = useState("");
   const[trackid,setTrackid] = useState("");
   const [error, setError] = useState([]);
   const [success, setSuccess] = useState(false);

   

   fullname = session?.user?.name;
   emailid = session?.user?.email;  
   
   
const getTopics = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/trackid/${emailid}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};
const { topics } =  getTopics();

const handleSubmit = async (e) => {
    e.preventDefault();

  
    const res = await fetch("api/trackid", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        emailid,
        trackid,
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname("");
      setEmail("");
      setTrackid("")
      router.push("/thankyou");
    }
  };

    return (

<div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Tracking info </h1>

        <form  onSubmit={handleSubmit}  className="flex flex-col gap-3">
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
          />
        
          <input
            type="email"
            value={emailid}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
         
         <input
            type="text"
                  onChange={(e) => setTrackid(e.target.value)}
                  value={trackid}
            placeholder="enter your post tracking id"
          />
           <button
               type="submit"
                  className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                >
                  Submit
                </button>
        </form>


 
      </div>
      
{error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
    </div>
  );
}

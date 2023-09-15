"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`https://tnp-auth.vercel.app/api/ewaste-list`, {
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

export default async function TopicsList() {
  const { data: session } = useSession();    

  const { topics } = await getTopics();

  return (
  
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {topics.map((t) => (
       <div
       key={t._id}
       className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
     >
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Number
                </th><th scope="col" className="px-6 py-3">
                    State
                </th><th scope="col" className="px-6 py-3">
                    City
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th> */}
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b  dark:border-gray-700">
               
                <td className="px-6 py-4">
                {t.fullname}
                </td>
                <td className="px-6 py-4">
                {t.email}
                </td>
                <td className="px-6 py-4">
                {t.number}
                </td><td className="px-6 py-4">
                {t.selectedState}
                </td><td className="px-6 py-4">
                {t.city}
                </td><td className="px-6 py-4">
                {t.Product}
                </td>
                <td className="px-6 py-4">
             
                <RemoveBtn id={t._id} />
          </td>
    
          <td className="px-6 py-4">
          <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </td>
          
          </tr>
          </tbody>
          </table>
          </div>
      ))}
    </div>
  );
}

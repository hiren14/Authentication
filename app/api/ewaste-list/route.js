import { connectMongoDB } from "@/lib/mongodb";
import EwasteInfo from "@/models/ewaste-info";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { fullname, email, number,selectedState,city,adder,Product } = await req.json();

  try {
    await connectMongoDB();
    await EwasteInfo.create({ fullname, email, number,selectedState,city,adder,Product });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}

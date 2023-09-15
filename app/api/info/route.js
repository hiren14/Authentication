import { connectMongoDB } from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
import ewasteinfos from "@/models/ewaste-info";


  
export async function GET() {
    await connectMongoDB();
  ewasteinfos.aggregate({
        $lookup: {
            from: 'trackids',
            localField: 'email',
            foreignField: 'emailid',
            as:'trackid'

        }
  });
  }
  
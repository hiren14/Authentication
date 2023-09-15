import { connectMongoDB } from "@/lib/mongodb";
import EwasteInfo from "@/models/ewaste-info";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const topic = await EwasteInfo.findOne({ email: id });
    return NextResponse.json({ topic }, { status: 200 });
  }
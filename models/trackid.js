import mongoose, { Schema, models } from "mongoose";

const TrackidSchema = new Schema(
  {
     
    fullname: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "Name must be larger than 2 characters"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  trackid: {
    type: String,
    required: [true, "Trackid is required."],
    minLength: [3, "trackid must be 3 characters"],
    
},
  }
);

const Trackid = models.Trackid || mongoose.model("Trackid", TrackidSchema);
export default Trackid;

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

  emailid: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
  
  number: {
    type: String,
    required: [true, "number is required."],
    minLength: [10, "Number must be 10 characters"],
    
},
  
selectedState: {
    type: String,
    required: [true, "State is required."],
    
},
  
city: {
    type: String,
    required: [true, "city is required."],
    
},
adder: {
  type: String,
  required: [true, "city is required."],
  
},
Product: {
    type: String,
    required: [true, "Product is required."],
    minLength: [3, "Product must be 10 characters"],
    
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

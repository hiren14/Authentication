import mongoose, { Schema } from "mongoose";

const EwasteInfoSchema = new Schema(
  
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
  required: [true, "address is required."],
  
},
Product: {
    type: [{
      label:String,
      value:String,

    }],
    required: [true, "Product is required."],
    
    
},
points:{
  type:String,
  default:0,
}

},
{
  timestamps: true,
}
);

const EwasteInfo =
  mongoose.models.EwasteInfo || mongoose.model("EwasteInfo", EwasteInfoSchema);

export default EwasteInfo;

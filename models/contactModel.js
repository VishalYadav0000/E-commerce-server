const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    phone: { 
      type: String, 
      required: true, 
      match: [/^\d{10,15}$/, "Please enter a valid phone number"] 
    },
    brand: { type: String, trim: true },
    email: { 
      type: String, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);

const Contact = require("../models/contactModel.js");
const sendEmail = require("../utils/sendEmail.js");

// Contact Us API
const contactUs = async (req, res) => {
  try {

    const { name, company , phone, brand, email, message } = req.body;

    if (!name || !email|| !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log(name, company, phone, brand, email, message)

    await Contact.create({name,company,phone, brand, email, message });

    // Send email confirmation
    const subject = "Thank You for Contacting Us!";
    const text = `Hello ${name},\n\nWe have received your message. Our team will get back to you soon.`;
    // \n\nMessage: ${message}
    await sendEmail(email, subject, text);

    res.status(200).json({ message: "Message received. We will contact you soon." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports =  contactUs;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");


router.post("/", async (req, res) => {
  const { name, email, phone, referralId } = req.body;

  try {
    const user = new User({ name, email, phone, referralId });
    await user.save();
    console.log("Saved succesfully");

    // // Nodemailer Setup
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: 'blahblahavin@gmail.com',
    //     pass: 'Avi@123456',
    //   },
    // });

    // const mailOptions = {
    //   from: 'blahblahavin@gmail.com',
    //   to: email,
    //   subject: "Registration Successful",
    //   text: `Thank you for registering! Your referral ID: ${referralId}`,
    // };

    // // Send Email & Handle Errors Properly
    // try {
    //   await transporter.sendMail(mailOptions);
    //   console.log("Email sent successfully");

    //   // ✅ Send success response if everything works
    //   return res.status(201).json({ message: "User registered and email sent successfully!" });
    // } catch (emailError) {
    //   console.error("Error sending email:", emailError);

    //   // ❌ Return a JSON response so frontend doesn't throw an error
    //   return res.status(500).json({ error: "User registered but failed to send email" });
    // }

  } catch (dbError) {
    console.error("Database error:", dbError);
    return res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;

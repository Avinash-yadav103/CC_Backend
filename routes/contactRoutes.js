const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const { name, email, phone, usedreferralId ,city ,companyname ,companylocation  } = req.body;
  const referralId = uuidv4().replace(/-/g, '').slice(0, 7); // Generate new referral ID of 10 letters only

  try {
    // Create new user
    const user = new User({ name, email, phone, referralId, city, companyname ,companylocation });
    await user.save();
    console.log("User registered successfully with Referral ID:", referralId);

    // Check if a valid referral ID was entered
    if (usedreferralId) {
      const referrer = await User.findOne({ referralId: usedreferralId });

      if (referrer) {
        referrer.referralCount += 1; // Increase referral count of referrer
        await referrer.save();
        console.log("Referral count updated for referrer:", referrer.email);
      } else {
        console.log("Invalid referral ID entered, no matching referrer found.");
      }
    }

    return res.status(201).json({ message: "User registered successfully!", referralId });

  } catch (dbError) {
    console.error("Database error:", dbError);
    return res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;

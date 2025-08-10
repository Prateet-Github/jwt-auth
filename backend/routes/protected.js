const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Import the auth middleware

// This route will only be accessible if the user is authenticated
router.get("/", protect, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user, // comes from auth middleware
  });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const { registerUser, authUser , ProfileData , ChangePassword} = require("../Controllers/userController");



router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/profile", jwtAuthMiddleware, ProfileData);
router.put("/profile/password", jwtAuthMiddleware, ChangePassword);




module.exports = router;
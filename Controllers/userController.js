const asyncHandler = require("express-async-handler");
const User = require("../models/user"); // Import User model only once
const { generateToken } = require("../jwt");

const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;

  const newUser = new User(data); // Create a new document of User with req.body data

  const response = await newUser.save();
  if (!response) {
    throw new Error("Server Error");
  }

  console.log("User data saved");

  const payload = {
    id: response._id,
  };

  console.log(JSON.stringify(payload));
  const token = generateToken(payload);
  console.log("Token is: ", token);

  // we could have also written res.status(200).json({response , token})
  res.status(200).json({ response : response , token : token}); // Send response and token in JSON format
});


const authUser = asyncHandler(async (req, res) => {
  
  const { aadharCardNumber, password } = req.body;

  const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

  if (!user && !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid AadharNumber of Password');
  }

  const payload = {
    id : user._id,

  }

  const token = generateToken(payload);

  res.json({ token });

})


const ProfileData = asyncHandler(async (req, res) => {
  
  const userData = req.user;
  const userId = userData._id;

  const user = await User.findOne(userId);
  if (!user) {
    throw new Error("Internal Server Error");
  }
  res.status(200).json({ user });
  
})

const ChangePassword = asyncHandler(async (req, res) => {
  
  const userId = req.user._id;
});


module.exports = { registerUser, authUser , ProfileData , ChangePassword };

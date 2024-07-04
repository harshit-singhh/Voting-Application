const asyncHandler = require("express-async-handler");
const User = require("../models/user"); // Import User model only once
const { generateToken } = require("../jwt");

const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const UserId = data.id;

  const user = await User.findById(UserId);
  if (user) {
    throw new Error("user already exsist in database");
  }

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

  // this is not working.. this is my doubt 
  //  response.token = token;
  
  // we could have also written res.status(200).json({response , token})
  res.status(200).json({ response : response , token : token }); // Send response and token in JSON format
});


// ======================================================================


const authUser = asyncHandler(async (req, res) => {
  
  const { aadharCardNumber, password } = req.body;

  const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

  if (!user && !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid AadharNumber of Password');
  }

  const payload = {
    id: user._id,

  }

  const token = generateToken(payload);

  res.json({ token });

});

// =======================================================================

const ProfileData = asyncHandler(async (req, res) => {
  
  const userData = req.user;
  const userId = userData.id;

  const user = await User.findOne(userId);

  // no need to check this here, because user to hoga hi
  // tabhi to authenticate hoke yha tak aaya he

  // if (!user) {
  //   throw new Error("Internal Server Error");
  // }

  res.status(200).json({ user });
  
});


// ============================================================================

const ChangePassword = asyncHandler(async (req, res) => {
  
  const userId = req.user.id;

  const { currentPassword, newPassword } = req.body;
  // ye function me tabhi aaega user.. jab wo authenticated hoga
  // and agar wo authenticated hoga then this means ki definetly
  // wo server me registered hoga.

  // therefore there is no need to check ki if that person is present 
  // in databse or not

  const user = await User.findById(userId);

  if (!(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid AadharNumber of Password");
  }

  user.password = newPassword;
  const response = await user.save();
  if (!response) {
    res.status(500);
    throw new Error("Internal Server Error");
  }

  console.log('password updated');
  res.status(200).json({ message: "Password Updated Successfully" });

});


// =============================================================================


module.exports = { registerUser, authUser , ProfileData , ChangePassword };

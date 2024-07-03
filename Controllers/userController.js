const asyncHandler = require('express-async-handler');
const User = require('../models/user');


const registerUser = asyncHandler(async (req, res) => {
    const data = req.body;

    const newUser = User(data);

    const response = await newUser.save();
    if (!response) {
        
        throw new Error('Server Error');
    }
    
    console.log('user data saved')

    const payload = {
        id: response._id
    }
})
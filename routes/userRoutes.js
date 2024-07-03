const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {generateToken , jwtAuthMiddleware} = require('../jwt')
const {registerUser} = require('../')
const User = require('../models/user');


router.post('/signup', registerUser);


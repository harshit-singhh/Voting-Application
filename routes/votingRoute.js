const express = require("express");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");

const { VoteCount, Voting } = require('../Controllers/votingController');


router.post("/:candidateID", jwtAuthMiddleware, Voting);
router.get("/count", VoteCount);


module.exports = router;
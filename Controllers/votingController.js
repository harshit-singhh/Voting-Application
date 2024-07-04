const asyncHandler = require("express-async-handler");
const User = require("../models/user"); // Import User model only once
const { generateToken } = require("../jwt");
const Candidate = require("../models/candidate");


const Voting = asyncHandler(async (req, res) => {
    //admin cannot vote here , and 1 user can vote only once
    const candidateid = req.params.candidateID;
   
    const userID = req.user.id;
    
    if (!userID) {
        throw new Error("userId is invalid");
    }

  const candidate = await Candidate.findById(candidateid);
  if (!candidate) {
    throw new Error("Candidate not found ");
  }

  const user = await User.findById(userID);
  // user ko check nhi krenge ki database me present he ya nhi because
  // wo present hoga hi.. tabhi jwtAuthMiddleware ki authentication se hoke yha tak (is function) tak pahucha he

  if (user.isVoted) {
    throw new Error("User has already voted, so cannot vote again");
  }

  if (user.role === "admin") {
    throw new Error("admin is not allowed to vote");
  }

  // update candidate document.

  candidate.votes.push({ user: userID });
  candidate.voteCount++;

  await candidate.save();

  // update the user document
  user.isVoted = true;
  await user.save();

  res.status(200).json({ message: "vote recorded sucessfully" });
});



// ====================================================================const VoteCount = asyncHandler(async (req, res) => {

const VoteCount = asyncHandler(async (req, res) => {
  const candidate = await Candidate.find().sort({ voteCount: "desc" });

  const voteRecord = candidate.map((data) => {
    return {
      party: data.party,
      count: data.voteCount,
    };
  });

  return res.status(200).json(voteRecord);
});








module.exports = { VoteCount, Voting };
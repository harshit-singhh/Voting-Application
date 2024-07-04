const express = require("express");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const { addCandidate, updateCandidate, deleteCandidate , CandidatesList } = require('../Controllers/candidateController');

// to add a candidate
router.post("/", addCandidate);
router.put("/:candidateID", updateCandidate)
router.delete("/:candidateID", deleteCandidate);

// wese to sabko permission honi chahiye list of candidates dekhne ke liye
// but as i have used authentication in server.js, only authenticated
// persons can see the candidatesList.
router.get("/candidatesList", CandidatesList);


module.exports = router;
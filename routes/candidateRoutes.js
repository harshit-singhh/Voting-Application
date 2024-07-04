const express = require("express");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const { addCandidate, updateCandidate, deleteCandidate } = require('../Controllers/candidateController');

// to add a candidate
router.post("/", addCandidate);
router.put("/:candidateID", updateCandidate)
router.delete("/:candidateID", deleteCandidate);





module.exports = router;
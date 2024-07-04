const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidate"); 
const { generateToken } = require("../jwt");
const User = require('../models/user');


const checkAdminRole = async (userId) => {
    try {

        const user = await User.findById(userId);
        return user.role === 'admin';
    }
    catch (err) {
        return false;
    }
}

// ==================================================================

const addCandidate = asyncHandler(async (req, res) => {
    
    if (!(await checkAdminRole(req.user.id))) {
        return res.status(403).json({ message: "User does not have admin role"});
    }

    const data = req.body;

    const newCandidate = new Candidate(data);

    const response = await newCandidate.save();
    if (!response) {
        throw new Error("Internal Server Error");
    }
    console.log('Candidate data saved');
    res.status(200).json({ response: response });
})

// =======================================================================


const updateCandidate = asyncHandler(async (req, res) => {
     if (!(await checkAdminRole(req.user.id))) {
       return res
         .status(403)
         .json({ message: "User does not have admin role" });
     }

    const CandidateId = req.params.candidateID;
    const updatedCandidateData = req.body;

    const response = await personalbar.findByIdAndUpdate(CandidateId, updatedCandidateData, {
        new: true, // return the updated document
        runValidators: true, // Run Mongoose validation
    });

    if (!response) {
        res.status(404);
        throw new Error(" Candidate Not Found");
    }

    console.log('candidate data updated');
    res.status(200).json({ response });
})


// ========================================================================

const deleteCandidate = asyncHandler(async (req, res) => {
     if (!(await checkAdminRole(req.user.id))) {
       return res
         .status(403)
         .json({ message: "User does not have admin role" });
     }

     const CandidateId = req.params.candidateID;


    const response = await personalbar.findByIdAndDelete(CandidateId);
     

     if (!response) {
       res.status(404);
       throw new Error(" Candidate Not Found");
     }

     console.log("candidate deleted successfully");
     res.status(200).json({ response });


})











    module.exports = { addCandidate, updateCandidate , deleteCandidate };
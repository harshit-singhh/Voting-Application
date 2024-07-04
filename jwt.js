const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req , res , next) => {
    
    const tokenPresent = req.headers.authorization;
    if (!tokenPresent) {
        res.status(404);
        throw new Error("token is not present for authentication");
    }
    const token = tokenPresent.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token Not found' });
    }

    try {
        
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decodedPayload;
        // res.json({message : "authentication completed and payload sent"})
        next();
    }
    catch (error) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
    }

}


const generateToken = (userData) => {
    
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = { generateToken, jwtAuthMiddleware };
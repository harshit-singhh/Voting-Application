const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req , res , next) => {
    
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token Not found' });
    }

    try {
        
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedPayload;
        next();
    }
    catch (error) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
    }

}


const generateToken = (userData) => {
    
    return jwt.sign(useData, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = { generateToken, jwtAuthMiddleware };
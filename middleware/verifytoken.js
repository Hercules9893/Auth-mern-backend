const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || "12345678910";  // Use an environment variable for security

const authenticationToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).send({ status: "failed", errors: "Unauthorized: missing or invalid token" });
    }

    const token = authorizationHeader.slice(7).replace(/"/g, "");

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "failed", errors: "Unauthorized: invalid token", token });
        }

        req.user = decoded;  // Attach decoded user info to the request object
        next();  // Proceed to the next middleware/route handler
    });
};

module.exports = authenticationToken;

const jwt = require('jsonwebtoken');

const validateToken = async (request, response, next) => {
    let token;
    let authHeader = request.header.Authorization || request.header.authorization;
    if (authHeader && authHeader.starsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                response.status(401);
                throw new Error('User is not authorized');
            }
            console.log(decoded);
            request.user = decoded.user;
            next();
        });
        if (!token) {
            response.status(401);
            throw new Error('Validation Error');
        }
    }
};

module.exports = validateToken;
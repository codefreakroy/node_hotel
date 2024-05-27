const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ error: 'token not found' })
    }

    // check authorization header is valid or not

    // extract the jwt token from the request header
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    // verify the token
    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // attach the decoded payload to the request object
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: 'invalid token' })
    }
}

// generate a jwt token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30 })
}

module.exports = { jwtAuthMiddleware, generateToken }
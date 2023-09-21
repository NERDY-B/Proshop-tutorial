import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token


    console.log(req.headers, 'request .headers')
    console.log(req.headers.authorization, 'request .headers.authorization')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log(`got here`)
        try {
            token = req.headers.authorization.split(' ')[1]

            console.log(token, 'token')
            console.log(process.env.JWT_SECRET, 'process.env')

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')



            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

export { protect }
import express from 'express';
import {prisma} from '../prismaClient.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {

    console.log('user trying to register')
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: 'username and password required' })
    }


    try {
        const hashedPassword = await bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })
        console.log("registered")
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    } catch (err)
    {
        console.log(err.message)
        res.status(500).json({ msg: 'server error' })

    }

})

router.post('/login', async (req, res) => {
    console.log('user trying to login')

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ msg: 'username and password required' })
    }

        try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // if we cannot find a user associated with that username, return out from the function
        if (!user) { return res.status(404).send({ msg: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ msg: "Invalid password" }) }
        console.log(user)

        // then we have a successful authentication
        console.log("logged in")
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.get('/me', authMiddleware, async (req, res) => {
    try {
            const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })

        res.status(200).json({id: req.userId,username: user.username})


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
})


export default router
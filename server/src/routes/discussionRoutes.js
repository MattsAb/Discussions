import express from 'express';
import {prisma} from '../prismaClient.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const discussions = await prisma.discussion.findMany({
            include: {
                _count: {
                select: { comments: true }
                }
            }
            });

        res.status(200).json(discussions)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
})

router.get('/discussion/:id', async (req,res) => {

        try {
        console.log("the user wants to get discussion info");
        const { id } = req.params

    const disc = await prisma.discussion.findUnique({
      where: { id: Number(id) },
        include: {
            comments: {
            include: {
                author: true, // include username and id
            },
            }
        },
        });
        console.log(disc)
        res.status(200).json(disc)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }

})

router.get('/mydiscussions',authMiddleware, async (req, res) => {

    try {
        const discussions = await prisma.discussion.findMany({
            where: {
              authorId: req.userId 
            },
            include: {
                _count: {
                select: { comments: true }
                }
            }
        });

        res.status(200).json(discussions)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
})

router.get(`/getedit/:id`,authMiddleware, async (req, res) => {

    try {
        console.log("the user wants to get an edit");
        const { id } = req.params

        const Disc = await prisma.discussion.findMany({
            where: {
                id: parseInt(id),
                authorId: req.userId
            }
        })
        console.log(Disc)
        res.status(200).json(Disc)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
})

router.post('/create',authMiddleware, async (req, res) => {
    const discInfo = req.body;



    if (!discInfo.title || !discInfo.description || !discInfo.body) {
        return res.status(401)
        .json({success: false, msg: 'please provide all requested information'})
    }



    const discussion = await prisma.discussion.create({
        data: {
                title: discInfo.title,
                description: discInfo.description,
                body: discInfo.body,
                authorId: req.userId
            }
        })

    res.json(discussion).status(200)
})

router.put('/edit/:id', async (req, res) => {
    try {
        console.log("the user wants to edit a discussion");
        const { id } = req.params
        const {title, description, body} = req.body

        const Disc = await prisma.discussion.update({
            where: {
                id: parseInt(id),
                authorId: req.userId
            },
            data: {
                title: title,
                description: description,
                body: body
            }
        })
        res.status(200).json({ message: "updated" });

    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
})

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        console.log("the user wants to delete a discussion");
        const { id } = req.params

        await prisma.comment.deleteMany({
        where: { discussionId: parseInt(id) }
        });

        await prisma.discussion.delete({
        where: { id: parseInt(id), authorId: req.userId }
        });

        res.send({ message: "discussion deleted" }).status(200);

    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
}) 

export default router
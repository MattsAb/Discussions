import {prisma} from '../prismaClient.js';

export async function addComment (req, res) {
    const discussionId = Number(req.params.id);
    const {comment} = req.body;

    if (!comment) {
        return res.status(401)
        .json({success: false, msg: 'please write a comment'})
    }

    try {
        const addedComment = await prisma.comment.create({
            data: {
                    text: comment,
                    discussionId: discussionId,
                    authorId: req.userId,
                },
                
            })
            console.log(addedComment)

        res.status(200).json(addedComment);
    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }

}

export async function deleteComment (req, res) {
    try {
        const { id } = req.params


        await prisma.comment.delete({
        where: { id: parseInt(id), authorId: req.userId }
        });

        res.send({ message: "comment deleted" }).status(200);

    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
}
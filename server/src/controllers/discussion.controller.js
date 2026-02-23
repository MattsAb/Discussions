import {prisma} from '../prismaClient.js';

export async function getDiscussions (req, res) {
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
}

export async function getDiscussionInfo (req,res) {

        try {
        const { id } = req.params

    const disc = await prisma.discussion.findUnique({
      where: { id: Number(id) },
        include: {
            comments: {
            include: {
                author: true,
            },
            }
        },
        });
        res.status(200).json(disc)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }

}

export async function getMyDiscussions (req, res) {

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
}

export async function getEditInfo (req, res) {

    try {
        const { id } = req.params

        const Disc = await prisma.discussion.findMany({
            where: {
                id: parseInt(id),
                authorId: req.userId
            }
        })
        res.status(200).json(Disc)


    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
}

export async function createDiscussion (req, res) {
    const discInfo = req.body;

    if (!discInfo.title || !discInfo.description || !discInfo.body) {
        return res.status(401)
        .json({success: false, msg: 'please provide all requested information'})
    }

    try {
        const discussion = await prisma.discussion.create({
            data: {
                    title: discInfo.title,
                    description: discInfo.description,
                    body: discInfo.body,
                    authorId: req.userId
                }
            })

        res.json(discussion).status(200)
    } catch (err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'internal server error'})
    }
}

export async function editDiscussion (req, res) {
    try {
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
}

export async function deleteDiscussion (req, res) {
    try {
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
}

export async function getSearchDiscussions (req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Search query required" });
  }

    try {
    const discussions = await prisma.discussion.findMany({
        where: {
        OR: [
            {
            title: {
                contains: query,
                mode: "insensitive",
            },
            },
        ],
        },
        include: {
        _count: {
            select: { comments: true },
        },
        },
        take: 10,
        orderBy: {
        createdAt: "desc",
        },
    });

    res.json(discussions);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
}
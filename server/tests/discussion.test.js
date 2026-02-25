import { describe, test, expect, vi } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'

import { prisma } from '../src/prismaClient.js'

process.env.JWT_SECRET = 'testsecret'

vi.mock('../src/prismaClient.js', () => {
  return {
    prisma: {
      discussion: {
        findMany: vi.fn()
      }
    }
  }
})

vi.mock('../src/middleware/auth.js', () => ({
  default: (req, res, next) => {
    req.userId = { id: 1 }
    next()
  }
}))

const request = supertest(app)

describe('/', () => {
    const testUser = {
        id: 1,
    }

    const testDisc = [{       
        id: 1,
        title: "test_title",
        description: "test_description",
        body: "test_body", 
        authorId: 5
    },
    {       
        id: 2,
        title: "test_title2",
        description: "test_description2",
        body: "test_body2", 
        authorId: 1
    },
]

  test('should get all discussions', async () => {
    prisma.discussion.findMany.mockResolvedValue(testDisc)
    

    const res = await request.get('/api')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(testDisc)
  })


})
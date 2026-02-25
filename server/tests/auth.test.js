import { describe, test, expect, beforeEach, vi } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../src/prismaClient.js'

process.env.JWT_SECRET = 'testsecret'

vi.mock('../src/prismaClient.js', () => {
  return {
    prisma: {
      user: {
        create: vi.fn(),
        findUnique: vi.fn()
      }
    }
  }
})


const request = supertest(app)

describe('/auth', () => {
  const testUser = { username: 'testuser', password: 'password123' }
  let hashedPassword

  beforeEach(async () => {
    vi.clearAllMocks()
    hashedPassword = await bcrypt.hash(testUser.password, 8)
  })

  test('should register a new user', async () => {
    prisma.user.create.mockResolvedValue({
      id: 1,
      username: testUser.username,
      password: hashedPassword
    })

    const res = await request.post('/api/auth/register').send(testUser)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: testUser.username,
        password: expect.any(String)
      }
    })
  })

  test('should fail to register a new user given the wrong credentials', async () => {
    prisma.user.create.mockResolvedValue({
      id: 1,
      username: '',
      password: ''
    })

    const res = await request.post('/api/auth/register').send(testUser)

    expect(res.statusCode).toBe(400)
  })

  test('should log in an existing user', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: testUser.username,
      password: hashedPassword
    })

    const res = await request.post('/api/auth/login').send(testUser)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET) 
    expect(decoded).toHaveProperty('id', 1)

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: testUser.username }
    })
  })
})
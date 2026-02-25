import { describe, test, expect, vi } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'
import authMiddleware from '../src/middleware/auth.js'
import jwt from "jsonwebtoken"

process.env.JWT_SECRET = 'testsecret'

const request = supertest(app)

function mockResponse() {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('authMiddleware', () => {


  test('should return a 401 status code if the user does not provide a jwt token', async () => {  

    const req = { headers: {} }
    const res = mockResponse()
    const next = vi.fn()

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: "Please Log in first" })
    expect(next).not.toHaveBeenCalled()
})

test('should call next() given a valid jwt token', () => {
    const token = jwt.sign({ id: 5 }, process.env.JWT_SECRET)

    const req = {
        headers: { authorization: `Bearer ${token}` }
    }
    const res = mockResponse()
    const next = vi.fn()

    authMiddleware(req, res, next)

    expect(req.userId).toBe(5)
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
})

})
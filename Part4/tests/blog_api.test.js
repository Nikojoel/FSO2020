const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe("HTTP GET", () => {

    test("Get all as JSON", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test("Verify UID", async () => {
        const response = await api.get("/api/blogs")
        response.body.map(blog => expect(blog.id).toBeDefined())
    })
})

describe("HTTP POST", () => {

    test("Verify new blog creation", async () => {
        await api
            .post("/api/blogs")
            .send(helper.newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const result = await helper.getAll()
        expect(result.length).toBe(helper.initialBlogs.length + 1)
    })

    test("Verify likes field setting", async () => {
        const result = await api
            .post("/api/blogs")
            .send(helper.newNoLike)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body.likes).toBe(0)
    })

    test("Verify bad request", async () => {
        await api
            .post("/api/blogs")
            .send(helper.newNoTitle)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
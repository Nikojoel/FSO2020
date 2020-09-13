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
/*

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'title123'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "valid title",
        author: "Valid Valid",
        url: "www.valid.com",
        likes: 50,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'valid title'
    )
})
 */
afterAll(() => {
    mongoose.connection.close()
})
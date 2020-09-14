const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
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
            .set("Authorization", `bearer ${await helper.getBearerToken(helper.initialUsers[0].username)}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const result = await helper.getAll()
        expect(result.length).toBe(helper.initialBlogs.length + 1)
    })

    test("Verify likes field setting", async () => {
        const result = await api
            .post("/api/blogs")
            .send(helper.newNoLike)
            .set("Authorization", `bearer ${await helper.getBearerToken(helper.initialUsers[0].username)}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body.likes).toBe(0)
    })

    test("Verify bad request with no title", async () => {
        const result = await api
            .post("/api/blogs")
            .send(helper.newNoTitle)
            .set("Authorization", `bearer ${await helper.getBearerToken(helper.initialUsers[0].username)}`)
            .expect(400)
        expect(result.length).toBe(undefined)
    })

    test("Verify bad request with no url", async () => {
        const result = await api
            .post("/api/blogs")
            .send(helper.newNoUrl)
            .set("Authorization", `bearer ${await helper.getBearerToken(helper.initialUsers[0].username)}`)
            .expect(400)
        expect(result.length).toBe(undefined)
    })


    test("Verify unauthorized request", async () => {
        await api
            .post("/api/blogs")
            .send(helper.newBlog)
            .expect(401)
    })
})

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('Creation succeeds with a unique username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'kuukko',
            name: 'Kuu Ukko',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Super User',
            password: 'secret',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creation fails with proper statuscode and message if username is invalid (less than 3 chars)', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: '1',
            name: '2',
            password: 'secret',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual("Username and password must be atleast 3 characters long")
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creation fails with proper statuscode and message if password is invalid (less than 3 chars)', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'ValidUser',
            name: 'Valid User',
            password: '1',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toEqual("Username and password must be atleast 3 characters long")
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
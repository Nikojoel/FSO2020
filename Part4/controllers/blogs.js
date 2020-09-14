const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
    const body = req.body
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    if (!blog.likes) {
        blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)

    await user.save()
    res.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const blog = await Blog.findByIdAndRemove(req.params.id)

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return res.status(401).json({ error: 'Unauthorized action' })
    } else {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }
})

blogRouter.put('/:id', async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const body = req.body
    const updatedBlog = {
        likes: body.likes
    }
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
        return res.status(401).json({ error: 'Unauthorized action' })
    } else {
        const put = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
        if (put) {
            res.json(put.toJSON())
        } else {
            res.status(404).end()
        }
    }
})

blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404).end()
    }
})

module.exports = blogRouter
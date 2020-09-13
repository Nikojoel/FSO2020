const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    if (!blog.likes) {
        blog.likes = 0
    }
    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
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
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const initialBlogs = [
    {
        title: "FirstTitle",
        author: "@FirstAuthor",
        url: "www.first.com",
        likes: 11,
    },
    {
        title: "SecondTitle",
        author: "@SecondAuthor",
        url: "www.second.com",
        likes: 24,
    }
]

const newBlog = {
    title: "NewTitle",
    author: "@NewAuthor",
    url: "www.new.com",
    likes: 113,
}

const newNoLike = {
    title: "NewTitleNoLikes",
    author: "@NewAuthorNoLikes",
    url: "www.newNoLikes.com",
}

const newNoTitle = {
    author: "@NewAuthor",
    likes: 113,
}

const getAll = async () => {
    return await Blog.find({})
}

module.exports = {
    initialBlogs,
    newBlog,
    getAll,
    newNoLike,
    newNoTitle,

}
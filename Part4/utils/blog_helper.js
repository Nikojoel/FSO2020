const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

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
const initialUsers = [
    {
        username: "Tester1",
        name: "Tester Number1",
        passwordHash: "secret"
    },
    {
        username: "Tester2",
        name: "Tester Number2",
        passwordHash: "secret"
    },
    {
        username: 'root',
        name: 'Super User',
        passwordHash: 'secret',
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
const newNoUrl = {
    title: "NewTitleNoUrl",
    author: "@NewAuthor",
    likes: 113,
}

const getAll = async () => {
    return await Blog.find({})
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const getSingleUser = async (username) => {
    return await User.findOne({username: username})
}

const getBearerToken = async (username) => {
    const user = await getSingleUser(username)
    return jwt.sign ({username: user.username, id: user.id}, config.SECRET)
}

module.exports = {
    initialBlogs,
    newBlog,
    getAll,
    newNoLike,
    newNoTitle,
    newNoUrl,
    usersInDb,
    getBearerToken,
    initialUsers

}
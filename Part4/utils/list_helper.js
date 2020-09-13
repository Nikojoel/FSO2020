const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    return blogs.reduce((total, blog) => (total += blog.likes), 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const mostFavourites = blogs.reduce((highest, blog) => highest.likes > blog.likes ? highest : blog, 0)
    return {
        title: mostFavourites.title,
        author: mostFavourites.author,
        likes: mostFavourites.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const countBlogsByAuthor = blogs.reduce((highest, blog) => ({
        ...highest, [blog.author]: (highest[blog.author] || 0) + 1
    }), {})

    const blogsByAuthor = Object.values(countBlogsByAuthor).sort((a, b) => b - a)
    const author = Object.keys(countBlogsByAuthor).reduce((highest, cur) => countBlogsByAuthor[highest] > countBlogsByAuthor[cur] ? highest : cur)

    return {
        author: author,
        blogs: blogsByAuthor[0]
    }

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const countLikesByAuthor = blogs.reduce((highest, blog) => ({
        ...highest, [blog.author]: (highest[blog.author] || 0) + blog.likes
    }), {})

    const likesByAuthor = Object.values(countLikesByAuthor).sort((a, b) => b - a)
    const author = Object.keys(countLikesByAuthor).reduce((highest, cur) => countLikesByAuthor[highest] > countLikesByAuthor[cur] ? highest : cur)

    return {
        author: author,
        likes: likesByAuthor[0]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
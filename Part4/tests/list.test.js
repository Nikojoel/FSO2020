const listHelper = require('../utils/list_helper')
const blogs =
    [
        { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
        { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
        { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
        { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
        { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 },
        { _id: "5a422a851b54a676234d17", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
        { _id: "5a422a851b54a676234d17", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
        { _id: "5a422a851b54a676234d17", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
        { _id: "5a422a851b54a676234d17", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    ]
const emptyBlog = []

test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list is empty', () => {
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })

    test('bigger list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(57)
    })
})

describe('favourites and authors', () => {
    test('most favourited with big list', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })

    test('most favourited with empty list', () => {
        const result = listHelper.favouriteBlog(emptyBlog)
        expect(result).toBe(0)
    })

    test('most favourited with two equally liked blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })

    test('author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Michael Chan",
            blogs: 4
        })
    })

    test('author with most blogs with empty array', () => {
        const result = listHelper.mostBlogs(emptyBlog)
        expect(result).toBe(0)
    })

    test('author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Michael Chan",
            likes: 28
        })
    })
    test('author with most likes with empty array', () => {
        const result = listHelper.mostLikes(emptyBlog)
        expect(result).toBe(0)
    })
})


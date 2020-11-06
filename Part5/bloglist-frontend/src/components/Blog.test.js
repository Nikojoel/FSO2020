import Blog from "./Blog"
import React from 'react'
import {render,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

//CI=true npm test

const singleBlog = {
    author: "TestAuthor",
    title: "TestTitle",
    url: "www.test.com",
    likes: 123,
    user: {
        name: "test"
    }
}

const user = {
    name: "test",
    username: "tester",
}

test("Blog list tests, step1", () => {
    const blog = render(<Blog blog={singleBlog} user={user}/>)

    expect(blog.container).toHaveTextContent(singleBlog.title)
    expect(blog.container).toHaveTextContent(singleBlog.author)

    expect(blog.container).not.toHaveTextContent(singleBlog.url)
    expect(blog.container).not.toHaveTextContent(singleBlog.likes)
})

test("5.14: Blog list tests, step2", () => {
    const blog = render(<Blog blog={singleBlog} user={user}/>)

    fireEvent.click(blog.getByText("view"))

    expect(blog.container).toHaveTextContent(singleBlog.url)
    expect(blog.container).toHaveTextContent(singleBlog.likes)
})

test("5.15: Blog list tests, step3", () => {
    const likeBlog = jest.fn()
    const blog = render(<Blog blog={singleBlog} user={user} likeBlog={likeBlog}/>)

    fireEvent.click(blog.getByText("view"))

    fireEvent.click(blog.getByText("like"))
    fireEvent.click(blog.getByText("like"))

    expect(likeBlog.mock.calls.length).toBe(2)
})

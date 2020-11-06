import React, {useState} from 'react'

const Blog = ({blog, likeBlog, deleteBlog, user}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [isVisible, setVisible] = useState(false)
    const all = (
        <div>
            <p>{blog.url} {blog.likes}</p>
            <button onClick={() => likeBlog(blog)}>like</button>
            {blog.user.name === user.name &&
            <button onClick={() => deleteBlog(blog)}>delete</button>
            }
        </div>)

    return (
        <div style={blogStyle}>
            <p>{blog.author} {blog.title}</p>
            {
                isVisible ?
                    all
                    :
                    null
            }
            <button onClick={() => setVisible(!isVisible)}>{isVisible ? 'hide' : 'view'}</button>
        </div>
    )
}

export default Blog

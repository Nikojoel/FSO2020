import React from "react"

const BlogForm = (props) => {
    return (
        <div>
            <h2>Add blog</h2>
            <form onSubmit={props.addBlog}>
                <div>
                    title
                    <input
                        value={props.newTitle}
                        onChange={props.handleTitleChange}
                    />
                </div>
                <div>
                    url
                    <input
                        value={props.newUrl}
                        onChange={props.handleUrlChange}
                    />
                    <div>
                        author
                        <input
                            value={props.newAuthor}
                            onChange={props.handleAuthorChange}
                        />
                    </div>
                </div>
            <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm

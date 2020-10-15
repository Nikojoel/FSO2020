import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [styleClass, setClass] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        getAllBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const getAllBlogs = async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setNotification(`Logged in as ${user.name}`, "success")
        } catch (exception) {
            setNotification("Wrong username or password", "error")
        }
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        try {
            await blogService.create(newBlog)
            setNewAuthor('')
            setNewTitle('')
            setNewUrl('')
            setNotification(`Added a new blog ${newBlog.title} by ${newBlog.author}`, "success")
            await getAllBlogs()
        } catch (exception) {
            setNotification("Error in blog adding", "error")
        }
    }

    const likeBlog = async (blog) => {
        try {
            const newBlog = {
                title: blog.title,
                url: blog.url,
                author: blog.author,
                likes: blog.likes + 1,
            }
            await blogService.update(blog.id, newBlog)
            setNotification(`Liked a post`, "success")
            await getAllBlogs()
        } catch (exception) {
            setNotification("Error in liking", "error")
        }
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.remove(blog.id)
                setNotification(`Removed blog`, "success")
                await getAllBlogs()
            } catch (exception) {
                setNotification("Error in deleting", "error")
            }
        }
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const logOut = () => {
        window.localStorage.clear()
        setUser(null)
        setNotification("Logged out", "success")
    }

    const setNotification = (text, notification) => {
        setErrorMessage(text)
        if (notification === "error") {
            setClass("error")
        } else if (notification === "success") {
            setClass("success")
        }
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const loginForm = () => {
        return (
            <Togglable buttonLabel="login">
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        )
    }

    const blogForm = () => {
        return (
            <Togglable buttonLabel="create new blog">
                <BlogForm
                    newTitle={newTitle}
                    newUrl={newUrl}
                    newAuthor={newAuthor}
                    addBlog={addBlog}
                    handleTitleChange={handleTitleChange}
                    handleUrlChange={handleUrlChange}
                    handleAuthorChange={handleAuthorChange}
                />
            </Togglable>
        )
    }


    return (
        <div>
            <Notification message={errorMessage} className={styleClass}/>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged-in</p>
                    <button onClick={logOut}>logout</button>
                    {blogForm()}
                    <h2>Blogs</h2>
                    {blogs
                        .sort((a,b) => a.likes < b.likes ? 1 : -1)
                        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}/>)
                    }
                </div>
            }
        </div>
    )
}

export default App

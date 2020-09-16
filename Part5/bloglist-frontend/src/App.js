import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'

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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <h2>Add blog</h2>
            <div>
                <input
                    placeholder="Title"
                    value={newTitle}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <input
                    placeholder="Url"
                    value={newUrl}
                    onChange={handleUrlChange}
                />
                <div>
                    <input
                        placeholder="Author"
                        value={newAuthor}
                        onChange={handleAuthorChange}
                    />
                </div>
            </div>
            <button type="submit">save</button>
        </form>
    )


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
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App
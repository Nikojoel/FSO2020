import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}
const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  remove
}

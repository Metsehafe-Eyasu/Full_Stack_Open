import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const voteAnecdote = async (id) => {
  console.log('id', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const updatedResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return updatedResponse.data
}

export default { getAll, createNew, voteAnecdote }
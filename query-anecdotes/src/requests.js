import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (content) => axios.post(baseUrl, {content, votes: 0}).then(res => res.data)

export const voteAnecdote = (anecdote) => axios
  .put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes +1})
  .then(res => res.data)
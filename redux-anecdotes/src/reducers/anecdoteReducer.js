import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdoteReducer(state, action) {
      return state.map(obj => obj.id !== action.payload ? obj : { ...obj, votes: obj.votes +1 })
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdotes, setAnecdotes, voteAnecdoteReducer } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch(voteAnecdoteReducer(anecdote.id))
  }
}

export default anecdoteSlice.reducer
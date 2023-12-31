import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleClick = (event) => {
    event.preventDefault()
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted for ${anecdote.content}`, 10))
  }

  return(
    <div>
      {anecdote.content} <br/>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </div>
  )
}

export default AnecdoteList
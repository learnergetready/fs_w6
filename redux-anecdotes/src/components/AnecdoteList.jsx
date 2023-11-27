import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const vote = (id) => dispatch({ type: 'VOTE', payload: id })

  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => {
        return(
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      } )}
    </div>
  )
}

export default AnecdoteList
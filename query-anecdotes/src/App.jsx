import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const App = () => {
  const [currentMessage, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const handleVote = (anecdote) => {
    const newMessage = `you voted for ${anecdote.content}`
    dispatchNotification({payload: newMessage})
    setTimeout(() => {
      dispatchNotification({payload: null})
    }, 5000)
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isPending) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

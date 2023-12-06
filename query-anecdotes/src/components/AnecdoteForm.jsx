import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [message, dispatchNotification] = useContext(NotificationContext)
  
  const onError = (err) => {
    switch(err.name) {
      case 'AxiosError':
        return dispatchNotification({payload: err.response.data.error})
      default:
        dispatchNotification({payload: 'Unrecognized error occurred when trying to add anecdote'})
    }
    setTimeout(() => {
      dispatchNotification({payload: null})
    }, 5000)
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn:createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: onError
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatchNotification({payload: content})
    setTimeout(() => {
      dispatchNotification({payload: null})
    }, 5000)
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, setNotification] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setNotification({
        type: 'SET',
        notification: `a new anecdote '${newAnecdote.content}' created`
      })
      setTimeout(() => setNotification({type: 'CLEAR'}), 5000)
    },
    onError: (error) => {
      setNotification({
        type: 'SET',
        notification: error.response.data.error
      })
      setTimeout(() => setNotification({type: 'CLEAR'}), 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    newAnecdoteMutation.mutate({content, votes: 0})
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
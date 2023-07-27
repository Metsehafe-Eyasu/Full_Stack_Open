import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [, setNotification] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => updatedAnecdote.id === anecdote.id ? updatedAnecdote : anecdote))
      setNotification({
        type: 'SET',
        notification: `anecdote '${updatedAnecdote.content}' voted`
      })
      setTimeout(() => setNotification({type: 'CLEAR'}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    setNotification({
      type: 'SET',
      notification: `you voted '${anecdote.content}'`
    })
    setTimeout(() => setNotification({type: 'CLEAR'}), 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  })
  if (result.isLoading) return 'Loading...'
  else if (result.isError) return 'anecdote service not available due to problems with server'
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
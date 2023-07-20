import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <ul>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList
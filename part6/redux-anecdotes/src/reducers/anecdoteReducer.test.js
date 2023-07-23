import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW_ANECDOTE', () => {
    const state = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: 2,
        votes: 0
      }
    ]
    // const action = {
    //   type: 'NEW_ANECDOTE',
    //   data: {
    //     content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    //     id: 3,
    //     votes: 0
    //   }
    // }
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: {
        content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
      }
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: 2,
        votes: 0
      },
      {
        content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        id: 3,
        votes: 0
      }
    ]
    // const action = {
    //   type: 'VOTE',
    //   data: {
    //     id: 2
    //   }
    // }
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: 2
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual(state[2])
    expect(newState).toContainEqual({
      content: 'Adding manpower to a late software project makes it later!',
      id: 2,
      votes: 1
    })
  })
})
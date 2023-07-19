import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AnecdoteList from './AnecdoteList'
import { render, screen } from '@testing-library/react'
import reducer from '../reducers/anecdoteReducer'

describe('<AnecdoteList />', () => {
  test('renders content', () => {
    const anecdotes = [
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

    const store = createStore(reducer)

    render (
      <Provider store={store}>
        <AnecdoteList anecdotes={anecdotes} />
      </Provider>
    )

    expect(screen.getByText('If it hurts, do it more often')).toBeDefined()
    expect(
      screen.getByText('Adding manpower to a late software project makes it later!')
    ).toBeDefined()
  })
  test('list is ordered based on votes' )
})
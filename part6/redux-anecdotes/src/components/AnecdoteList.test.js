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
  test('list is ordered based on votes', () => {
    const anecdotes = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 2,
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: 2,
        votes: 3,
      },
    ]

    const store = createStore(reducer, anecdotes)

    render(
      <Provider store={store}>
        <AnecdoteList />
      </Provider>
    )

    const anecdoteList = screen.getAllByRole('listitem')
    expect(anecdoteList[0].textContent).toContain('Adding manpower to a late software project makes it later!')
    expect(anecdoteList[1].textContent).toContain('If it hurts, do it more often')
  })
})
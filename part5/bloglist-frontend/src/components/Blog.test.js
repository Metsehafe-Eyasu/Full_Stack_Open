import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => { 
  let container
  let mockHandler
  const blog = {
    user: {
      id: 'test id',
      name: 'test name',
      username: 'test username'
    },
    author: 'test author',
    title: 'test title',
    url: 'www.testurl.com',
    likes: 5
  }
  const dummyFn = () => {}

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={dummyFn} />
    ).container
  })

  test('Initial Blog render', () => {
    const author = screen.queryByText('test author', {exact: false})
    const title = screen.queryByText('test title', {exact: false})
    const details = container.querySelector('.details')
    expect(author).toBeDefined()
    expect(title).toBeDefined()
    expect(details).toHaveStyle('display: none')
  })
  
  test('Expanded Blog render', async () => {
    const button = await screen.findByText('view')
    const user = userEvent.setup()
    await user.click(button)
    const details = container.querySelector('.details')
    expect(details).not.toHaveStyle('display: none')
  })

  test('Like button click', async () => {
    const user = userEvent.setup()
    const button = await screen.findByText('view')
    await user.click(button)
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


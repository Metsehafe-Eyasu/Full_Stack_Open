import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleAuthorChange = (e) => setAuthor(e.target.value)
  const handleUrlChange = (e) => setUrl(e.target.value)

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          id='title'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          id='author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input 
          type="text" 
          value={url} 
          name="Url" 
          id='url'
          onChange={handleUrlChange} />
      </div>
      <button type="submit" id='create-button'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

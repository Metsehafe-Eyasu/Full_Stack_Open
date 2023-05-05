const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0 ? blogs.reduce((sum, blog) => sum + blog.likes, 0) : 0
}

const favoriteBlog = (blogs) => {
  return blogs.length > 0 ? blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog) : {}
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
  })
  const author = Object.keys(authors).reduce((max, author) => authors[max] > authors[author] ? max : author, '')
  return blogs.length > 0 ? { author, blogs: authors[author] } : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
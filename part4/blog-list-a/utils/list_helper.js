const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => {
    return acc + val.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const sortBlogs = blogs

  sortBlogs.sort((a,b) => {
    if(a.likes < b.likes) {
      return 1
    } else if (a.likes > b.likes) {
      return -1
    }
    return 0
  })

  const result = sortBlogs[0]

  delete result._id
  delete result.url
  delete result.__v

  return result
}

const mostBlogs = (blogs) => {
  let sortBlogs = _.countBy(blogs, 'author')
  sortBlogs = _.toPairs(sortBlogs)
  sortBlogs = _.orderBy(sortBlogs, [1], ['desc'])

  const [author, blogCount] = sortBlogs[0]

  return {
    author,
    blogs: blogCount
  }
}

const mostLikes = (blogs) => {
  let sortBlogs = _.groupBy(blogs, 'author')
  sortBlogs = _.toPairs(sortBlogs)
  sortBlogs = _.orderBy(sortBlogs, (author) => {
    return author[1].reduce((acc,value) => {
      return acc + value.likes
    }, 0)
  }, ['desc'])

  const author =  sortBlogs[0][0]
  const likes = sortBlogs[0][1].reduce((acc,value) => {
    return acc + value.likes
  }, 0)

  return {
    author,
    likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
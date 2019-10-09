import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const updateBlog = (object) => {
  return async dispatch => {
    const blog = await blogsService.update(object)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog,
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const removeBlog = (object) => {
  return async dispatch => {
    await blogsService.remove(object)
    dispatch({
      type: 'REMOVE_BLOG',
      data: object
    })
  }
}

export default reducer
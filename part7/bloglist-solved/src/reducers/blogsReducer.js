import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'UPDATE_BLOG': {
    const id = action.data.id
    return state.map(b => b.id !== id ? b : action.data)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const notes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: notes,
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updated = await blogService.update(blog)
    console.log(updated)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updated,
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updated = await blogService.comment(blog.id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updated,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id,
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default reducer
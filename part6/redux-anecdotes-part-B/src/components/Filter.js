import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const store = props.store
  const filter = store.getState().filter

  const handleChange = (event) => {
    const newValue = event.target.value
    store.dispatch(setFilter(newValue))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange}/>
    </div>
  )
}

export default Filter
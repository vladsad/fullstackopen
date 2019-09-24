import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const store = props.store
  const message = store.getState().notifications

  if (!message) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
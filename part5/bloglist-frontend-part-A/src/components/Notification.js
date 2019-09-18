import React from 'react'



const Notification = ({ message }) => {
  const [text, type] =  message

  if (text === null) {
    return null
  }

  const NOTIFICATIONSTYLE = {
    success : 'green',
    error : 'red',
    default : 'black'
  }
  
  const style = {
    color: NOTIFICATIONSTYLE[type],
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification
  
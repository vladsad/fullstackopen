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
    color: NOTIFICATIONSTYLE[type]
  }

  return (
    <div className="notification" style={style}>
      {text}
    </div>
  )
}

export default Notification
  
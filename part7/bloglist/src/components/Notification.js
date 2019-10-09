import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const message = props.notifications

  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
)(Notification)

export default ConnectedNotification
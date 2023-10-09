import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className={message.type}>
    {message.message}
  </div>
}

Notification.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Notification

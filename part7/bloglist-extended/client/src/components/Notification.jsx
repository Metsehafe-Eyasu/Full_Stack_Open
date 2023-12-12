import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const Notification = () => {
  const message = useSelector((state) => state.notification);
  console.log(message);
  if (message === null) {
    return null;
  }
  return <div className={message.type}>{message.message}</div>;
};

Notification.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Notification;

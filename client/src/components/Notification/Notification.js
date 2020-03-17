import React from 'react';
// import style from './Notification.module.css'

class Notifications extends React.Component {
    componentDidMount() {
        //this.props.getNotificationList({})
    }

    render() {
        let notifications = this.props.likesNotification.map(n => (
            <Notification />
        ));
        return(
        <div>
            <h1>Notifications:</h1>
            <p>{this.props.newNotificationsCount}</p>
            {notifications}
        </div>)
    }
}


const Notification = () => {

    return (
        <div>
            <p>Notification__</p>
        </div>
    );

}
export default Notifications;
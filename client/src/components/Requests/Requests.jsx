import React, { useEffect } from 'react';

import './Requests.scss'

const Requests = ({
    getMyData,
    getUsers,
    setSubscribers,
    subscribers,
    myFullData,
    users,
    follow, 
}) => {
    useEffect(() => {
        if (!myFullData) getMyData();
    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (users && myFullData) {
            setSubscribers(users.filter(user => (
                myFullData.subscribers.includes(user._id)
            )));
        };
    }, [users, myFullData]);

    const handleFollow = (id) => {
        follow(id);
    }

    return (
        <div>
            {subscribers &&
                <div className="requst">
                    {subscribers.map(subscriber => (
                        <div className="requst-friend">
                            <img
                                alt='requst friend'
                                src={subscriber.photos.small}
                                className="requst-friend-media"
                            />
                            <div>
                                <p className="requst-friend-name">{subscriber.name}</p>
                                <p className="requst-friend-surname">{subscriber.surname}</p>
                                <p className="requst-friend-city">{subscriber.city}</p>
                                <button onClick={() => handleFollow(subscriber._id)}>FOLLOW</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Requests;

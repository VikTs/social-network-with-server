import React from 'react';
import './MembersList.scss';

const MembersList = ({ choosedMembersId, setNewMemberId }) => {
  const friends = [
    {
      contacts: {
        facebook: 'fb',
        youtube: 'youttttttubbbbbe'
      },
      photos: {
        small: null,
        large: ''
      },
      friends: [
        '5e97566137513a21d8e72649'
      ],
      myfollows: [],
      subscribers: [],
      notifications: [],
      _id: '5e9756bd37513a21d8e7264e',
      email: 'lizkakriva@gmail.com',
      password: '$2a$12$BCZ4hYABcq5Py1UJq6vtbeEpnlagb59TmDaDNSQf0thPS3lSfwyT.',
      name: 'lizkakriva',
      surname: 'wrew',
      age: 20,
      city: 'Kharkiv',
      status: 'Here must be my status',
      aboutMe: 'Hi, I am new user',
      messages: [],
      posts: [],
      __v: 0,
      followed: true
    },
    {
      name: 'myName',
      surname: 'mySurname',
      age: 43,
      aboutMe: 'aboutMe info',
      city: 'Lviv',
      _id: '123345567',
    }
  ]

  // useEffect() => {
  //   if(!props.friends) api.getFriends()
  // }


  const handleChange = e => {
    setNewMemberId(
      e.target.checked ?
        [...choosedMembersId, e.target.name] :
        choosedMembersId.filter(id => id !== e.target.name))
  }


  return (
    <div className="members-list">
      {friends.map(friend =>
        <div className="member-item"
          key={friend._id}
          title={`Name: ${friend.name}${"\n"}Age: ${friend.age}${"\n"}City: ${friend.city}${"\n"}About me: ${friend.aboutMe}`}>
          <h2 className="member-name" >{`${friend.name} ${friend.surname}`}</h2>
          <p className="member-city" >{friend.city}</p>

          <div class="form-group">
            <input
              className="member-choose"
              type="checkbox"
              name={friend._id}
              id={friend._id}
              onChange={handleChange}
            />
            <label className="member-choose-label" for={friend._id}></label>
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersList;
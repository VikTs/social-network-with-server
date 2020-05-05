import React from 'react';
import './MembersList.scss';

const MembersList = ({ choosedMembersId, setNewMemberId, friends }) => {
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
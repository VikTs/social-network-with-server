import React from 'react';
import './MembersList.scss';
import { Card, CardContent } from '@material-ui/core';

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
        // <div className="member-item"
        //   key={friend._id}
        //   title={`Name: ${friend.name}${"\n"}Age: ${friend.age}${"\n"}City: ${friend.city}${"\n"}About me: ${friend.aboutMe}`}>
        <div key={friend._id} className="member-item">
          <Card className="member-item-card">
            <CardContent>
              <h2 className="member-name" >{`${friend.name} ${friend.surname}`}</h2>
              <p className="member-city" >{friend.city}</p>
              <div className="form-group">
                <input
                  className="member-choose"
                  type="checkbox"
                  name={friend._id}
                  id={friend._id}
                  onChange={handleChange}
                />
                <label className="member-choose-label" htmlFor={friend._id}></label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default MembersList;
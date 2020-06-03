import React, { useState, useEffect } from 'react';

// import Paginator from '../common/Paginator/Paginator';
import UsersFilter from './UsersFilter/UsersFilter';
import User from '../common/User/UserContainer';
import { compareIncludeStrings } from '../../utils/format/format';

import './Users.scss';

const Users = ({ users }) => {

    const [filteredUsers, setFilteredUsers] = useState(users);
    const [filteredText, setFilteredText] = useState('');

    useEffect(() => {
        if (users) {
            setFilteredUsers(users.filter(user =>
                compareIncludeStrings(`${user.name} ${user.surname}`, filteredText)
            ));
        }
    }, [users]);

    return (
        <div className="users">
            {/* <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            /> */}

            <UsersFilter
                users={users}
                setFilteredUsers={setFilteredUsers}
                filteredText={filteredText}
                setFilteredText={setFilteredText}
            />
            <div>
                {filteredUsers &&
                    filteredUsers.map((u, i) =>
                        (<User user={u}
                            setFilteredUsers={setFilteredUsers}
                            filteredUsers={filteredUsers}
                            isFriendsPage={false}
                            key={u._id}
                        />))
                }
                {(!filteredUsers || !filteredUsers.length) && "No users found"}
            </div>
        </div>
    )
}

export default Users
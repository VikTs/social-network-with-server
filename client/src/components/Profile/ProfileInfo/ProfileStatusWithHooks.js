import React, { useState, useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [istapedTwice, toggleTapedTwice] = useState(false);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status] 
    )

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const simulateDoubleClick = (e) => {
        if(!istapedTwice) {
            toggleTapedTwice(true);
            setTimeout( function() { toggleTapedTwice(false); }, 300 );
            return false;
        }
        activateEditMode();
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} onTouchStart={simulateDoubleClick}>
                        {'Status: ' + (props.status || "-------")}
                    </span>
                </div>}

            {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                    />
                </div>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;
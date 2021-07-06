import React, {useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string | null) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
            </div>
            }

            {editMode &&
            <div>
                <input autoFocus onBlur={deactivateEditMode} onChange={onStatusChange}
                       value={status}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;

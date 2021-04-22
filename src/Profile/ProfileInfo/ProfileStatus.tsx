import React from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string | null) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status:  e.currentTarget.value
        });

    }
    render() {
        return (
            <div>

                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;
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
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        console.log("ComponentDidUpdate")
    }


    render() {
        console.log("render")
        return (
            <div>

                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                </div>
                }

                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;
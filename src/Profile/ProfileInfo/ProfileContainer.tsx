import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {ProfileType, RootStateType} from "../../Redux/store";


type MSTPType = {
    profile: null | ProfileType
}
type MDTPType = {
    setUserProfile: (profile: ProfileType | null) => void
}
export type ProfilePropsType = MSTPType & MDTPType

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                debugger
                this.props.setUserProfile(response.data);
            })
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const MapStateToProps = (state: RootStateType): MSTPType => ({
    profile: state.profilePage.profile
})
export default connect(MapStateToProps, {setUserProfile})(ProfileContainer);
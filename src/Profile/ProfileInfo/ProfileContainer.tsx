import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, setUserProfile} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Redux/store";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {StoreType} from "../../Redux/redux-store";
import {usersAPI} from "../../API/api";

type ParamType = {
    userId: string
    //userId: number => ???
}
type MSTPType = {
    profile: null | ProfileType

}
type MDTPType = {
    //setUserProfile: (profile: ProfileType | null) => void
    getUserProfile: (userId: string) => void
}
export type ProfilePropsType = MSTPType & MDTPType

type CommonPropsType = RouteComponentProps<ParamType> & ProfilePropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId);
        /*usersAPI.getProfile(userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            })*/
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    profile: state.profilePage.profile
})

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(MapStateToProps, {getUserProfile})(withUrlDataContainerComponent);
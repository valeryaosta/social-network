import React, {ComponentType} from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Redux/store";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {StoreType} from "../../Redux/redux-store";
import {WithAuthRedirect} from "../../HOC/AuthWithRedirect";
import {compose} from "redux";

type ParamType = {
    userId: string
}
type MSTPType = {
    profile: null | ProfileType

}
type MDTPType = {
    getUserProfile: (userId: string) => void
}
export type ProfilePropsType = MSTPType & MDTPType

type CommonPropsType = RouteComponentProps<ParamType> & ProfilePropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
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
    profile: state.profilePage.profile,
})

export default compose<ComponentType>(
    connect(MapStateToProps, {getUserProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);

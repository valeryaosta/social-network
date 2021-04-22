import React, {ComponentType} from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getStatusProfile, getUserProfile, updateStatusProfile} from "../../Redux/profile-reducer";
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
    status: string
}
type MDTPType = {
    getUserProfile: (userId: string) => void,
    getStatusProfile: (userId: string) => void,
    updateStatusProfile: (status: string | null) => void
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
        this.props.getStatusProfile(userId);
    }

    render() {

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatusProfile={this.props.updateStatusProfile}/>
            </div>
        );
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status ? state.profilePage.status : ""
})

export default compose<ComponentType>(
    connect(MapStateToProps, {getUserProfile, getStatusProfile, updateStatusProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);

import React, {ComponentType} from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {
    getStatusProfile,
    getUserProfile,
    saveNewProfileData,
    savePhoto,
    updateStatusProfile
} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Redux/profile-reducer";
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
    authorizedUserId: string
    isAuth: boolean


}
type MDTPType = {
    getUserProfile: (userId: string) => void,
    getStatusProfile: (userId: string) => void,
    updateStatusProfile: (status: string | null) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveNewProfileData: (formData: any) => void
}
export type ProfilePropsType = MSTPType & MDTPType

type CommonPropsType = RouteComponentProps<ParamType> & ProfilePropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            //userId = '2'
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatusProfile(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}
                         isOwner={!this.props.match.params.userId}
                         status={this.props.status}
                         updateStatusProfile={this.props.updateStatusProfile}
                         savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status ? state.profilePage.status : "",
    authorizedUserId: state.authState.id,
    isAuth: state.authState.isAuth
})

export default compose<ComponentType>(
    connect(MapStateToProps, {getUserProfile, getStatusProfile, updateStatusProfile, savePhoto, saveNewProfileData}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer);

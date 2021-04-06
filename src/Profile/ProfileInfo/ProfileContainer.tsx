import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Redux/store";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {StoreType} from "../../Redux/redux-store";

type ParamType = {
    userId: string
    //userId: number => ???
}
type MSTPType = {
    profile: null | ProfileType
    isAuth: boolean

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
        if (!this.props.isAuth) return <Redirect to={'/login'} />

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const MapStateToProps = (state: StoreType): MSTPType => ({
    profile: state.profilePage.profile,
    isAuth: state.authState.isAuth
})

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(MapStateToProps, {getUserProfile})(withUrlDataContainerComponent);
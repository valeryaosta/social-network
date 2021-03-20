import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {ProfileType} from "../../Redux/store";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {StoreType} from "../../Redux/redux-store";

type ParamType = {
    userId: string
    //userId: number => ???
}

type MSTPType = {
    profile: null | ProfileType
}
type MDTPType = {
    setUserProfile: (profile: ProfileType | null) => void
}
export type ProfilePropsType = MSTPType & MDTPType

type CommonPropsType = RouteComponentProps<ParamType> & ProfilePropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        //если оставить тогда некорректно отображается те юзеры, у которых есть ава
        //это скорее всего из-за типа данных вроде строка, а вроде и u number
        //но это временная заглушка, хардкод
         /*if(!userId) {
           userId = '2'
        }*/

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
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

const MapStateToProps = (state: StoreType): MSTPType => ({
    profile: state.profilePage.profile
})

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(MapStateToProps, {setUserProfile})(withUrlDataContainerComponent);
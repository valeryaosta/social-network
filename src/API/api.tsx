import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': 'dbddbad0-5fc7-4e37-91bc-35e6e35f65ef'}
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(userId: string) {
        console.warn("Obsolete method. Please use profileAPI object")
        return profileAPI.getProfile(userId)
    }
}
export default usersAPI;

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha: false})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

type UpdateStatusAxiosT = { data: {}, resultCode: number, messages: string[] };
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string | null) {
        return instance.put<UpdateStatusAxiosT>(`profile/status/`, {status: status});
    }
}
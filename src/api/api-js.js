import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': "bcafe704-1e20-408c-8edf-53182718e5ec"
    }
})

export const usersAPI = {
    getUsers(currentPage,pageSize,whatUsers){
       return  instance.get( `users?page=${currentPage}&count=${pageSize}&friend=${whatUsers}`).then(response => ({response})).catch(error => ({error}))
    },
    getFriends(friend,pageNumber,count){
        return instance.get(`users?friend=${friend}&page=${pageNumber}&count=${count}`).then(response => response.data).catch(error => console.log(error.message))
    },
    getUsersSubs(userId){
      return instance.get(`follow/${userId}`).then(response => ({response})).catch(error => ({error}))
    },
    postUsersSubs(userId){
      return  instance.post(`follow/${userId}`).then(response => ({response})).catch(error => ({error}))
    },
    deleteUsersSubs(userId){
        return instance.delete(`follow/${userId}`).then(response => ({response})).catch(error => ({error}))
    },
    getProfile(userId){
        return instance.get(`profile/${userId}`).catch(error => console.log(error.message))
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`).then(response => response.data).catch(error => console.log(error.message))
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status}).catch(error => console.log(error.message))
    },
    savePhoto(photo){
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo',formData).catch(error => console.log(error.message))
    },
    saveProfile(profile){
        return instance.put(`profile`,profile).catch(error => console.log(error.message))
    }
}

export const authApi = {
    getAuth() {
        return  instance.get(`auth/me`).then(response => response.data)
    },
    getCaptcha(){
        return instance.get(`security/get-captcha-url`).then(response => ({response})).catch(error => ({error}))
    },
    login(email,password,rememberMe = false,captcha) {
        return  instance.post(`auth/login`, {email,password,rememberMe,captcha}).then(response => ({response})).catch(error => ({error}))
    },
    logout(){
        return instance.delete(`auth/login`).then(response => response.data)
    },
}

export const galleryApi = {
    getImages(){
        return axios.get('https://api.giphy.com/v1/gifs/random?api_key=gR30u9O8KPOanwIQupHbD90d4k57EOeY').then(response => ({response})).catch(error => ({error}))
    }
}



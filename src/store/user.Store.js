import { http } from '@/utils'
const { makeAutoObservable } = require("mobx")

class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    getUserInfo = async () => {
        const res = await http.get('/user/profile')
        this.userInfo = res.data
    }
}
export default UserStore
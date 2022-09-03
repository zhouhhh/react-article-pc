import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken ,removeToken} from '@/utils'
export default class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }
    //登录
    login = async ({ mobile, code }) => {
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile, code
        })
        this.token = res.data.token
        setToken(this.token)
    }
    loginOut=()=>{
        this.token=''
        removeToken()
    }
}
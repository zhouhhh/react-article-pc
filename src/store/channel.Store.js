import { http } from '@/utils'
const { makeAutoObservable } = require("mobx")

class ChannelStore {
    channelList = []
    constructor() {
        makeAutoObservable(this)
    }
    getChannelList = async () => {
        const res = await http.get('/channels')
        this.channelList = res.data.channels
    }
}
export default ChannelStore
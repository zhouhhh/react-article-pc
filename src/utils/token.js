const key='pc-key'
const setToken=(token)=>{
    return localStorage.setItem(key,token)
}
const getToken=(token)=>{
    return localStorage.getItem(key)
}
const removeToken=(token)=>{
    return localStorage.removeItem(key)
}
export {
    setToken,
    getToken,
    removeToken
}
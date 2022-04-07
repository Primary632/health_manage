import Cookies from "js-cookie"

export default{
    state:{
        token:'',
        
    },
    mutations:{
        setToken(state,val){
            
            state.token  = val.token
            state.user=val
            
            Cookies.set('token', val.token)
			Cookies.set('userName', val.username)
        },
        clearToken(state){
            state.token = ''
            alert('清除Token' + Cookies.get('token'))
            Cookies.remove('token')
            
        },
        getToken(state){
            state.token=state.token || Cookies.get('token')

        },
        
        clearUser(){
            alert('清除Cookie中的用户名')
            Cookies.remove('userName')
        }
    }
}
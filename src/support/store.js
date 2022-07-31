import Vue from 'vue'
import Vuex from 'vuex'
import appConfig from './app-config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug:false,

    //port 8080
    //restIp: 'http://'+window.location.host,  
     
 
    //Ratece (VPN)
    restIp: 'http://192.168.83.180:8091',
    //Krmilnik Ratece
    //restIp: 'http://192.168.1.182:8091',
    //Krmilnik hisa
    //restIp: 'http://192.168.182.121:8091',
 
    loggedIn: true,
    user:{
      name:'',
      permissionLvl:0,
      groupId:0,
    },
  },
  mutations: {
    logout:(state)=>{
      if (state.debug) console.log('store logout');
      state.loggedIn=false;
      state.user={
        name:'',
        permissionLvl:0,
        groupId:0,
      };
      appConfig.filterItemsByGroupId(0);
    },
    login:(state)=>{
      if (state.debug) console.log('store login');
      state.loggedIn=true;
    },
    setUserData:(state,userData)=>{
      if (state.debug) console.log('store setUserData');
      if (state.debug) console.log(userData);
      state.user.name=userData.username;
      state.user.permissionLvl=userData.permissionLvl;
      state.user.groupId=userData.groupId;
      appConfig.filterItemsByGroupId(userData.groupId);
    },
  },
  getters: {
    // permission:(state) => (path) => {
    //   return navigation.getItem(path)!=undefined;

    // },
  },  
  actions: {

  },



})

import Vue from 'vue'
import rest from './restAuth'
import Router from '../../support/router';
import Store from '../../support/store';


export default {

  defaultUserData:{username:'error', permissionLvl:0,permissionAreas:[]},

  async login(stayLogged,username,password){
    var reply = await rest.login(stayLogged,username,password);
    if (reply.comm=='ok'){
      if(reply.token!=''){
         this.loginOk(reply.token);
         await this.getUserData();
         this.openHomePage();
        return 0;//ok
      }else{
        return 1;//wrong user or pass
      }
    }else{
      return 2;//no response from server
    }
  },



  loginOk(token){
    Store.commit('login');
    localStorage.setItem('token', token);
    this.addTokenToHeader(token);
    
    console.log("loginOk");
  },

  async getUserData(){
    var token = localStorage.getItem('token');
    this.addTokenToHeader(token);
    var userData = await rest.getUserData(token);
    // console.log(userData);
    if (userData!=''){
      Store.commit('setUserData', userData);
    }
  },

  openHomePage(){
    Router.push({ name: 'home'});
  },

  addTokenToHeader(token){
    Vue.http.headers.common.Authorization = 'Bearer '+ token;
  },

  logout(){
    console.log("logout");
    Router.push({ name: 'login'});
    Store.commit('logout');
    rest.logout(localStorage.getItem('token'));
    localStorage.removeItem('token');
    this.addTokenToHeader();
  },

} 
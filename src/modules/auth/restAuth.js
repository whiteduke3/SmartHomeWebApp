import Vue from 'vue'
import Store from '@/support/store';
import auth from './auth'

export default {
//************************auth******************************//


	login(stayLogged,username,password){
    var req = {username: username, password: password, stayLogged:stayLogged};
    return new Promise(resolve => {
      Vue.http.post(Store.state.restIp+'/rest/auth/login/',req, { timeout: 3000 }).then(response => {
        var res =response.body;
        resolve({token:res, comm:'ok'});
      }, () => {
        resolve({token:'', comm:'error'});
      });
    })  
  },

  getUserData(token){
    var req = token;
    return new Promise(resolve => {
      Vue.http.post(Store.state.restIp+'/rest/auth/get-user-data/',req, { timeout: 3000 }).then(response => {
        var res =response.body;	
        resolve(res);
      }, () => {
        resolve('');
        auth.logout();
      });
    })    
  },
  
	logout(token){
    return new Promise(resolve => {
      Vue.http.post(Store.state.restIp+'/rest/auth/logout/',token).then(response => {
        console.log("logout from server: " + response.body);
        var res =response.body;
        resolve(res);
      }, () => {
      });
    })  
	},

}
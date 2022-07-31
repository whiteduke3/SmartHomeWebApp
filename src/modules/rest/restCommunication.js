
import Vue from 'vue'
import Store from '../../support/store'
import auth from '../auth/auth'

export default {

  post(path, req){
    return new Promise(resolve => {
      Vue.http.post(Store.state.restIp + '/rest' + path, req).then(response => {
        var res =response.body;
        resolve(res);
      }, response => {
        if (response.status==401){
            auth.logout();
        }  
        resolve(undefined);
      });
    })  
  },

  get(path){
    return new Promise(resolve => {
      Vue.http.get(Store.state.restIp + '/rest' + path).then(response => {
        var res =response.body;
        resolve(res);
      }, response => {
        if (response.status==401){
            auth.logout();
        }  
        resolve(undefined);
      });
    })  
  },

  async restWriteCall(command){
    await this.post('/tags/write/', command);
  }

}      
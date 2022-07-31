import Store from '../../support/store';
import Comm from "../../modules/rest/restCommunication";

export default {
  scadaElements:[],
  timeout:1000,
  timer:null,
  newScadaObjects:false,
  observers:[],
  
  start(){
    var tempThis = this;
    this.timer = setTimeout(function(){
      tempThis.updateValues()
      }, tempThis.timeout);
  },

  async updateValues(){
    this.newScadaObjects=false;
    await this.callRest();
    this.start();
  },

  async callRest(){
    if (this.scadaElements.length!=0 && Store.state.loggedIn){
      var req = this.scadaElements.map(element => element.tag)
      var res =await Comm.post('/tags/get-response/',req);
      if (res==undefined){
        this.timeout=5000;
      }else{
        this.timeout=1000;
        if (res.length==this.scadaElements.length){
          for(var i=0;i<this.scadaElements.length;i++){
            this.scadaElements[i].value=res[i][1];
          }
          this.notifyObservers();
        }
      } 
    }
  },

  restartTimer(millis){
    clearTimeout(this.timer);
    this.timeout=millis;
    this.start();
  },

  add(scadaObject){
    this.scadaElements.push(scadaObject);
    if (!this.newScadaObjects){
      this.restartTimer(50);
    }  
    this.newScadaObjects=true;
  },

  remove(scadaObject){
    var index = this.scadaElements.indexOf(scadaObject);
    this.scadaElements.splice(index, 1);
  },

  registerObserver(observer){
    this.observers.push(observer);
  },

  unregisterObserver(observer){
    var index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  },

  notifyObservers(){
    for(let i=0;i<this.observers.length;i++){
      this.observers[i].notify();
    }
  }

}    
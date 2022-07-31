import Store from '../../support/store';
import Comm from "../../modules/rest/restCommunication";

export default {
  observers: [],
  events: {
    alarms: [],
    warnings: [],
    notices: []
  },
  timeout: 1000,
  timer: null,
  newScadaObjects: false,

  start() {
    var tempThis = this;
    this.timer = setTimeout(function () {
      tempThis.updateValues()
    }, tempThis.timeout);
  },

  async updateValues() {
    if (Store.state.loggedIn) {
      // console.log("update alarms");
      var res = await Comm.post('/alarms/get-live/', Store.state.user.groupId);
      if (res == undefined) {
        this.timeout = 5000;
      } else {
        this.timeout = 1000;
        this.events.alarms = res.filter(al => al.severity == 0);
        this.events.warnings = res.filter(al => al.severity == 1)
        this.events.notices = res.filter(al => al.severity == 2)
        this.notifyObservers();
      }
      // console.log(res.map(val=>val.startTime));
      // console.log(this.events)
      // console.log(this.getFilteredEvents('/ljubljana-mesto'))
      // console.log(this.getFilteredEvents('/ljubljana-okolica-zahod').alarms.map(val=>val.startTime))
      // console.log(this.events.alarms.map(val=>val.startTime))

    }
    this.start();
  },

  register(observer) {
    this.observers.push(observer);
  },

  unregister(observer) {
    let index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
    // console.log("unregister observer alarms - observers size "+this.observers.length)
  },

  notifyObservers() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update();
    }
  },

  getFilteredEvents(filter) {
    var result;
    if (filter=="/home"){
      result = {
        alarms: this.events.alarms,
        warnings: this.events.warnings,
        notices: this.events.notices
      }
    }else{
      result = {
        alarms: this.getFilteredArray(filter, this.events.alarms),
        warnings: this.getFilteredArray(filter, this.events.warnings),
        notices: this.getFilteredArray(filter, this.events.notices)
      }
    }
    return result;
  },

  getFilteredArray(filter, array) {
    if (array != undefined) {
      return array.filter(al => al.filters.includes(filter))
    } else {
      return [];
    }
  }

}
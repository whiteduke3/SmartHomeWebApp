import alarmControler from "../../modules/alarms/alarmController";

export const alarmContorlerObserverMixin = {

  data() {
    return {
      events: {
        alarms: [],
        warnings: [],
        notices: []
      },
    };
  },
  methods: {
    update() {
      this.events = alarmControler.getFilteredEvents(this.filter);
      // console.log(this)
      // console.log(this.filter)
    }
  },
  mounted() {
    alarmControler.register(this);
  },

  destroyed() {
    alarmControler.unregister(this);
  },
}
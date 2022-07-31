<template>
  <div class="row m-0">
    <div v-for="(uncheckedEvent, index) in uncheckedEvents" :key="'badge'+index">
      <small class="d-flex align-items-start">
        <b-badge
          v-if="uncheckedEvent.number>0"
          pill
          :variant="uncheckedEvent.color"
          class="ml-1 badge"
        >{{uncheckedEvent.number}}</b-badge>
      </small>
    </div>
  </div>
</template>

<script>
import { alarmContorlerObserverMixin } from "./alarmControllerObserverMixin";

export default {
  props: {
    filter:{
      type: String,
      required: true
    }
  },
  mixins: [alarmContorlerObserverMixin],
  computed: {
    uncheckedEvents:function(){
      let uncheckedAlarms = this.events.alarms.filter(ev => ev.isAcked==false).length;
      let uncheckedWarnings = this.events.warnings.filter(ev => ev.isAcked==false).length;
      let uncheckedNotices = this.events.notices.filter(ev => ev.isAcked==false).length;
      const newUncheckedEvents = [{number: uncheckedAlarms, color: "danger" },{ number: uncheckedWarnings, color: "warning" }, { number: uncheckedNotices, color: "primary" }] 
      return newUncheckedEvents;
    }
  },
};
</script>

<style scoped>
.badge {
  line-height: normal;
}
.border{
  border-bottom-color: white;
  border: solid;
}

</style>
<template>
    <div>
        <div>{{time}}</div>
        <div>{{date}}</div>
    </div>
</template>

<script>

import dateTime from "../../modules/dateTime";

export default {
  data() {
    return {
      time:'',
      date:'',
      interval:null,
    };
  },
  methods: {
    updateDateTime(){
      this.time=  dateTime.getTimeString(new Date().getTime());
      this.date=  dateTime.getDateString(new Date().getTime());
    }
  },
  mounted(){
      this.interval = setInterval(this.updateDateTime, 1000);
  },
  destroyed(){
      clearInterval(this.interval);
  }
};

</script>
<style scoped lang="scss">

</style>
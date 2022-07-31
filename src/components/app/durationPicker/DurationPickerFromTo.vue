<template>
    <div class="row align-items-center ml-3">
      <div>od</div>
      <date-time-picker  @changed="changeTimeDateFrom" :defaultDateTimeStamp="new Date().getTime()-defaultDuration"></date-time-picker>
      <div>do</div>
      <date-time-picker  @changed="changeTimeDateTo"></date-time-picker>
      <b-button  class="small-button mx-4" variant="outline-light" @click="update"><icon name='sync'/></b-button>
    </div>
</template> 

<script>

import PeriodPicker from './PeriodPicker.vue'
import DateTimePicker from './DateTimePicker.vue'

export default {
  props:{
    defaultDuration:{
      type:Number, //duration in ms
      default:1000*60*60*24*7,
    }
  },

  data() {
    return {
      timeFrom:'',
      timeTo:'',
    };
  },
  components: { 
    'period-picker':PeriodPicker,
    'date-time-picker': DateTimePicker
  },
  methods: {
    changePeriod(period){
      this.period=period;

    },
    changeTimeDateFrom(time){
      this.timeFrom=time;
    },
    changeTimeDateTo(time){
      this.timeTo=time;
    },
    update(){
      this.$emit("update", this.timeFrom, this.timeTo);
    }
  },
  mounted(){
    this.$emit("update", this.timeFrom, this.timeTo);  
  }      

};

</script>  
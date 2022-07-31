<template>
    <div class="row justify-content-center align-items-center">
      <div>Časovno obdobje</div>
      <period-picker class="p-2 "   @changed="changePeriod" :selectedPeriodIndex=defaultDuration></period-picker>
      <div>do datuma</div>
      <date-time-picker  @changed="changeTimeDate"></date-time-picker>
      <b-button  class="small-button mx-4" variant="outline-light" @click="update"><icon name='sync'/></b-button>
    </div>
</template> 

<script>

import PeriodPicker from './PeriodPicker.vue'
import DateTimePicker from './DateTimePicker.vue'

export default {
  props:{
    defaultDuration:{
      type:Number, //0 - 1h, 1 - 3h, 2 - 6h, 3 - 12h, 4 - 1 day, 5 - 7 days, 6 - 1 month
      default:0,
    }
  },

  data() {
    return {
      period:'',
      time:'',
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
    changeTimeDate(time){
      this.time=time;
    },
    update(){
      this.$emit("update", this.time-this.period, this.time);
    }
  },
  mounted(){
    this.$emit("update", this.time-this.period, this.time);  
  }      

};

</script>  
<template>
    <div class="px-2"> 
      <VueCtkDateTimePicker 
              v-model="date"
              formatted="DD.MM.YYYY   HH:mm"
              format="YYYY-MM-DD HH:mm"
              :first-day-of-week="1"
              >
              
              <input type="text" class="input-style px-2"/>
      </VueCtkDateTimePicker>
    </div>
</template>


<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


export default {
  props:{
    defaultDateTimeStamp:Number
  },
  data () {
    return {
      date: this.getDefaultDate(), // new Date() za danasnji datum
    }
  },    
  methods:{
    getDefaultDate(){
      if (this.defaultDateTimeStamp==undefined){
        return this.dateTimeLongToString(new Date().getTime());
      }else{
        return this.dateTimeLongToString(this.defaultDateTimeStamp);
      }
      
    },
    dateTimeLongToString(dateTimeLong){
      //"YYYY-MM-DD HH:mm"
      let timeDate = new Date(dateTimeLong);
      let year = timeDate.getFullYear();
      let month = (timeDate.getMonth()+1)+"";
      if (month.length==1){
        month = "0"+month;
      }
      let day = timeDate.getDate()+"";
      if (day.length==1){
        day = "0"+day;
      }
      let hour = timeDate.getHours()+"";
      if (hour.length==1){
        hour = "0"+hour;
      }
      let min = timeDate.getMinutes()+"";
      if (min.length==1){
        min = "0"+min;
      }

      let dateTimeString = year+"-"+month+"-"+day+" "+hour+":"+min;
      // console.log(dateTimeString)
      return dateTimeString;
    },
    dateTimeStringToLong(dateTimeString){
      let time = new Date(dateTimeString).getTime();
      if (isNaN(time)){
        let formatted = dateTimeString.replace(/\s/, 'T')+":00";
        time = new Date(formatted).getTime();
        time += new Date().getTimezoneOffset()*1000*60;
      }  
      return time;
    }
  },
  watch:{
    date(){
      this.$emit('changed', this.dateTimeStringToLong(this.date));
    }
  },
  mounted(){
    this.$emit('changed', this.dateTimeStringToLong(this.date));
  },
  components: {
    'VueCtkDateTimePicker': VueCtkDateTimePicker
  }
}

</script>

<style scoped lang="scss">
.input-style{
  color:white;
  background-color:rgba(0, 0, 0, 0);
  border:1px solid;
  width:140px;
}

</style>
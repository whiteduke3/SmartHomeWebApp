<template>
  <div class="container-fluid" :class="{ 'cursor-progress' : loading}">
    <line-chart :inputData="inputData" />
    <duration-picker @update=update></duration-picker>
  </div>
</template> 

<script>
import LineChart from "./elements/LineChart.vue";
import Comm from "../../modules/rest/restCommunication";
import DurationPicker from '../app/durationPicker/DurationPicker.vue'


export default {
  props:{
    tags:{
      type:Array,//[tag:String,label:String,unit:String]
      required: true
    },
    maxData:{
      type:Number,
      default:500,
    }
  },
  data() {
    return {
      loading:false,
      inputData:[],
    };
  },
  components: { 
    'line-chart':LineChart, 
    'duration-picker':DurationPicker,
  },
  methods: {
    async getData(fromTime, toTime){
      this.loading=true;
      let cashData = [];
      for (let i=0;i<this.tags.length;i++){
        let req = {tag:this.tags[i].tag, from:fromTime, to:toTime, maxData:this.maxData}
        let res =await Comm.post('/charts/get-data/',req);
        if (res!=undefined){
          let data = res.dataPoints.map(val =>{return {x:val.time, y:val.value};});
          cashData.push({label:this.tags[i].label,unit:this.tags[i].unit, data:data});
        }
      }
      /* console.log(cashData); */
      this.inputData=cashData;
      this.loading=false;
    },
    update(fromTime, toTime){
      this.getData(fromTime, toTime);
    }
  },

};
</script>    

<style scoped lang="scss">
.cursor-progress{
  cursor: progress;
}
</style>

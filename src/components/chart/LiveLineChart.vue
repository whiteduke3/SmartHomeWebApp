<template>
  <div class="container-fluid">
    <line-chart :inputData="inputData"/>
  </div>
</template> 

<script>
import LineChart from "./elements/LineChart.vue";
import scadaControler from '../../modules/scada/scadaController'




export default {
  props:{
    tags:{
      type:Array,//[tag:String,label:String,unit:String]
      required: true
    },
    // maxData:{
    //   type:Number,
    //   default:500,
    // }
  },
  data() {
    return {
      timer:null,
      numberOfSamples:90,
      intervalInMs:2000,
      // tags:[{tag:"snmp.rtp-litostroj-mps1.loadCurrent", value:"", label:"test1", unit:"A"},{tag:"snmp.rtp-litostroj-mps1.outputVoltage", value:"", label:"test2", unit:"A"}],
      inputData:[],
      tagData:[],
    };
  },
  methods:{
    updateChart(){
      let dataSet = this.createDataSet();
      this.inputData = dataSet;
      // console.log(this.inputData[0].data);
    },
    createDataSet(){
      let dataset=[];
      for (let i=0;i<this.tags.length;i++){
        if (this.tagData[i]==undefined){
          this.tagData.push([]);
        }
        let tagDataSet = this.updateTagDataAndCreateTagDataSet(this.tags[i], this.tagData[i]);
        dataset.push(tagDataSet);
      }   
      return dataset;
    },
    updateTagDataAndCreateTagDataSet(tag, tagData){
      if(!isNaN(tag.value) && tag.value!=""){
        let tagValue = tag.value;
        if (tag.expression!=undefined){
          tagValue = tag.expression(tag.value);
        }
        tagData.push({x:new Date().getTime(),y:tagValue});
        if(tagData.length>this.numberOfSamples){
          tagData.splice(0,1);
        }else{
          for (let i=0;i<this.numberOfSamples;i++){
            tagData.push({x:new Date().getTime()+(this.numberOfSamples*this.intervalInMs),y:undefined});
          }
        }


      }
      return {label:tag.label, unit:tag.unit, data:tagData};
    }
  },
  mounted(){
    for (let i=0;i<this.tags.length;i++){
      scadaControler.add(this.tags[i])
    }
    this.updateChart();
    var tempThis = this;
    this.timer = setInterval(function(){tempThis.updateChart()}, this.intervalInMs);
  },

  destroyed(){
    for (let i=0;i<this.tags.length;i++){
      scadaControler.remove(this.tags[i])
    }
    clearInterval(this.timer);
  },
  components: { 
    'line-chart':LineChart, 
  },
};
</script>    

<style scoped lang="scss">
</style>

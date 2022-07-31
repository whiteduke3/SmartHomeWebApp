<template>
  <toggle-button v-model="value"
           :value="false" 
           :color="compColor" 
           :sync="true" 
           :labels="compText"
           :height=30
           :width="width"
           @change="submit"
           id="changed-font"/>
</template>

<script>
import scadaControler from '../../modules/scada/scadaController'
import Comm from "../../modules/rest/restCommunication";

export default {
  props:{
    tag:{
      type:String,
      required: true
    },
    text:{
      type:Array,
    },
    color:{
      type:[String,Array],//string: only on, array: 0-off 1-on
      default:"green"
    },    
    width:Number,
    setOnValue:{
      type:Number,
      default: 1
    }
  },
  data () {
    return {
      scadaObject:{tag:this.tag, value:''},      
      value:false,
    }
  },   
  watch: {
    'scadaObject.value':function (val) {
      this.value = this.calculateValue(val);
    },
  },
  methods: {
    submit() {
      var numValue;	
      if (this.value){
        numValue=this.setOnValue
      }else{
        numValue=0;
      }
      var command=[this.tag, numValue];
      Comm.restWriteCall(command);
    },
    calculateValue(val){
      if (val>0) {
        return true;
      }else{
        return false;
      }
    }
  },
  computed:{
    compColor() {
      if (this.color.constructor === Array){
        return {checked: this.color[1], unchecked: this.color[0]}
      }else{
        if (this.color=='green'){
          return '#4caf50';
        }else if (this.color=='red'){
          return '#fd6666';
        }
      }
      return this.color;
    },
    compText(){
      if(this.text!=undefined){
        return {unchecked: this.text[0], checked: this.text[1]};
      }
    }
  },
  mounted(){
    scadaControler.add(this.scadaObject)
  },

  destroyed(){
    scadaControler.remove(this.scadaObject)
  }  
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-js-switch#changed-font {
  font-size: 14px;
}
</style>
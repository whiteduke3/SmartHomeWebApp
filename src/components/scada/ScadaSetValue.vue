<template>
  <div>
    <b-input-group size="sm" v-bind:style="'width:'+width+'px;'" class="ml-auto mr-auto">
      <b-form-input type="number" v-model="value" style="text-align:center; border-radius: 0rem;" ref="focus" @keyup.enter.native='enterPressed'>
      </b-form-input>
      <div class="input-group-append"><span v-if="unit!=''" class="input-group-text" style="border-radius: 0rem;">{{unit}}</span></div>
    </b-input-group>
  </div>
</template>

<script>
import scadaControler from '../../modules/scada/scadaController'
import Comm from "../../modules/rest/restCommunication";

export default {
  props: {
    tag:{
      type:String,
      required: true
    },
    unit:{
      type:String,
      default:''
    },
    width:{
      type:Number,
      default:100
    },
    expressionRead:Function,
    expressionWrite:Function
  },  

  data () {
    return {
      scadaObject:{tag:this.tag, value:''},
      value:'',
      valueFromDevice:true,
      delay:false,
      timeout:'',
    }
  },   
  watch: {
    'scadaObject.value':function (val) {
      this.valueFromDevice=true;
      this.value = this.calculateValue(val);
    },	
    'value':function () {
      if (!isNaN(this.value)&&!this.valueFromDevice) {
        var tempThis=this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function(){tempThis.submit()},2000);
      }  
      this.valueFromDevice=false;
    } 
  },
  methods: {
    submit() {
      let tempValue;
      if (this.value == '?'){
        return;
      }else if (this.expressionWrite == null){
        tempValue = this.value;
      }else{
        tempValue = this.expressionWrite(this.value);
      }

      var command=[this.tag, tempValue];
      Comm.restWriteCall(command);
      this.scadaObject.value=tempValue;
      this.$refs.focus.$el.blur()
    },

    calculateValue(val){

      let value;
      if (this.expressionRead == null||(val == '?')){
        value = val;
      }else{
        value = this.expressionRead(val);
      }

      if (!isNaN(value)){
        value = Math.round(value*10)/10;
      }

      return value;
    },
    enterPressed(){
      clearTimeout(this.timeout);
      this.submit()
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
<style scoped>
</style>


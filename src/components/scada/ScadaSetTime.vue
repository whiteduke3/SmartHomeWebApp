<template>
  <div>
    <b-input-group size="sm" style="width:80px;" class="ml-auto mr-auto">
      <b-form-input type="text" v-model="value" style="text-align:center; border-radius: 0rem;" ref="focus" @keyup.enter.native='enterPressed'>
      </b-form-input>
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
    'value':function (val) {
      if (!this.valueFromDevice){
        clearTimeout(this.timeout);
        var tempThis=this;
        this.timeout = setTimeout(function(){tempThis.submit(val)},2000);
      }
      this.valueFromDevice=false;
    } 
  },
  methods: {
    submit(val) {
      var splited = val.split(':');
      if ((splited.length==2)&&splited[0]<24&&splited[0]>=0&&!splited[0]==''&&splited[1]<60&&splited[1]>=0&&!splited[1]=='') {
        var value = parseInt(splited[0])*100+parseInt(splited[1]);
        var command=[this.tag, value];
        Comm.restWriteCall(command);
        this.scadaObject.value=value;
      }else{
        this.value = this.calculateValue(this.scadaObject.value);
        this.valueFromDevice=true;
      }
      this.$refs.focus.$el.blur()
    },
    calculateValue(val){
      if (!isNaN(val)){
        var hours = val/100<10 ? '0'+parseInt(val/100) : parseInt(val/100);
        var minutes = val%100<10 ? '0'+val%100 : val%100;
        var time = hours +':'+ minutes;
        return time;
      } 
      return val;
    },
    enterPressed(){
      clearTimeout(this.timeout);
      this.submit(this.value)
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
.border-style{
/*  border-color:#262626;*/
  border-color:gray;
/*  border-color:#8b969d*/
}

</style>


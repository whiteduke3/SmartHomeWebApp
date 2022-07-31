<template>
  <div class="px-1 cursor-default">
    {{value}} {{unit}}
<!--       <p>{{tag}}</p> -->
  </div>
</template>
<script>

import scadaControler from '../../modules/scada/scadaController'

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
    expression:Function
  },  
  data () {
    return {
      scadaObject:{tag:this.tag, value:''}
    }
  },

  computed: {
    value(){

      let value;
      if (this.expression == null||(this.scadaObject.value == '?')){
        value = this.scadaObject.value;
      }else{
        value = this.expression(this.scadaObject.value);
      }

      if (!isNaN(value)){
        value = Math.round(value*10)/10;
      }

      return value;
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
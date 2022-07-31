<template>
  <div v-bind:style="style" class="px-1">
  {{source}}
<!--       <p>{{tag}}</p> -->
  </div>
</template>
<script>

import scadaControler from '../../modules/scada/scadaController'

export default {
  props:{
    tag:{
      type:String,
      required: true
    },
    text:{
      type:Array,
      required: true
    },
    textColor:Array,
  },
  data () {
    return {
      scadaObject:{tag:this.tag, value:''},
    }
  }, 
  computed: {
    source() {
      return isNaN(this.scadaObject.value)?'?':this.text[this.scadaObject.value];
    },
    style() {
      if (this.textColor!=null && !isNaN(this.scadaObject.value)){
        if (this.textColor[this.scadaObject.value]=='green'){
          return "color: #4caf50; ";
        }else if (this.textColor[this.scadaObject.value]=='red'){
          return "color: #fd6666; ";
        }

        return "color:"+this.textColor[this.scadaObject.value]+";"
      }
      return '';


    },
  },
  mounted(){
    scadaControler.add(this.scadaObject)
  },

  destroyed(){
    scadaControler.remove(this.scadaObject)
  }   
}

</script>
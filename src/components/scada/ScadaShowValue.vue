<template>
  <div class="px-1">
    {{scadaObject.value}}
  </div>
</template>
<script>

import scadaControler from '../../modules/scada/scadaController'
export default {
  props: {
    tag:{
      type:String,
      required: true
    }
  },  
  data () {
    return {
      scadaObject:{tag:this.tag, value:''}
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
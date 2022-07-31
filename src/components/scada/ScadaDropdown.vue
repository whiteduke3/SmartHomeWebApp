<template>
  <div>
    <b-dropdown :text="selectedText" :variant=variant class="no-border-radius" >
      <div v-for="(line, index) in text" :key="'dropdown' + index">
        <b-dropdown-item-button v-if="line!=''"  @click="chanegeSelected(index)" >{{line}}</b-dropdown-item-button>
      </div>
    </b-dropdown>
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
    text:{
      type:Array,
      required: true
    },
    variant:{
      type:String,
      default:"outline-light"
    }
  },  
  data () {
    return {
      scadaObject:{tag:this.tag, value:''},
      selectedText:'',
    }
  },   
  watch: {
    'scadaObject.value':function () {
      if (!isNaN(this.scadaObject.value) && this.scadaObject.value<this.text.length){
       this.selectedText=this.text[this.scadaObject.value]; 
      }
    },
  },
  methods: {
    chanegeSelected(index){
      var command=[this.tag, index];
      Comm.restWriteCall(command);
      this.selectedText=this.text[index];
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
<style lang="scss">

</style>
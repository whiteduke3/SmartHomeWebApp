<template>
    <button @click="send()" class="button" :style=style>
        <icon :name=icon :scale=scale />
    </button>  
</template>

<script>
import Comm from "../../modules/rest/restCommunication";

export default {

  props: {
    tag:{
      type:String,
      required: true
    },
    value:{
      type:String,
      required: true       
    },
    icon:{
      type:String,
      required: true       
    },
    color:String,
    scale:Number
  }, 

  data () {
    return {}
  },

  methods:{
      send(){
        if (this.value!=isNaN){
          var command=[this.tag, this.value];
          Comm.restWriteCall(command);
        }
      }
  },
  computed:{
      style(){
          if (this.color==undefined){
            return "color:white;";
          }else{
            return "color:"+this.color+";";
          }
      }
  }

} 
</script>


<style scoped lang="scss">
  .button {
    background-color: transparent;
    border-color: transparent;
    fill: white;
    &:focus {
      outline: none;
    }
    &:active{
        color:darkslategray!important;
    }
  }
</style>
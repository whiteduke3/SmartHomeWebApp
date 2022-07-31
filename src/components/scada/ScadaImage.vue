<template>
    <img v-if="image!=undefined" v-bind:src="require('../../assets/'+image)" >  
    <img v-else-if="undefinedImg!=undefined" class="undefined-img" v-bind:src="require('../../assets/'+undefinedImg)">  
</template>

<script>
import scadaControler from '../../modules/scada/scadaController'

export default {
  props:{
    tag:{
      type:String,
      required: true
    },
    images:{
        type:Array,
        required: true
    },
    expression:Function,
  },
  data () {
    return {
      scadaObject:{tag:this.tag, value:''},      
    }
  },   

  computed: {
    undefinedImg(){
      return this.images[0];
    },
    image(){
      // console.log(this.scadaObject.value)
      let value;
      this.$emit("value", this.scadaObject.value);
      if (this.expression == undefined||isNaN(this.scadaObject.value)){
        value = this.scadaObject.value;
      }else{
        value = this.expression(this.scadaObject.value);
      }

      if (value=="true"){
        value=true;
      }else if(value=="false"){
        value=false;
      }
      
      if(typeof value == 'boolean'){
        if (value){
          return this.images[1];
        }else{
          return this.images[0];
        }
      }else if (!isNaN(value) && value!=""){
        value = Math.floor(value);
        return this.images[value];
      }else{
        return undefined;
      }

    }	
  }, 
  methods:{
    // changeValue(value){
    //   this.scadaObject.value=value;
    // }
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
.undefined-img {
  opacity: 0.2;
}
</style>
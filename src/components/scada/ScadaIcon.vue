<template>
  <div :style=style>
    <icon v-if="source!=''&&source!=undefined" v-bind:name=source :scale=scale />
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
    icons:{
        type:Array,
        required: true
    },
    colors:Array,
    scale:{
      type:Number,
      default:1
    },
    expression:Function,
  },
  data () {
    return {
      scadaObject:{tag:this.tag, value:''},  
      style:""    
    }
  },   

  computed: {
    source(){
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
          this.setColor(1)
          return this.icons[1];
        }else{
          this.setColor(0)
          return this.icons[0];
        }
      }else if (!isNaN(value) && value!=""){
        value = Math.floor(value);
        this.setColor(value)
        return this.icons[value];
      }else{
        return undefined;
      }

    }	
  }, 
  methods:{
    setColor(value){
      if (this.colors==undefined){
        return
      }

      let color = this.colors[value];
      if (color!=undefined){
        this.style="color:"+color+";";
      }else{
        this.style="";
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

.undefined-img {
  opacity: 0.2;
}
</style>
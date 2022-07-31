<template>
    <div :style="location()">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    position:{
      type:Object,
      required:true
    },
    rotation:{
      type:Number
    }
  }, 

  methods:{
    location(){
      let style="";
      if (this.position==undefined){
        return "";
      }
      style =  "position:absolute;left:"+ this.position.left + "px;top:"+ this.position.top +"px;"
      let rotate = "";
      if (this.rotation!=undefined) {
            rotate =  "-ms-transform: rotate("+this.rotation+"deg);-webkit-transform: rotate("+this.rotation+"deg);transform: rotate("+this.rotation+"deg);"
      }
      return style + rotate;
    }, 
  },  
}
</script>

<style scoped lang="scss">

</style>
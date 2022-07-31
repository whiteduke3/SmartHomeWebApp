<template>
  <div>
    <img :src="backgroundImage" style="max-width:100%;" ref="image" align="left" @load="imgLoaded=true"> 
    <div :style="style">
      <slot ></slot>
    </div>
  </div>
</template>      

<script>

export default {
  props: {
    backgroundImage:{
      type:String,
      required: true
    }
  }, 
  data () {
    return {
      style:'',
      imageScale:1,
      imageSize:{
        width:0,
        height:0,
      },
      imgLoaded:false,
    }
  },
  methods:{
    onResize(){
      this.createStyle()
    },
    createStyle(){
      var currentWidth = this.$refs.image.clientWidth
      this.imageScale =  currentWidth/this.imageSize.width; 
      // this.style="position:absolute;top:0;left:0;width:"+this.imageSize.width+"px;height: "+this.imageSize.height+"px;"
      // this.style=this.style+"transform:scale("+this.imageScale+");-webkit-transform:scale("+this.imageScale+");-ms-transform:scale("+this.imageScale+");transform-origin: top left;";

      this.style={
        position:'absolute',
        top:0,
        left:0,
        width:this.imageSize.width+'px',
        height:this.imageSize.height+'px',
        transform:'scale('+this.imageScale+')',
        '-webkit-transform':'scale('+this.imageScale+')',
        '-ms-transform':'scale('+this.imageScale+')',
        'transform-origin': 'top left',
      }

    },
    setImageSize(){
      this.imageSize={width:this.$refs.image.naturalWidth,height:this.$refs.image.naturalHeight}
    },
  },

  watch: {
    imgLoaded:function (val) {
      if (val==true){
        this.setImageSize()
        this.createStyle()
      }
    }
  },    

  mounted:function (){
    window.addEventListener('resize', this.onResize)
  },
  
  destroyed:function(){
    window.removeEventListener('resize', this.onResize)
  }


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
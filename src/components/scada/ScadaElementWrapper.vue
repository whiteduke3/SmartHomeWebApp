<template>
    <div class="row pl-3" :style="location()">
        <div class="pr-2 text-right" :class="{'small-width' : smallText, 'large-width' : !smallText}" >{{element.text}}</div>
        <!-- <slot class="number shadow"></slot> -->
          <scada-number
            v-if="element.type=='number'"
            :tag="element.tag"
            :unit="element.unit"
            :expression="element.expression"
            class="scada-element"
          />
          <scada-text
            v-else-if="element.type=='text'"
            :text="element.scadaText"
            :textColor="element.scadaTextColor"
            :tag="element.tag"
            class="scada-element"
          />
          <scada-image
            v-else-if="element.type=='image'"
            :tag="element.tag"
            :images="element.images"
            :expression="element.expression"
          />
    </div>
</template>

<script>
export default {
  props: {
    element:{
      type:Object,
      required:true
    }
  }, 
  computed:{
    smallText:function(){
      if (this.element.text==undefined){
        return true;
      }
      return this.element.text.length<=6;
    }

  },
  methods:{
    location(){
      if (this.element.position==undefined){
        return "";
      }
      return "position:absolute;left:"+ this.element.position.left + "px;top:"+ this.element.position.top +"px;"
    }, 
  },  
}
</script>

<style scoped lang="scss">
.small-width{
  min-width:60px;
}
.large-width{
  min-width:140px;
}

</style>
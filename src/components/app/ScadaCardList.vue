<template>
  <div>
      <div v-for="(item, index) in items" :key="'items'+index" class="row align-items-center justify-content-between m-2">
        <div class="col-sm-7">
          {{item.desc}}
        </div> 
         <scada-icon v-if="item.scadaType=='icon'" :tag=item.tag :icons=item.icons :colors=item.colors :scale=1.5 class="col-sm-5" />
         <scada-number v-if="item.scadaType=='number'" :tag=item.tag :unit=item.unit :expression=item.expression class="col-sm-5" />
         <scada-text v-if="item.scadaType=='text'" :tag=item.tag :text=item.text :textColor=item.textColor class="col-sm-5" />
         <scada-set-value v-if="item.scadaType=='setValue'" :tag=item.tag :unit=item.unit :width=item.width :expressionRead=item.expressionRead :expressionWrite=item.expressionWrite class="col-sm-5" />
         <scada-set-time v-if="item.scadaType=='setTime'" :tag=item.tag class="col-sm-5" />
         <scada-dropdown v-if="item.scadaType=='dropdown'" :tag=item.tag :text=item.text class="col-sm-5" />
          <div class="col-sm-5" >
            <scada-switch v-if="item.scadaType=='switch'" :tag=item.tag :text=item.text :color=item.color :width=item.width :setOnValue=item.setOnValue  />
          </div>
         
      </div> 
  </div>
</template>

<script>

export default {
  props:{
    items:{
      type:Array,
      required: true
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>

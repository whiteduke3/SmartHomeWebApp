<template>
  <div class="mb-4 py-3">
    <div class="card border-dark h-100 shadow">
      <h5 v-if="header!=''" class="card-header p-4">{{header}}</h5>
      <div class="card-block">
        <slot></slot>
      </div>
    </div> 
  </div> 
</template>

<script>

export default {
  name: 'scada-card',
  props:{
    header:{
      type:String,
      default:''
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.card {
  color: $text-primary-color;
  min-width:350px;
  background-color:$background-elements-color;
  border-radius: 1rem;
  /* border:none; */

  .card-header{
    min-height:40px;
    border: none;
  }
}



</style>

<template>
    <div id="svgCard" class="shadow" style="display: flex; flex: 1; height:100%;">
      <slot></slot>
    </div>
</template>

<script>


export default {
  name: 'svg-card',
  data() {
    return {
      

    };
  },
  components: {
    
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#svgCard {
    display: flex; 
    flex: 1; 
    height:100%;
    color: $text-primary-color;
    background-color:$background-elements-color;
    margin: 18px 10px 40px 20px;
    min-width:250px;
    border-radius: 1rem;
    border:none;
    width: 70%;
}

</style>
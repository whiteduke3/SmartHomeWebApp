<template>
    
  <svg viewBox="0 0 10 10" :id="String(_uid)" class="cursor-pointer door-svg" width="10" height="10">
    <circle v-if="this.doorObject.value > 0" id="doorIcon" cx="5" cy="5" r="5" fill="#fa0000" stroke="#fa0000" stroke-width="1px" fill-opacity="1" /> <!--  v-if="this.doorObject.value > 0" -->
  </svg>

</template>

<script>

import scadaController from '../../modules/scada/scadaController';


export default {
  name: "Door",
  props: {
    doorTag: {
      type: String,
      required: true
    }
  },

  data() {
    return {  
      doorObject: {
        tag: this.doorTag,
        value: null
      }
    };
  },

  methods: {

  },


  mounted() {
    scadaController.add(this.doorObject);
  },

  destroyed() {
    scadaController.remove(this.doorObject);
  }

}
</script>


<style scoped lang="scss">

.door-svg {
  overflow: visible;
}

.door-svg circle {
  transition: fill .7s ease;
}

</style>

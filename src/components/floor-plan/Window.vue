<template>
    
  <svg viewBox="0 0 25 7" :id="String(_uid)" class="cursor-pointer window-svg" width="25" height="7">
    <circle v-if="this.windowObject.value > 0" id="doorIcon" cx="5" cy="5" r="5" fill="red" stroke="red" stroke-width="2px" fill-opacity="1" /> <!-- v-if="this.windowObject.value > 0" -->
    <!-- <rect id="windowIcon" x="0" y="0" rx="2" width="100%" height="100%" fill="#43A6C6" stroke="#43A6C6" stroke-width="1px" fill-opacity="1" :transform="`rotate(${rotation})`" transform-origin="center" /> -->
  </svg>

</template>

<script>

import scadaController from '../../modules/scada/scadaController';


export default {
  name: "Window",
  props: {
    windowTag: {
      type: String,
      required: true
    },
    rotation: {
        type: Number,
        default: 0
    }
  },

  data() {
    return {  
      windowObject: {
        tag: this.windowTag,
        value: null
      }
    };
  },

  methods: {

  },


  mounted() {
    scadaController.add(this.windowObject);
  },

  destroyed() {
    scadaController.remove(this.windowObject);
  }

}
</script>


<style scoped lang="scss">

.window-svg {
  overflow: visible;
}

.window-svg rect {
  transition: fill .7s ease;
}

</style>

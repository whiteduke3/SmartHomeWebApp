<template>
  <g class="cursor-pointer light-svg" @click="submit" :fill="this.fill" :stroke="this.stroke" :fill-opacity="fOpacity">
      <slot />
  </g>
</template>

<script>

import Comm from "../../../modules/rest/restCommunication";
import scadaController from '../../../modules/scada/scadaController';


export default {
  name: "lightCustomWrapper",
  props: {
    tag: {
      type: String,
      required: true
    },
    tagLightLevel: {
      type: String,
      required: true
    }, 
    rotation: {
      type: Number,
      default: 0
    },
    position: {
        type: Object,
        required: true
    }
  },

  data() {
    return {  
      scadaObject:{
        tag: this.tag, 
        value:null
      },
      scadaObjectLevel: {
        tag: this.tagLightLevel,
        value: null
      },
      fill: "#323232",
      stroke: "#323232",
      interval: 0,
      show: false,
      fOpacity: null
    }
  },

  methods: {
    async submit() {
      var command ;
      if (this.scadaObject.value == "0") {
        command = [this.tag, "2"];
        await Comm.restWriteCall(command);
        scadaController.callRest();
      } else if (this.scadaObject.value > 0) {
        command = [this.tag, "0"];
        await Comm.restWriteCall(command); 
        scadaController.callRest();
      }
    },

    svgRotation() {
      if(this.rotation == undefined) {
        return "";
      }
      let rot = "rotate(" + this.rotation + ")";
      return rot;
    }
  },


  watch: {
    'scadaObject.value': function(val) {
      if(val > 0) {
        this.fill = "#E8DA2E";
        this.stroke = "#E8DA2E"
        this.fOpacity = this.scadaObjectLevel.value / 255;
      } else if (val == 0) {
        this.fill = "#000000";
        this.stroke = "gray";
        this.fOpacity = 0;
      } else {
        this.fill = "#323232";
        this.stroke = "gray"
        this.fOpacity = 0;
      }
    },

    'scadaObjectLevel.value': function(val) {
      if(this.scadaObject.value > 0) {
        this.fOpacity = val / 255;
      } else {
        this.fOpacity = 0;
      }
    }
  },
  mounted() {
    scadaController.add(this.scadaObject);
    scadaController.add(this.scadaObjectLevel);
  },

  destroyed() {
    scadaController.remove(this.scadaObject);
    scadaController.remove(this.scadaObjectLevel);
  }

}
</script>


<style scoped lang="scss">

.light-svg path {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>

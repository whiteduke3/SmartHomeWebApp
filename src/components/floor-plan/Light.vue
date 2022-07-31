<template>
    
  <svg viewBox="0 0 100 100" :id="String(_uid)" class="cursor-pointer light-svg" :width="this.areawidth" :height="this.areaheight">
    <rect v-if="this.type===undefined" x="25" y="25" width="50%" height="50%" @click="submit" fill="transparent" stroke="transparent" stroke-width="1px" />
    <rect v-if="this.type!==undefined" x="23%" y="-8%" :width="this.rectWidth+15" :height="this.rectHeight+15" @click="submit" fill="transparent" stroke="transparent" stroke-width="1px" :transform=svgRotation() />

    <circle v-if="this.type===undefined" @click="submit" id="circleLight" cx="50" cy="50" :r="this.radius" :fill="this.fill" :stroke="this.stroke" stroke-width="1px" :fill-opacity="fOpacity" />
    <rect v-if="this.type!==undefined" @click="submit" x="30%" y="0" :width="this.rectWidth" :height="this.rectHeight" :fill="this.fill" :stroke="this.stroke" stroke-width="1px" :transform=svgRotation() :fill-opacity="fOpacity" />
  </svg>

</template>

<script>

import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';


export default {
  name: "light",
  props: {
    tag: {
      type: String,
      required: true
    },
    tagLightLevel: {
      type: String,
      required: true
    },
    type:{
      type:String
    },
    areawidth: {
      type: Number,
      default: 100
    },
    areaheight: {
      type: Number,
      default: 100
    },
    radius: {
      type:Number
    },  
    rectWidth: {
      type: Number
    },
    rectHeight: {
      type: Number
    },
    rotation: {
      type: Number
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
    };
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
        this.stroke = "#E8DA2E";
        this.fOpacity = this.scadaObjectLevel.value / 255;
      } else if (val == 0) {
        this.fill = "#000000";
        this.stroke = "gray";
        this.fOpacity = 0;
      } else {
        this.fill = "#323232";
        this.stroke = "gray";
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

.light-svg {
  overflow: visible;
}

.light-svg circle, rect {
  transition: fill .7s ease, fill-opacity .7s ease;
}

</style>

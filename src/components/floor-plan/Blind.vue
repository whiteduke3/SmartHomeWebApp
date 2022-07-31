<template>

  <svg viewBox="0 0 100 100" class="cursor-pointer" width="100" height="100" :id="String(_uid)">
    <rect id="clickArea" x="8%" y="5%" :width="this.blindWidth + 15" :height="this.blindHeight + 15" fill="transparent" stroke="transparent" stroke-width="1px" :transform=svgRotation() />
    <rect class="progressBar" id="outerRect" x="15%" y="15%" rx="2" ry="2" :width="this.blindWidth" :height="this.blindHeight" fill="#545454" stroke="#545454" stroke-width="1px" :transform=svgRotation() />
    <rect class="progressBar" id="innerRect" x="15%" y="15%" rx="2" ry="2" :width="Math.floor(this.blindWidth * (this.scadaBlindsGetterObject.value / 100))" :height="this.blindHeight" fill="#007bff" stroke="#007bff" stroke-width="1px" :transform=svgRotation() />
    
    <b-popover :target="String(_uid)" @show="refreshValue()" triggers="click blur" placement="top" custom-class="blindsPopover">
      <svg width="200" height="60" viewBox="0 0 200 60">
        <text id="naslov" x="50%" y="25%" font-size="11px" fill="white" text-anchor="middle" dominant-baseline="middle">Želeni spust rolete</text>
        <foreignObject x="0%" y="35%" width="200" height="60">
          <div style="display: flex;">
            <p class="text-white mr-2" style="font: bold 11px sans-serif; margin-top: 13px;">0%</p>
            <b-form-input id="spustRolete" v-model="descent" @change="updateBlindValue($event)" type="range" autofocus class="mt-2" min="12" max="100" step="1"></b-form-input>
            <p class="text-white ml-2" style="font: bold 11px sans-serif; margin-top: 13px;">100%</p>
          </div>

        </foreignObject>
      </svg>
    </b-popover>
  </svg>

</template>

<script>

import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';
import Slider from './Slider.vue';


export default {
  name: "blind",
  props: {
    tagSetPos: {
        type: String,
        required: true
    },
    tagGetPos: {
        type: String,
        required: true
    },
    blindWidth: {
        type: Number,
        required: true
    },
    blindHeight: {
        type: Number,
        required: true
    },
    rotation: {
        type: Number
    }
  },
  components: {
      Slider
  },
  data() {
    return {
        scadaBlindsSetterObject: {
            tag: this.tagSetPos,
            value: null
        },
        scadaBlindsGetterObject: {
            tag: this.tagGetPos,
            value: null
        },

        descent: undefined,
    };
  },

  methods: {
    async updateBlindValue(val) {
      if(!isNaN(val)) {
        this.scadaBlindsSetterObject.value = val;
        let command = [this.scadaBlindsSetterObject.tag, Number(this.scadaBlindsSetterObject.value)];
        await Comm.restWriteCall(command);
      }
    },

    svgRotation() {
      if(this.rotation == undefined) return "";
      let rot = "rotate(" + this.rotation + ")";
      return rot;
    },

    refreshValue() {
      this.descent = this.scadaBlindsGetterObject.value;
    }

  },

  mounted() {
    scadaController.add(this.scadaBlindsSetterObject);
    scadaController.add(this.scadaBlindsGetterObject);
  },

  destroyed() {
    scadaController.remove(this.scadaBlindsSetterObject);
    scadaController.add(this.scadaBlindsGetterObject);
  }
}
</script>


<style scoped lang="scss">
.cursor-pointer {
    overflow: visible;
    &:focus {
        outline: none; 
    }
}

#innerRect {
  transition: width 1s ease;
}
</style>


<style>
.blindsPopover {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  filter: drop-shadow(0px 0px 10px black);
  border-color: rgb(100, 100, 100, 0.7);
}
.blindsPopover .arrow {
  all: unset !important;
  visibility: hidden !important;
}
</style>

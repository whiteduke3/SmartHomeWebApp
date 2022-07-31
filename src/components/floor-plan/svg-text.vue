<template>
    
  <svg viewBox="0 0 100 100" class="cursor-pointer svg-text-desc" :id="String(_uid)" width="100" height="100" style="overflow: visible;">
    <transition name="slide-fade">
      <rect v-show="this.showLightLevel" x="0" y="-20" width="60%" height="30%" fill="transparent" stroke="transparent" stroke-width="1px" />
    </transition>
    <transition name="slide-fade">
      <text v-show="this.showLightLevel" x="0" y="0" class="percentageDisplay" >{{  Math.floor((this.scadaObjectLevel.value / 255) * 100) }}%</text>
    </transition>
    <b-popover :target="String(_uid)" @show="refreshValue()" triggers="click blur" :placement="popoverPos" custom-class="lightIntensityPopover">
      <svg width="200" height="60" viewBox="0 0 200 60" style="margin: 0; padding: 0;">
        <text id="naslov" x="50%" y="25%" font-size="11px" fill="white" text-anchor="middle" dominant-baseline="middle">Intenzivnost svetlobe</text>
        <foreignObject x="0%" y="35%" width="200" height="45">
          <div style="display: flex;">
            <p class="text-white mr-2" style="font: bold 11px sans-serif; margin-top: 13px;">4%</p>          
                <b-form-input id="lightIntensity" v-model="intensity" @change="updateIntensityValue($event)" type="range" autofocus class="mt-2" min="12" max="255" step="1"></b-form-input>
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


export default {
  name: "svg-text",
  props: {
    tag: {
      type: String,
      required: true
    },
    tagLightLevel: {
      type: String,
      required: true
    },
    width: {
      type: Number,
    },
    height: {
      type: Number
    },
    popoverPos: {
      type: String,
      default: "bottom",
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
      showLightLevel: false,
      maxIntensityValue: 255,

      intensity: undefined,
    }
  },
  methods: {
    async updateIntensityValue(value) {
      if(!isNaN(value)) {
        this.scadaObjectLevel.value = value;
        let command = [this.scadaObjectLevel.tag, Number(this.scadaObjectLevel.value)];
        await Comm.restWriteCall(command);
      }
    },

    refreshValue() {
      this.intensity = this.scadaObjectLevel.value;
    }
  },

  watch: {
    'scadaObject.value': function(val) {
      if(val > 0) {
        this.showLightLevel = true;
      } else if (val == 0) {
        this.showLightLevel = false;
      } else {
        this.showLightLevel = false;
      }
    },
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
svg > text {
  fill: white;
}


.percentageDisplay {
  fill: white;
  font: bold 20px sans-serif;
  transition: all 0.3s ease;

  &:focus {
    transform: scale(1.1);
  }
}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>



<style>
.lightIntensityPopover {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  filter: drop-shadow(0px 0px 10px black);
  border-color: rgb(100, 100, 100, 0.7);

}

.lightIntensityPopover .arrow {
  all: unset !important;
  visibility: hidden !important;
}

.lightIntensityPopover .popover-body {
  padding: 10px;
}
</style>
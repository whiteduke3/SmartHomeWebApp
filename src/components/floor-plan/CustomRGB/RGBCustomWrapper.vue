<template>
  <g class="cursor-pointer light-svg" @click="submit" :fill="this.fill" :stroke="strokeColor" :fill-opacity="fOpacity">
      <slot />
  </g>
</template>

<script>
import Comm from "../../../modules/rest/restCommunication";
import scadaController from '../../../modules/scada/scadaController';

export default {
    props: {
        RGBtag: {
            type: String,
            required: true
        },
        RGBtagLevel: {
            type: String,
            required: true
        },
        RGBtagRedLight: {
          type: String,
          required: true
        },
        RGBtagGreenLight: {
          type: String,
          required: true
        },
        RGBtagBlueLight: {
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
            scadaRGBObject:{
                tag: this.RGBtag, 
                value:null
            },
            scadaRGBObjectLevel: {
                tag: this.RGBtagLevel,
                value: null
            },
            scadaRGBRedLight: {
              tag: this.RGBtagRedLight,
              value: null
            },
            scadaRGBGreenLight: {
              tag: this.RGBtagGreenLight,
              value: null
            },
            scadaRGBBlueLight: {
              tag: this.RGBtagBlueLight,
              value: null
            },
            fill: "#323232",
            strokeColor: "#323232",
            fOpacity: null
        }
  },


  methods: {

    async submit() {
      var command ;
      if (this.scadaRGBObject.value == "0") {
        command = [this.RGBtag, "2"];
        await Comm.restWriteCall(command);
        scadaController.callRest();
      } else if (this.scadaRGBObject.value > 0) {
        command = [this.RGBtag, "0"];
        await Comm.restWriteCall(command); 
        scadaController.callRest();
      }
    },

    svgRotation() {
        if(this.rotation == undefined) return "";
        let rot = "rotate(" + this.rotation + ")";
        return rot;
    },
  },

  watch: {
    'scadaRGBObject.value': function(val) {
      if(val > 0) {
        this.fill = `rgb(${this.scadaRGBRedLight.value}, ${this.scadaRGBGreenLight.value}, ${this.scadaRGBBlueLight.value})`;
        this.strokeColor = this.fill;
        this.fOpacity = this.scadaRGBObjectLevel.value / 255;
      } else if (Number(val) == 0) {
        this.fill = "#000000";
        this.strokeColor = "gray";
        this.fOpacity = 0;
      } else {
        this.fill = "#323232";
        this.strokeColor = "gray";
        this.fOpacity = 0;
      }
    },

    'scadaRGBObjectLevel.value': function(val) {
      if(this.scadaRGBObject.value > 0) {
        this.fOpacity = val / 255;
      } else {
        this.fOpacity = 0;
      }
    },

    'scadaRGBRedLight.value' : function(val) {
      if(this.scadaRGBObject.value > 0) {
        this.fill = `rgb(${val}, ${this.scadaRGBGreenLight.value}, ${this.scadaRGBBlueLight.value})`;
        this.strokeColor = this.fill;
      } else {
        this.fill = "#000000";
        this.strokeColor = "gray";
      }
    },
    
    
    'scadaRGBGreenLight.value' : function(val) {
      if(this.scadaRGBObject.value > 0) {
        this.fill = `rgb(${this.scadaRGBRedLight.value}, ${val}, ${this.scadaRGBBlueLight.value})`;
        this.strokeColor = this.fill;
      } else {
        this.fill = "#000000";
        this.strokeColor = "gray";
      }
    },

    'scadaRGBBlueLight.value' : function(val) {
      if(this.scadaRGBObject.value > 0) {
        this.fill = `rgb(${this.scadaRGBRedLight.value}, ${this.scadaRGBGreenLight.value}, ${val})`;
        this.strokeColor = this.fill;
      } else {
        this.fill = "#000000";
        this.strokeColor = "gray";
      }
    }

  },

  mounted() {
    scadaController.add(this.scadaRGBObject);
    scadaController.add(this.scadaRGBObjectLevel);
    scadaController.add(this.scadaRGBRedLight);
    scadaController.add(this.scadaRGBGreenLight);
    scadaController.add(this.scadaRGBBlueLight);
  },

  destroyed() {
    scadaController.remove(this.scadaRGBObject);
    scadaController.remove(this.scadaRGBObjectLevel);
    scadaController.remove(this.scadaRGBRedLight);
    scadaController.remove(this.scadaRGBGreenLight);
    scadaController.remove(this.scadaRGBBlueLight);
  }

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.rgb-svg {
    overflow: visible;
}

.rgb-svg rect {
    stroke:  linear-gradient(90deg, rgba(255,0,0,1), rgba(0,255,46,1), rgba(7,0,255,1));
    transition: fill .7s ease, fill-opacity .7s ease, stroke 0.7s ease;
}

</style>

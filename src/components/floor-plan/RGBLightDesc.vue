<template>
    
  <svg viewBox="0 0 100 100" class="cursor-pointer svg-text-desc" width="100" height="100" style="overflow: visible;">
    <transition name="slide-fade">
    <g v-show="this.showLightLevel" :id="String(_uid)">
      <rect id="clickArea" x="0" y="0" :width="this.rgbWidth-20" :height="this.rgbHeight-80" fill="transparent" stroke="transparent" stroke-width="1px" />
      <svg x="0" y="0" width="20" height="20" viewBox="0 0 90 90">
        <clipPath id="testClip">
          <rect width="100%" height="100%" rx="20"/>
        </clipPath>
        <g clip-path="url(#testClip)">
          <rect x="0" y="0" width="30" height="90" fill="#dc3545" />
          <rect x="30" y="0" width="30" height="90" fill="#28a745" />
          <rect x="60" y="0" width="30" height="90" fill="#0055ff" />
        </g>
      </svg>
      <text x="30%" y="18%" class="percentageDisplay" >{{  Math.floor((this.scadaRGBObjectLevel.value / 255) * 100) }}%</text>
    </g>
    </transition>
    
    <b-popover :target="String(_uid)" @show="refreshValue()" triggers="click blur" placement="top" custom-class="rgbSettingsPopover">
        <svg width="300" height="350" viewBox="0 0 300 350" style="overflow: visible;">
            <text id="naslov" x="42%" y="5%" fill="white" text-anchor="middle" dominant-baseline="middle">Nastavitve RGB luči</text>
            <text id="naslov" x="28%" y="16%" fill="white" text-anchor="middle" dominant-baseline="middle">Intenzivnost svetlobe</text>
            <foreignObject x="8%" y="19%" width="200" height="40" style="margin: 10px 0px 0px 0px; padding: 0;">
              <div style="display: flex;">
                    <p class="text-white mr-2" style="font: bold 11px sans-serif; margin-top: 13px;">4%</p>
                    <b-form-input id="lightIntensity" type="range" autofocus class="mt-2" v-model="intensity" @change="updateIntensityValue($event)" min="12" max="255" step="1"></b-form-input>
                    <p class="text-white ml-2" style="font: bold 11px sans-serif; margin-top: 13px;">100%</p>
              </div>
            </foreignObject>
            <line x1="5%" y1="34%" x2="80%" y2="34%" stroke="white" stroke-opacity="0.3" />
            <foreignObject x="8%" y="35%" width="200" height="50" style="margin: 10px 0px 0px 0px; padding: 0;">
              <div style="display: flex; align-items: center; width:100%; height:100%;">
                <b-form-checkbox switch id="lightshowSwitch" class="cursor-pointer mt-1" name="lightshowSwitch" v-model="lightshow" @change="setLightshow($event)" value="true" unchecked-value="false" style="color: white;" >
                  Lightshow
                </b-form-checkbox>
                <b-form-checkbox switch id="whiteSwitch" class="cursor-pointer mt-1 ml-3" name="whiteSwitch" v-model="colorWhite" @change="turnOnWhite($event)" value="true" unchecked-value="false" style="color: white;" > <!-- @change="setLightshow($event)" -->
                  Bela
                </b-form-checkbox>
              </div>
            </foreignObject>

            <!-- Izbira barve -->
            <foreignObject x="8%" y="50%" v-show="lightshow == 'false' && colorWhite == 'false'" width="200" height="60" style="margin: 0px 0px 0px 0px; padding: 0;">
              <p class="text-white mb-2 ml-1" style="margin: 0; padding: 0;">Izbira barve</p>
              <div class="slidecontainer" style="display: flex; align-items: center;">
                <input type="range" min="0" max="360" v-model="wantedColorHSL" @change="updateColor($event)" class="slider" id="myRange">
              </div>
            </foreignObject>
            <!-- Prikaz barve -->
            <rect x="8%" y="68%" v-show="lightshow == 'false' && colorWhite == 'false'" @show="refreshValue()" :fill="fill" rx="3" width="200" height="30" style="margin: 0px 0px 0px 0px; padding: 0;"/> <!--  -->
          
            <!-- Izbira casa cikla -->
            <foreignObject v-show="lightshow == 'true' && colorWhite == 'false'" x="8%" y="50%" width="200" height="120" style="margin: 10px 0px 0px 0px; padding: 0;">
              <p class="text-white mb-2 ml-1" style="margin: 0; padding: 0;">Čas cikla (min):</p>
              <div class="text-input">
                <input type="text" id="ciklInput" placeholder="Vnesi dolžino cikla" v-model="newCycleValue"><br>
                <button type="button" id="ciklButton" class="mt-2" @click="updateCycle(newCycleValue)">Nastavi</button>
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
  name: "rgb-text",
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
    RGBtagLightShow: {
      type: String,
      required: true
    },
    RGBtagLightShowCycleTime: {
      type: String,
      required: true
    },
    rgbWidth: {
      type: Number,
      required: true
    },
    rgbHeight: {
      type: Number,
      required: true
    },
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
      scadaLightShow: {
        tag: this.RGBtagLightShow,
        value: null
      },
      scadaCycleTime: {
        tag: this.RGBtagLightShowCycleTime,
        value: null
      },
      showLightLevel: false,
      /* fill: "#323232", */
      lightshow: 'false',
      colorWhite: 'false',
      newCycleValue: null,
      wantedColorHSL: '0',
      fetchedColor: [false, false, false],
      intensity: undefined
    }
  },
  methods: {
    refreshValue() {
      this.intensity = this.scadaRGBObjectLevel.value;
    }, 

    async setLightshow(val) {
      let command;
      if(val == "true") {
        command = [this.RGBtagLightShow, "1"];
        await Comm.restWriteCall(command);
        scadaController.callRest();
        if(this.colorWhite == "true") {
          this.colorWhite = "false";
        }
      } else if(val == "false") {
        command = [this.RGBtagLightShow, "0"];
        await Comm.restWriteCall(command); 
        scadaController.callRest();
      }
    },
    async updateIntensityValue(value) {
      if(!isNaN(value)) {
        this.scadaRGBObjectLevel.value = value;
        let command = [this.scadaRGBObjectLevel.tag, Number(this.scadaRGBObjectLevel.value)];
        await Comm.restWriteCall(command);
      }
    },


    async updateColor(event) {
      let hsl2rgb = this.HSLToRGB(Number(event.target.value), 100, 50);
      let commandRed = [this.scadaRGBRedLight.tag, hsl2rgb[0]];
      await Comm.restWriteCall(commandRed); 
      scadaController.callRest();
      let commandGreen = [this.scadaRGBGreenLight.tag, hsl2rgb[1]];
      await Comm.restWriteCall(commandGreen); 
      scadaController.callRest();
      let commandBlue = [this.scadaRGBBlueLight.tag, hsl2rgb[2]];
      await Comm.restWriteCall(commandBlue); 
      scadaController.callRest();
    },

    async turnOnWhite(value) {
      if(value == "true") {
        let commandRed = [this.scadaRGBRedLight.tag, 254];
        await Comm.restWriteCall(commandRed); 
        scadaController.callRest();
        let commandGreen = [this.scadaRGBGreenLight.tag, 254];
        await Comm.restWriteCall(commandGreen); 
        scadaController.callRest();
        let commandBlue = [this.scadaRGBBlueLight.tag, 254];
        await Comm.restWriteCall(commandBlue); 
        scadaController.callRest();
        if(this.lightshow == "true") {
          this.lightshow = "false";
        }
      }
    },


    async updateCycle(value) {
      if(!isNaN(value) && (Number(value) > 0 && Number(value) < 1440)) {
          this.scadaCycleTime.value = value;
          let command = [this.scadaCycleTime.tag, Number(this.scadaCycleTime.value)];
          await Comm.restWriteCall(command);
      }
    },

    HSLToRGB(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    },

    RGBToHSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
            ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
            : 0;
        return [
            Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
            Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
            Math.round((100 * (2 * l - s)) / 2),
        ];
    },



    async returnColor() {
      let hsl2rgb = this.HSLToRGB(Number(this.wantedColorHSL), 100, 50);
      let commandRed = [this.scadaRGBRedLight.tag, hsl2rgb[0]];
      await Comm.restWriteCall(commandRed); 
      scadaController.callRest();
      let commandGreen = [this.scadaRGBGreenLight.tag, hsl2rgb[1]];
      await Comm.restWriteCall(commandGreen); 
      scadaController.callRest();
      let commandBlue = [this.scadaRGBBlueLight.tag, hsl2rgb[2]];
      await Comm.restWriteCall(commandBlue); 
      scadaController.callRest();
      this.colorWhite = "false";
    }

  },

  computed: {
    fill() {
        if(this.colorWhite == "true") {
          return "rgb(254, 254, 254)";
        } else {
          let hsl2rgb = this.HSLToRGB(Number(this.wantedColorHSL), 100, 50);
          return `rgb(${hsl2rgb[0]}, ${hsl2rgb[1]}, ${hsl2rgb[2]})`;
        }
    },


  },
  watch: {
    'scadaRGBObject.value': function(val) {
      if(val > 0) {
        /* this.fill = `rgb(${this.scadaRGBRedLight.value}, ${this.scadaRGBGreenLight.value}, ${this.scadaRGBBlueLight.value})`; */
        this.showLightLevel = true;
      } else if (val == 0) {
        /* this.fill = "#000000"; */
        this.showLightLevel = false;
      } else {
        /* this.fill = "#323232"; */
        this.showLightLevel = false;
      }
    },


    'scadaLightShow.value' : function(val) {
      if(val > 0) {
        this.lightshow = "true";
      } else if (val == 0) {
        this.lightshow = "false";
      } else {
        this.lightshow = "false";
      }
    },

    'scadaCycleTime.value': function(newVal, oldVal) {
      if(newVal != oldVal) {
        this.newCycleValue = newVal;
      }
    },

    /* 'wantedColorHSL': function(val) {
      if(this.colorWhite == "true") {
        this.fill = "rgb(254, 254, 254)";
      } else {
        let hsl2rgb = this.HSLToRGB(Number(val), 100, 50);
        this.fill = `rgb(${hsl2rgb[0]}, ${hsl2rgb[1]}, ${hsl2rgb[2]})`;
      }
    }, */

    'colorWhite': function(val) {
      if(val == "false") {
        this.returnColor();

      }
    },

    'fetchedColor': function(val) {
      if (val === [true, true, true]) {
        this.fetchedColor = [false, false, false];
        const r = this.scadaRGBRedLight.value;
        const g = this.scadaRGBGreenLight.value;
        const b = this.scadaRGBBlueLight.value;
        let rgb2hsl = this.RGBToHSL(Number(r), Number(g), Number(b));
        this.wantedColorHSL = rgb2hsl[0].toString();
      }
    },

    'scadaRGBRedLight.value' : function(val) {
      /* let rgb2hsl = this.RGBToHSL(Number(val), Number(this.scadaRGBGreenLight.value), Number(this.scadaRGBBlueLight.value));
      this.wantedColorHSL = rgb2hsl[0].toString(); */
      this.fetchedColor[0] = true;
      if(Number(this.scadaRGBRedLight.value) >= 254 && Number(this.scadaRGBGreenLight.value) >= 254 && Number(this.scadaRGBBlueLight.value) >= 254) {
        this.colorWhite = 'true';
      }
    },
    
    
    'scadaRGBGreenLight.value' : function(val) {
      /* let rgb2hsl = this.RGBToHSL(Number(this.scadaRGBRedLight.value), Number(val), Number(this.scadaRGBBlueLight.value));
      this.wantedColorHSL = rgb2hsl[0].toString(); */
      this.fetchedColor[1] = true;
      if(Number(this.scadaRGBRedLight.value) >= 254 && Number(this.scadaRGBGreenLight.value) >= 254 && Number(this.scadaRGBBlueLight.value) >= 254) {
        this.colorWhite = 'true';
      }
    },

    'scadaRGBBlueLight.value' : function(val) {
      /* let rgb2hsl = this.RGBToHSL(Number(this.scadaRGBRedLight.value), Number(this.scadaRGBGreenLight.value), Number(val));
      this.wantedColorHSL = rgb2hsl[0].toString(); */
      this.fetchedColor[2] = true;
      if(Number(this.scadaRGBRedLight.value) >= 254 && Number(this.scadaRGBGreenLight.value) >= 254 && Number(this.scadaRGBBlueLight.value) >= 254) {
        this.colorWhite = 'true';
      }
    }

  },

  mounted() {
    scadaController.add(this.scadaRGBObject);
    scadaController.add(this.scadaRGBObjectLevel);
    scadaController.add(this.scadaRGBRedLight);
    scadaController.add(this.scadaRGBGreenLight);
    scadaController.add(this.scadaRGBBlueLight);
    scadaController.add(this.scadaLightShow);
    scadaController.add(this.scadaCycleTime);
  },

  destroyed() {
    scadaController.remove(this.scadaRGBObject);
    scadaController.remove(this.scadaRGBObjectLevel);
    scadaController.remove(this.scadaRGBRedLight);
    scadaController.remove(this.scadaRGBGreenLight);
    scadaController.remove(this.scadaRGBBlueLight);
    scadaController.remove(this.scadaLightShow);
    scadaController.remove(this.scadaCycleTime);
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
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

#modeSelect {
    width: 200px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: gainsboro;
}

.slidecontainer {
  width: 100%; /* Width of the outside container */
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,248,0,1) 16%, rgba(0,255,46,1) 33%, rgba(0,245,255,1) 49%, rgba(7,0,255,1) 66%, rgba(244,0,255,1) 82%, rgba(255,0,0,1) 100%);
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: white;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}


.text-input {
    border: none;
}

#ciklInput {
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 5px;
}

#belaButton {
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px 10px;
}


#ciklButton {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px 10px;
}

</style>



<style>
.rgbSettingsPopover {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  filter: drop-shadow(0px 0px 10px black);
  border-color: rgb(100, 100, 100, 0.7);

}

.rgbSettingsPopover .arrow {
  all: unset !important;
  visibility: hidden !important;
}

.rgbSettingsPopover .popover-body {
  padding: 10px;
}
</style>
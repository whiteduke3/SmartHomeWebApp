<template>
  <div class="px-1 pb-3">
    <v-gauge :value=value :width="'150'" :height="'100'" :options="opts" :decimalPlace="1" :maxValue=gaugeMaxValue :unit=gaugeUnit :donut=gaugeDonut />
    <!--       <p>{{tag}}</p> -->
  </div>
</template>
<script>
import scadaControler from '../../modules/scada/scadaController'
import VGauge from "vgauge";

export default {
  props: {
    tag: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      default: ""
    },
    maxValue: Number,
    //voltage, current
    type:{
      type: String,
      required: true       
    },
    //options are used if type undefined  
    options: Object,
    expression: Function
  },

  data() {
    return {
      scadaObject: { tag: this.tag, value: 0 },
      gaugeUnit:this.unit,
      gaugeMaxValue:this.maxValue,
      gaugeDonut:false,
     };
  },

  computed: {
    value() {
      let value;

      if(isNaN(this.scadaObject.value)){
        value = this.scadaObject.value;
      }else  if (this.expression == null) {
        value = Number(this.scadaObject.value);
      } else {
        value = this.expression(this.scadaObject.value);
       }
      
      return value;
    },
    opts(){
        this.setSettings();
        if (this.type=="voltage"){
            return optsVoltage;
        }else if(this.type=="current"){
            return optsCurrent;
        }else{
            return this.options;
        }
    }
  },
  methods:{
    setSettings(){
         if (this.type=="voltage"){
            this.gaugeUnit="V"
            this.gaugeMaxValue=460;
        }else if(this.type=="current"){
            this.gaugeUnit="A"
            this.gaugeDonut=true;
        }
    }
  },
  components: {
    VGauge
  },
  mounted() {
    scadaControler.add(this.scadaObject);
  },

  destroyed() {
    scadaControler.remove(this.scadaObject);
  }
};


var optsVoltage = {
        // lineWidth: 0.35,
        // radiusScale: 0.8,
        // pointer: {
        //   length: 0.6,
        //   strokeWidth: 0.035,
        //   color: "#000000"
        // },
        staticZones: [
          { strokeStyle: "#F03E3E", min: 0, max: 130 }, // Red from 100 to 130
          { strokeStyle: "#FFDD00", min: 130, max: 200 }, // Yellow
          { strokeStyle: "#30B32D", min: 200, max: 260 }, // Green
          { strokeStyle: "#FFDD00", min: 260, max: 330 }, // Yellow
          { strokeStyle: "#F03E3E", min: 330, max: 460 }, // Red from 100 to 130
        ],
        
      }
 
var optsCurrent = {
        angle: 1,
        // lineWidth: 0.1,
        // radiusScale: 0.8,
        // pointer: {
        //   length: 0.6,
        //   strokeWidth: 0.035,
        //   color: "#000000"
        // },
        // limitMax: false,
        // limitMin: false,
        colorStart: "#1f86bb",
        colorStop: "#1f86bb",
        strokeColor: "#E0E0E0",
        // generateGradient: true,
        // highDpiSupport: true,

      }


</script>
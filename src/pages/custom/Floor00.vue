<template>
  <div id="cards-div">
    <svg-card>
      <svg class="svg-klet-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
        <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/klet1.svg'/>
        <!-- Luci -->
        <light v-for="(light, index) in lights" :key="'lights'+index" :x="light.position.x" :y="light.position.y" :tag=light.tag :tagLightLevel=light.tagLightLevel :radius=light.radius :type=light.type :areawidth="light.areawidth" :areaheight="light.areawidth" :rectWidth=light.width :rectHeight=light.height :rotation=light.rotation />
        <svg-text v-for="(lightText, index) in lightTexts" :key="'lightText'+index" :x="lightText.position.x" :y="lightText.position.y" :tag=lightText.tag :tagLightLevel=lightText.tagLightLevel :width=lightText.width :height=lightText.height :popoverPos=lightText.popoverPos />
        <!-- Custom luci -->
        <light-wrapper v-for="(light, index) in lightCustom" :key="'lCustom'+index" :position="light.position" :tag=light.tag :tagLightLevel=light.tagLightLevel >
          <component :is="light.type" :x="light.position.x" :y="light.position.y" :width="light.width" :height="light.height" :rotation="light.rotation" />
        </light-wrapper>

      </svg>
    </svg-card>

    <svg-card>
      <svg class="svg-klet-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
        <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/klet.svg'/>
        <!-- Senzorji -->
        <sensor v-for="(sensor, index) in sensors" :key="'sensors'+index" :x=sensor.position.x :y=sensor.position.y :tagMinBrightness="sensor.tagMinBrightness" :tagOutput="sensor.tagOutput" :tagDisabled="sensor.tagDisabled" :tagBrightness="sensor.tagBrightness" :sensorWidth=sensor.width :sensorHeight=sensor.width />
        <!-- Ogrevanje -->
        <heat-valve v-for="(heatValve, index) in heatValves" :key="'heatValves'+index" :tagValveOpenReq=heatValve.tagValveOpenReq :x=heatValve.position.x :y=heatValve.position.y :heatValveWidth=heatValve.width :heatValveHeight=heatValve.height />
        <heat-thermostat v-for="(heatT,index) in heatThermostats" :key="'heatT'+index" :tagThermostatValueTemp=heatT.tagThermostatValueTemp :tagThermostatSetPoint=heatT.tagThermostatSetPoint  :x=heatT.position.x :y=heatT.position.y :thermostatWidth=heatT.width :thermostatHeight=heatT.height />
        <thermostat-error v-for="(tError, index) in thermostatErrors" :key="'tError'+index" :x=tError.position.x :y=tError.position.y :tagThermostatSensorError=tError.tagThermostatSensorError />
        <!-- Vrata -->
        <door v-for="(door, index) in doors" :key="'doors'+index" :x=door.position.x :y=door.position.y :doorTag="door.doorTag" />
        <!-- Okna -->
        <window v-for="(window, index) in windows" :key="'windows'+index" :x=window.position.x :y=window.position.y :rotation="window.rotation" :windowTag="window.windowTag" />
      </svg>
    </svg-card>

    <div class="outer-chart justify-content-center mx-0 p-0 ml-2">
        <scada-card> <!-- class="col-xl-12" -->
         <div class="py-3">Temperature</div>
          <history-line-chart class="px-3 pb-3" :tags="chart" />
        </scada-card>
      </div>

  </div>
</template>

<script>
import ScadaElementWrapper from "../../components/app/ScadaResizableElementWrapper.vue";
import lightsOffPritlicje from "../../components/floor-plan/lightsOffPritlicje";
import Blind from '../../components/floor-plan/Blind.vue';
import Sensor from '../../components/floor-plan/Sensor.vue';
import HeatValve from '../../components/floor-plan/HeatValve.vue';
import HeatThermostat from '../../components/floor-plan/HeatThermostat.vue';
import thermostatError from '../../components/floor-plan/thermostatError.vue';
import Door from '../../components/floor-plan/Door.vue';
import Window from '../../components/floor-plan/Window.vue';

import lights from "../../components/floor-plan/CustomLights/LightMixin.js";

export default {
  name: "Floor00",
  mixins: [lights],
  components: {
    "scada-element-wrapper": ScadaElementWrapper,
    "lightsOffPritlicje": lightsOffPritlicje,
    "blind": Blind,
    "sensor": Sensor,
    "heat-valve": HeatValve,
    "heat-thermostat": HeatThermostat,
    "thermostat-error" : thermostatError,
    "door": Door,
    "window": Window
  },
  data() {
    return {
      //Razsvetljava
      lights:[
        {tag: "beckhoff1.LIGHT.light[0].state", tagLightLevel: "beckhoff1.LIGHT.light[0].savedLVL", name:"0", position: { x: 355, y: 712 }, type: "rect", width: 7, height: 185, areawidth: 100, areaheight: 100},
        {tag: "beckhoff1.LIGHT.light[0].state", tagLightLevel: "beckhoff1.LIGHT.light[0].savedLVL", name:"0", position: { x: 470, y: 712 }, type: "rect", width: 7, height: 185, areawidth: 100, areaheight: 100},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 390, y: 50 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 390, y: 110 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 390, y: 170 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 390, y: 230 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 490, y: 50 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 490, y: 110 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 490, y: 170 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 490, y: 230 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[13].state", tagLightLevel: "beckhoff1.LIGHT.light[13].savedLVL", name:"13", position: { x: 880, y: 165 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[13].state", tagLightLevel: "beckhoff1.LIGHT.light[13].savedLVL", name:"13", position: { x: 940, y: 165}, radius: 5},
        {tag: "beckhoff1.LIGHT.light[13].state", tagLightLevel: "beckhoff1.LIGHT.light[13].savedLVL", name:"13", position: { x: 880, y: 215 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[13].state", tagLightLevel: "beckhoff1.LIGHT.light[13].savedLVL", name:"13", position: { x: 940, y: 215 }, radius: 5},
        {tag: "beckhoff1.LIGHT.light[14].state", tagLightLevel: "beckhoff1.LIGHT.light[14].savedLVL", name:"14", position: { x: 510, y: 590 }, radius: 7},
        {tag: "beckhoff1.LIGHT.light[15].state", tagLightLevel: "beckhoff1.LIGHT.light[15].savedLVL", name:"15", position: { x: 618, y: 195 }, type: "rect", width: 80, height: 8},
        {tag: "beckhoff1.LIGHT.light[16].state", tagLightLevel: "beckhoff1.LIGHT.light[16].savedLVL", name:"16", position: { x: 775, y: 155 }, radius: 7, areawidth: 70, areaheight: 70},
        {tag: "beckhoff1.LIGHT.light[16].state", tagLightLevel: "beckhoff1.LIGHT.light[16].savedLVL", name:"16", position: { x: 825, y: 155 }, radius: 7, areawidth: 70, areaheight: 70},
        {tag: "beckhoff1.LIGHT.light[16].state", tagLightLevel: "beckhoff1.LIGHT.light[16].savedLVL", name:"16", position: { x: 825, y: 220 }, radius: 7, areawidth: 70, areaheight: 70},
        {tag: "beckhoff1.LIGHT.light[17].state", tagLightLevel: "beckhoff1.LIGHT.light[17].savedLVL", name:"17", position: { x: 635, y: 156 }, type: "rect", width: 7, height: 48, areawidth: 60, areaheight: 60},
        {tag: "beckhoff1.LIGHT.light[17].state", tagLightLevel: "beckhoff1.LIGHT.light[17].savedLVL", name:"17", position: { x: 680, y: 135 }, radius: 10, areawidth: 70, areaheight: 70},
        {tag: "beckhoff1.LIGHT.light[18].state", tagLightLevel: "beckhoff1.LIGHT.light[18].savedLVL", name:"18", position: { x: 718, y: 210 }, type: "rect", width: 20, height: 7},
        {tag: "beckhoff1.LIGHT.light[18].state", tagLightLevel: "beckhoff1.LIGHT.light[18].savedLVL", name:"18", position: { x: 720, y: 255 }, type: "rect", width: 7, height: 20},
        {tag: "beckhoff1.LIGHT.light[18].state", tagLightLevel: "beckhoff1.LIGHT.light[18].savedLVL", name:"18", position: { x: 665, y: 265 }, type: "rect", width: 20, height: 7},
        {tag: "beckhoff1.LIGHT.light[92].state", tagLightLevel: "beckhoff1.LIGHT.light[92].savedLVL", name:"92", position: { x: 605, y: 240 }, radius: 10, areawidth: 70, areaheight:70},
      ],
      lightTexts: [
        {tag: "beckhoff1.LIGHT.light[0].state", tagLightLevel: "beckhoff1.LIGHT.light[0].savedLVL", name:"0", position: { x: 430, y: 800 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[1].state", tagLightLevel: "beckhoff1.LIGHT.light[1].savedLVL", name:"1", position: { x: 470, y: 200 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[2].state", tagLightLevel: "beckhoff1.LIGHT.light[2].savedLVL", name:"2", position: { x: 475, y: 510 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[3].state", tagLightLevel: "beckhoff1.LIGHT.light[3].savedLVL", name:"3", position: { x: 695, y: 510 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[4].state", tagLightLevel: "beckhoff1.LIGHT.light[4].savedLVL", name:"4", position: { x: 915, y: 510 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[5].state", tagLightLevel: "beckhoff1.LIGHT.light[5].savedLVL", name:"5", position: { x: 1135, y: 510 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[6].state", tagLightLevel: "beckhoff1.LIGHT.light[6].savedLVL", name:"6", position: { x: 940, y: 350 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[7].state", tagLightLevel: "beckhoff1.LIGHT.light[7].savedLVL", name:"7", position: { x: 1110, y: 350 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[8].state", tagLightLevel: "beckhoff1.LIGHT.light[8].savedLVL", name:"8", position: { x: 690, y: 623 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[9].state", tagLightLevel: "beckhoff1.LIGHT.light[9].savedLVL", name:"9", position: { x: 900, y: 623 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[10].state", tagLightLevel: "beckhoff1.LIGHT.light[10].savedLVL", name:"10", position: { x: 1100, y: 623 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[11].state", tagLightLevel: "beckhoff1.LIGHT.light[11].savedLVL", name:"11", position: { x: 410, y: 342 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[12].state", tagLightLevel: "beckhoff1.LIGHT.light[12].savedLVL", name:"12", position: { x: 800, y: 352 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[13].state", tagLightLevel: "beckhoff1.LIGHT.light[13].savedLVL", name:"13", position: { x: 942, y: 250 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[14].state", tagLightLevel: "beckhoff1.LIGHT.light[14].savedLVL", name:"14", position: { x: 545, y: 685 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[15].state", tagLightLevel: "beckhoff1.LIGHT.light[15].savedLVL", name:"15", position: { x: 620, y: 225 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[16].state", tagLightLevel: "beckhoff1.LIGHT.light[16].savedLVL", name:"16", position: { x: 820, y: 230 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[17].state", tagLightLevel: "beckhoff1.LIGHT.light[17].savedLVL", name:"17", position: { x: 665, y: 145 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[18].state", tagLightLevel: "beckhoff1.LIGHT.light[18].savedLVL", name:"18", position: { x: 700, y: 302 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[92].state", tagLightLevel: "beckhoff1.LIGHT.light[92].savedLVL", name:"92", position: { x: 625, y: 255 }, width: 100, height: 100},
      ],
      lightCustom: [
        {tag: "beckhoff1.LIGHT.light[2].state", tagLightLevel: "beckhoff1.LIGHT.light[2].savedLVL", name:"2", position: { x: 435, y: 365 }, width: 120, height: 120, type: "circle-light"},
        {tag: "beckhoff1.LIGHT.light[3].state", tagLightLevel: "beckhoff1.LIGHT.light[3].savedLVL", name:"3", position: { x: 650, y: 365 }, width: 120, height: 120, type: "circle-light"},
        {tag: "beckhoff1.LIGHT.light[4].state", tagLightLevel: "beckhoff1.LIGHT.light[4].savedLVL", name:"4", position: { x: 870, y: 365 }, width: 120, height: 120, type: "circle-light"},
        {tag: "beckhoff1.LIGHT.light[5].state", tagLightLevel: "beckhoff1.LIGHT.light[5].savedLVL", name:"5", position: { x: 1090, y: 365 }, width: 120, height: 120, type: "circle-light"},
        {tag: "beckhoff1.LIGHT.light[6].state", tagLightLevel: "beckhoff1.LIGHT.light[6].savedLVL", name:"6", position: { x: 900, y: 170 }, width: 220, height: 220, type: "parking-double"},
        {tag: "beckhoff1.LIGHT.light[6].state", tagLightLevel: "beckhoff1.LIGHT.light[6].savedLVL", name:"6", position: { x: 900, y: 300 }, width: 220, height: 220, type: "parking-double"},
        {tag: "beckhoff1.LIGHT.light[7].state", tagLightLevel: "beckhoff1.LIGHT.light[7].savedLVL", name:"7", position: { x: 1030, y: 170 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[7].state", tagLightLevel: "beckhoff1.LIGHT.light[7].savedLVL", name:"7", position: { x: 1030, y: 300 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[8].state", tagLightLevel: "beckhoff1.LIGHT.light[8].savedLVL", name:"8", position: { x: 635, y: 530 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[8].state", tagLightLevel: "beckhoff1.LIGHT.light[8].savedLVL", name:"8", position: { x: 635, y: 660 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[9].state", tagLightLevel: "beckhoff1.LIGHT.light[9].savedLVL", name:"9", position: { x: 835, y: 530 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[9].state", tagLightLevel: "beckhoff1.LIGHT.light[9].savedLVL", name:"9", position: { x: 835, y: 660 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[10].state", tagLightLevel: "beckhoff1.LIGHT.light[10].savedLVL", name:"10", position: { x: 1030, y: 530 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[10].state", tagLightLevel: "beckhoff1.LIGHT.light[10].savedLVL", name:"10", position: { x: 1030, y: 660 }, width: 220, height: 220, type: "parking-quadruple"},
        {tag: "beckhoff1.LIGHT.light[11].state", tagLightLevel: "beckhoff1.LIGHT.light[11].savedLVL", name:"11", position: { x: 385, y: 50 }, type: "light-11"},
        {tag: "beckhoff1.LIGHT.light[12].state", tagLightLevel: "beckhoff1.LIGHT.light[12].savedLVL", name:"12", position: { x: 780, y: 155 }, type: "light-12"},
      ],


      //Senzorji
      sensors: [
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[24].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[24].output", tagDisabled:"beckhoff1.SENSOR.sensor[24].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[24].brightness", name:"SG25", position: {x: 680, y: 125}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[25].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[25].output", tagDisabled:"beckhoff1.SENSOR.sensor[25].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[25].brightness", name:"SG26", position: {x: 810, y: 160}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[26].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[26].output", tagDisabled:"beckhoff1.SENSOR.sensor[26].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[26].brightness", name:"SG27", position: {x: 620, y: 165}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[27].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[27].output", tagDisabled:"beckhoff1.SENSOR.sensor[27].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[27].brightness", name:"SG28", position: {x: 650, y: 235}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[30].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[30].output", tagDisabled:"beckhoff1.SENSOR.sensor[30].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[30].brightness", name:"SG?", position: {x: 500, y: 400}, width: 80, height: 80},

      ],

      //Ogrevanje
      heatValves: [
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K97", position: {x: 880, y:430}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K98", position: {x: 650, y:600}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K99", position: {x: 880, y:600}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K100", position: {x: 1080, y:600}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K101", position: {x: 1080, y:430}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K103", position: {x: 1080, y:230}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K104", position: {x: 450, y:150}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K105", position: {x: 525, y:615}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K106", position: {x: 400, y:430}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K106", position: {x: 400, y:630}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[14].valveOpenReq", name:"K106", position: {x: 650, y:430}, width: 80, height: 80},
      ],
      heatThermostats: [
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[13].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[13].setPoint", name:"ST39", position: {x: 715, y: 215}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[14].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[14].setPoint", name:"ST42", position: {x: 900, y: 300}, width: 100, height: 100},
      ],
      thermostatErrors: [
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[13].sensorError", name: "ST39", position: {x: 715, y: 225}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[14].sensorError", name: "ST42", position: {x: 900, y: 305}},
      ],

      windows: [
        {windowTag: "beckhoff1.GVL.sensorOpen[22]", position: {x: 395, y: 42}, name: "SO_K1"}, //levi kot zgoraj
        {windowTag: "beckhoff1.GVL.sensorOpen[23]", position: {x: 435, y: 42}, name: "SO_K2"},
        {windowTag: "beckhoff1.GVL.sensorOpen[24]", position: {x: 1050, y: 146}, name: "SO_K3"},
        {windowTag: "beckhoff1.GVL.sensorOpen[25]", position: {x: 1090, y: 146}, name: "SO_K4"},
        {windowTag: "beckhoff1.GVL.sensorOpen[26]", position: {x: 1150, y: 146}, name: "SO_K5"},
        {windowTag: "beckhoff1.GVL.sensorOpen[27]", position: {x: 1190, y: 146}, name: "SO_K6"}
      ],

      //Vrata
      doors: [
        {doorTag: "beckhoff.GVL.sensorOpen[28]", position: {x: 450, y: 700}, name: "SO_K7"}, //kolesarnica
      ],

      chart:[
        {tag: 'beckhoff1.HEAT.thermostatFB[13].valueTemp', label: 'ST39', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[14].valueTemp', label: 'ST42', unit: '°C'},
      ],
    }
  },

  methods: {
    
  },

  computed: {
  },

  /* mounted() {
    window.scrollTo(0, 0);
  } */


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#cards-div {
  display: flex; 
  flex-direction: column; 
  flex: 1; 
  align-items:center; 
  width: 100%; 
  height:100%; 
  /* scroll-snap-type: y mandatory;
  overflow-y: scroll; */
}

#svgCard {
  width: 95%; 
  height: 100%;
  /* scroll-snap-align: center; */
}

.outer-chart {
  padding: 0;
  margin: 0;
  margin: auto;
  width: 95%;
  height: 100%;
  /* scroll-snap-align: center; */
}


.svg-klet-tloris {
  padding: 20px;
}


</style>
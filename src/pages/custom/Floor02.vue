<template>
  <div id="cards-div">
    <svg-card>
      <svg class="svg-nadstropje-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
        <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/nadstropje1.svg'/>
        <!-- izklop vec luci -->
        <lightsOffNadstropje tagLightsOffMain="beckhoff1.LIGHT.lightsOffMain.lightsOff" tagLightsOffApartUp="beckhoff1.LIGHT.lightsOffApartUp.lightsOff" x="1000" y="80"/>
        <!-- Luci -->
        <light v-for="(light, index) in lights" :key="'lights'+index" :x="light.position.x" :y="light.position.y" :tag=light.tag :tagLightLevel=light.tagLightLevel :radius=light.radius :type=light.type :areawidth="light.areawidth" :areaheight="light.areawidth" :rectWidth=light.width :rectHeight=light.height :rotation=light.rotation />
        <svg-text v-for="(lightText, index) in lightTexts" :key="'lightText'+index" :x="lightText.position.x" :y="lightText.position.y" :tag=lightText.tag :tagLightLevel=lightText.tagLightLevel :width=lightText.width :height=lightText.height :popoverPos="lightText.popoverPos" />
        <!-- Custom luci -->
        <light-wrapper v-for="(light, index) in lightCustom" :key="'lCustom'+index" :position="light.position" :tag=light.tag :tagLightLevel=light.tagLightLevel >
          <component :is="light.type" :x="light.position.x" :y="light.position.y" :width="light.width" :height="light.height" :rotation="light.rotation" />
        </light-wrapper>
        <!-- RGB razsvetljava -->
        <rgb-light v-for="(rgbLight, index) in rgbLights" :key="'rgb'+index" :x="rgbLight.position.x" :y="rgbLight.position.y" :RGBtag="rgbLight.RGBtag" :RGBtagLevel="rgbLight.RGBtagLevel" :RGBtagRedLight="rgbLight.rgbRed" :RGBtagGreenLight="rgbLight.rgbGreen" :RGBtagBlueLight="rgbLight.rgbBlue" :rgbWidth="rgbLight.width" :rgbHeight="rgbLight.height" :areawidth="rgbLight.areawidth" :areaheight="rgbLight.areaheight" :rotation="rgbLight.rotation" />
        <rgb-text v-for="(rgbText, index) in rgbTexts" :key="'rgbText'+index" :x="rgbText.position.x" :y="rgbText.position.y" :RGBtag="rgbText.RGBtag"  :RGBtagLevel="rgbText.RGBtagLevel" :RGBtagRedLight="rgbText.rgbRed" :RGBtagGreenLight="rgbText.rgbGreen" :RGBtagBlueLight="rgbText.rgbBlue" :RGBtagLightShow="rgbText.rgbLightShow" :RGBtagLightShowCycleTime="rgbText.rgbCycle" :rgbWidth="rgbText.width" :rgbHeight="rgbText.height" :width=rgbText.width :height=rgbText.height />
        <rgb-wrapper v-for="(rgbLight, index) in rgbLightsCustom" :key="'rgbCustom'+index" :position="rgbLight.position" :RGBtag="rgbLight.RGBtag" :RGBtagLevel="rgbLight.RGBtagLevel" :RGBtagRedLight="rgbLight.rgbRed" :RGBtagGreenLight="rgbLight.rgbGreen" :RGBtagBlueLight="rgbLight.rgbBlue">
          <component :is="rgbLight.type" :x="rgbLight.position.x" :y="rgbLight.position.y" :width="rgbLight.width" :height="rgbLight.height" :rotation="rgbLight.rotation" />
        </rgb-wrapper>>
        <!-- Rolete -->
        <blind v-for="(blind, index) in blinds" :key="'blinds'+index" :x=blind.position.x :y=blind.position.y :tagSetPos=blind.tagSetPos :tagGetPos=blind.tagGetPos :blindWidth=blind.width :blindHeight=blind.height :rotation=blind.rotation />
        
        
      </svg>
    </svg-card>

    <svg-card>
      <svg class="svg-nadstropje-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
        <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/nadstropje.svg'/>
        <!-- Senzorji -->
        <sensor v-for="(sensor, index) in sensors" :key="'sensors'+index" :x=sensor.position.x :y=sensor.position.y :tagMinBrightness="sensor.tagMinBrightness" :tagOutput="sensor.tagOutput" :tagDisabled="sensor.tagDisabled" :tagBrightness="sensor.tagBrightness" :sensorWidth=sensor.width :sensorHeight=sensor.width />
        <!-- Ogrevanje -->
        <heat-valve v-for="(heatValve, index) in heatValves" :key="'heatValves'+index" :tagValveOpenReq=heatValve.tagValveOpenReq :x=heatValve.position.x :y=heatValve.position.y :heatValveWidth=heatValve.width :heatValveHeight=heatValve.height />
        <heat-thermostat v-for="(heatT,index) in heatThermostats" :key="'heatT'+index" :tagThermostatValueTemp=heatT.tagThermostatValueTemp :tagThermostatSetPoint=heatT.tagThermostatSetPoint  :x=heatT.position.x :y=heatT.position.y :thermostatWidth=heatT.width :thermostatHeight=heatT.height />
        <thermostat-error v-for="(tError, index) in thermostatErrors" :key="'tError'+index" :x=tError.position.x :y=tError.position.y :tagThermostatSensorError=tError.tagThermostatSensorError />
        <!-- Vrata -->
        <door v-for="(door, index) in doors" :key="'doors'+index" :x=door.position.x :y=door.position.y :doorTag="door.doorTag" />
        <!-- Okna -->
        <window v-for="(window, index) in windows" :key="'windows'+index" :x=window.position.x :y=window.position.y :windowTag="window.windowTag" />
      </svg>
    </svg-card>

    <div class="outer-chart justify-content-center mx-0 p-0 ml-2">
      <scada-card > <!-- class="col-xl-12" -->
          <div class="py-3">Temperature</div>
          <history-line-chart class="px-3 pb-3" :tags="chart" />
      </scada-card>
    </div>

  </div>
</template>

<script>
import ScadaElementWrapper from "../../components/app/ScadaResizableElementWrapper.vue";
import lightsOffNadstropje from "../../components/floor-plan/lightsOffNadstropje.vue";
import SvgText from '../../components/floor-plan/svg-text.vue';
import Blind from '../../components/floor-plan/Blind.vue';
import Sensor from '../../components/floor-plan/Sensor.vue';
import HeatValve from '../../components/floor-plan/HeatValve.vue';
import HeatThermostat from '../../components/floor-plan/HeatThermostat.vue';
import thermostatError from '../../components/floor-plan/thermostatError.vue';
import Door from '../../components/floor-plan/Door.vue';
import Window from '../../components/floor-plan/Window.vue';

import lights from "../../components/floor-plan/CustomLights/LightMixin.js";
import rgbLights from "../../components/floor-plan/CustomRGB/RGBMixin.js";

export default {
  name: "Floor02",
  mixins: [lights, rgbLights],
  components: {
    "scada-element-wrapper": ScadaElementWrapper,
    "lightsOffNadstropje": lightsOffNadstropje,
    "svg-text": SvgText,
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
        {tag: "beckhoff1.LIGHT.light[50].state", tagLightLevel: "beckhoff1.LIGHT.light[50].savedLVL", name:"50", position: { x: 1280, y: 520 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[50].state", tagLightLevel: "beckhoff1.LIGHT.light[50].savedLVL", name:"50", position: { x: 1350, y: 510 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[52].state", tagLightLevel: "beckhoff1.LIGHT.light[52].savedLVL", name:"52", position: { x: 1180, y: 670 }, radius: 15},
        {tag: "beckhoff1.LIGHT.light[52].state", tagLightLevel: "beckhoff1.LIGHT.light[52].savedLVL", name:"52", position: { x: 1210, y: 720 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[54].state", tagLightLevel: "beckhoff1.LIGHT.light[54].savedLVL", name:"54", position: { x: 1240, y: 600 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[55].state", tagLightLevel: "beckhoff1.LIGHT.light[55].savedLVL", name:"55", position: { x: 1360, y: 600 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[56].state", tagLightLevel: "beckhoff1.LIGHT.light[56].savedLVL", name:"56", position: { x: 1020, y: 730 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[59].state", tagLightLevel: "beckhoff1.LIGHT.light[59].savedLVL", name:"59", position: { x: 1460, y: 315 }, radius: 8},
        {tag: "beckhoff1.LIGHT.light[60].state", tagLightLevel: "beckhoff1.LIGHT.light[60].savedLVL", name:"60", position: { x: 890, y: 305 }, radius: 12},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 450 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 485 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 520 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 555 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 590 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 625 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 660 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 552, y: 695 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 450 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 485 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 520 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 555 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 590 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 625 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 660 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 603, y: 695 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[66].state", tagLightLevel: "beckhoff1.LIGHT.light[66].savedLVL", name:"66", position: { x: 460, y: 280 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[66].state", tagLightLevel: "beckhoff1.LIGHT.light[66].savedLVL", name:"66", position: { x: 460, y: 350 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[67].state", tagLightLevel: "beckhoff1.LIGHT.light[67].savedLVL", name:"67", position: { x: 560, y: 80 }, radius: 15},
        {tag: "beckhoff1.LIGHT.light[67].state", tagLightLevel: "beckhoff1.LIGHT.light[67].savedLVL", name:"67", position: { x: 600, y:110 }, radius: 12},
        {tag: "beckhoff1.LIGHT.light[68].state", tagLightLevel: "beckhoff1.LIGHT.light[68].savedLVL", name:"68", position: { x: 650, y:30 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[69].state", tagLightLevel: "beckhoff1.LIGHT.light[69].savedLVL", name:"69", position: { x: 675, y:260 }, radius: 8},
        {tag: "beckhoff1.LIGHT.light[70].state", tagLightLevel: "beckhoff1.LIGHT.light[70].savedLVL", name:"70", position: { x: 250, y: 530 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[70].state", tagLightLevel: "beckhoff1.LIGHT.light[70].savedLVL", name:"70", position: { x: 250, y: 460 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[70].state", tagLightLevel: "beckhoff1.LIGHT.light[70].savedLVL", name:"70", position: { x: 420, y: 450 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[70].state", tagLightLevel: "beckhoff1.LIGHT.light[70].savedLVL", name:"70", position: { x: 400, y: 550 }, type: "rect", width: 35, height: 12},

        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 240, y: 695 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 425, y: 695 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 330, y: 780 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 230, y: 790 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 415, y: 790 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 505, y: 790 }, type: "rect", width: 35, height: 12},

        {tag: "beckhoff1.LIGHT.light[73].state", tagLightLevel: "beckhoff1.LIGHT.light[73].savedLVL", name:"73", position: { x: 550, y: 722 }, radius: 12, areawidth: 70, areaheight:70},
        {tag: "beckhoff1.LIGHT.light[74].state", tagLightLevel: "beckhoff1.LIGHT.light[74].savedLVL", name:"74", position: { x: 155, y: 500 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[75].state", tagLightLevel: "beckhoff1.LIGHT.light[75].savedLVL", name:"75", position: { x: 60, y: 470 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[76].state", tagLightLevel: "beckhoff1.LIGHT.light[76].savedLVL", name:"76", position: { x: 240, y: 290 }, type: "rect", width: 12, height: 35},
        {tag: "beckhoff1.LIGHT.light[76].state", tagLightLevel: "beckhoff1.LIGHT.light[76].savedLVL", name:"76", position: { x: 340, y: 290 }, type: "rect", width: 35, height: 12},
        {tag: "beckhoff1.LIGHT.light[77].state", tagLightLevel: "beckhoff1.LIGHT.light[77].savedLVL", name:"77", position: { x: 255, y: 235 }, type: "rect", width: 95, height: 8},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 230, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 265, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 300, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 335, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 370, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 405, y: 380 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[80].state", tagLightLevel: "beckhoff1.LIGHT.light[80].savedLVL", name:"80", position: { x: 173, y: 195 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[80].state", tagLightLevel: "beckhoff1.LIGHT.light[80].savedLVL", name:"80", position: { x: 173, y: 150 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[82].state", tagLightLevel: "beckhoff1.LIGHT.light[82].savedLVL", name:"82", position: { x: 385, y: 140 }, type: "rect", width: 8, height: 25},
        {tag: "beckhoff1.LIGHT.light[83].state", tagLightLevel: "beckhoff1.LIGHT.light[83].savedLVL", name:"83", position: { x: 350, y: 70 }, type: "rect", width: 80, height: 8},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1060, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1090, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1120, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1150, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1180, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1210, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1240, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1270, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1300, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1330, y: 310 }, type: "rect", width: 8, height: 8, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[85].state", tagLightLevel: "beckhoff1.LIGHT.light[85].savedLVL", name:"85", position: { x: 1090, y: 400 }, type: "rect", width: 20, height: 8},
        {tag: "beckhoff1.LIGHT.light[85].state", tagLightLevel: "beckhoff1.LIGHT.light[85].savedLVL", name:"85", position: { x: 1180, y: 390 }, type: "rect", width: 8, height: 20},
        {tag: "beckhoff1.LIGHT.light[85].state", tagLightLevel: "beckhoff1.LIGHT.light[85].savedLVL", name:"85", position: { x: 1250, y: 400 }, type: "rect", width: 20, height: 8},
        {tag: "beckhoff1.LIGHT.light[85].state", tagLightLevel: "beckhoff1.LIGHT.light[85].savedLVL", name:"85", position: { x: 1340, y: 390 }, type: "rect", width: 8, height: 20},
        {tag: "beckhoff1.LIGHT.light[87].state", tagLightLevel: "beckhoff1.LIGHT.light[87].savedLVL", name:"87", position: { x: 1080, y: 500 }, type: "rect", width: 8, height: 20},
        {tag: "beckhoff1.LIGHT.light[87].state", tagLightLevel: "beckhoff1.LIGHT.light[87].savedLVL", name:"87", position: { x: 1140, y: 500 }, type: "rect", width: 20, height: 8},
        {tag: "beckhoff1.LIGHT.light[88].state", tagLightLevel: "beckhoff1.LIGHT.light[88].savedLVL", name:"88", position: { x: 1130, y: 575 }, type: "rect", width: 95, height: 8},
        {tag: "beckhoff1.LIGHT.light[90].state", tagLightLevel: "beckhoff1.LIGHT.light[90].savedLVL", name:"90", position: { x: 250, y: 610 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[91].state", tagLightLevel: "beckhoff1.LIGHT.light[91].savedLVL", name:"91", position: { x: 390, y: 610 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[93].state", tagLightLevel: "beckhoff1.LIGHT.light[93].savedLVL", name:"93", position: { x: 1280, y: 455 }, type: "rect", width: 75, height: 8},
        {tag: "beckhoff1.LIGHT.light[94].state", tagLightLevel: "beckhoff1.LIGHT.light[94].savedLVL", name:"94", position: { x: 270, y: 150 }, type: "rect", width: 35, height: 12},

      ],
      lightTexts: [
        {tag: "beckhoff1.LIGHT.light[50].state", tagLightLevel: "beckhoff1.LIGHT.light[50].savedLVL", name:"50", position: { x: 1400, y: 540 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[52].state", tagLightLevel: "beckhoff1.LIGHT.light[52].savedLVL", name:"52", position: { x: 1180, y: 775 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[54].state", tagLightLevel: "beckhoff1.LIGHT.light[54].savedLVL", name:"54", position: { x: 1270, y: 700 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[55].state", tagLightLevel: "beckhoff1.LIGHT.light[55].savedLVL", name:"55", position: { x: 1390, y: 700 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[56].state", tagLightLevel: "beckhoff1.LIGHT.light[56].savedLVL", name:"56", position: { x: 1070, y: 740 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[59].state", tagLightLevel: "beckhoff1.LIGHT.light[59].savedLVL", name:"59", position: { x: 1500, y: 410 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[60].state", tagLightLevel: "beckhoff1.LIGHT.light[60].savedLVL", name:"60", position: { x: 975, y: 360 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 830, y: 595 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[63].state", tagLightLevel: "beckhoff1.LIGHT.light[63].savedLVL", name:"63", position: { x: 800, y: 495 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[64].state", tagLightLevel: "beckhoff1.LIGHT.light[64].savedLVL", name:"64", position: { x: 535, y: 575 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[65].state", tagLightLevel: "beckhoff1.LIGHT.light[65].savedLVL", name:"65", position: { x: 635, y: 740 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[66].state", tagLightLevel: "beckhoff1.LIGHT.light[66].savedLVL", name:"66", position: { x: 490, y: 325 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[67].state", tagLightLevel: "beckhoff1.LIGHT.light[67].savedLVL", name:"67", position: { x: 570, y: 180 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[69].state", tagLightLevel: "beckhoff1.LIGHT.light[69].savedLVL", name:"69", position: { x: 705, y: 360 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[68].state", tagLightLevel: "beckhoff1.LIGHT.light[68].savedLVL", name:"68", position: { x: 700, y: 130 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[70].state", tagLightLevel: "beckhoff1.LIGHT.light[70].savedLVL", name:"70", position: { x: 350, y: 520 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[72].state", tagLightLevel: "beckhoff1.LIGHT.light[72].savedLVL", name:"72", position: { x: 350, y: 750 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[73].state", tagLightLevel: "beckhoff1.LIGHT.light[73].savedLVL", name:"73", position: { x: 510, y: 765 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[74].state", tagLightLevel: "beckhoff1.LIGHT.light[74].savedLVL", name:"74", position: { x: 190, y: 510 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[75].state", tagLightLevel: "beckhoff1.LIGHT.light[75].savedLVL", name:"75", position: { x: 90, y: 570 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[76].state", tagLightLevel: "beckhoff1.LIGHT.light[76].savedLVL", name:"76", position: { x: 320, y: 330 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[77].state", tagLightLevel: "beckhoff1.LIGHT.light[77].savedLVL", name:"77", position: { x: 300, y: 275 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[78].state", tagLightLevel: "beckhoff1.LIGHT.light[78].savedLVL", name:"78", position: { x: 350, y: 430 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[79].state", tagLightLevel: "beckhoff1.LIGHT.light[79].savedLVL", name:"79", position: { x: 25, y: 340 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[80].state", tagLightLevel: "beckhoff1.LIGHT.light[80].savedLVL", name:"80", position: { x: 250, y: 180 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[82].state", tagLightLevel: "beckhoff1.LIGHT.light[82].savedLVL", name:"82", position: { x: 380, y: 130 }, width: 100, height: 100, popoverPos: "left"},
        {tag: "beckhoff1.LIGHT.light[83].state", tagLightLevel: "beckhoff1.LIGHT.light[83].savedLVL", name:"83", position: { x: 420, y: 110 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[84].state", tagLightLevel: "beckhoff1.LIGHT.light[84].savedLVL", name:"84", position: { x: 1190, y: 360 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[85].state", tagLightLevel: "beckhoff1.LIGHT.light[85].savedLVL", name:"85", position: { x: 1245, y: 385 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[87].state", tagLightLevel: "beckhoff1.LIGHT.light[87].savedLVL", name:"87", position: { x: 1130, y: 480 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[88].state", tagLightLevel: "beckhoff1.LIGHT.light[88].savedLVL", name:"88", position: { x: 1190, y: 555 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[90].state", tagLightLevel: "beckhoff1.LIGHT.light[90].savedLVL", name:"90", position: { x: 225, y: 670 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[91].state", tagLightLevel: "beckhoff1.LIGHT.light[91].savedLVL", name:"91", position: { x: 485, y: 670 }, width: 100, height: 100},        
        {tag: "beckhoff1.LIGHT.light[93].state", tagLightLevel: "beckhoff1.LIGHT.light[93].savedLVL", name:"93", position: { x: 1405, y: 470 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[94].state", tagLightLevel: "beckhoff1.LIGHT.light[94].savedLVL", name:"94", position: { x: 305, y: 120 }, width: 100, height: 100, popoverPos: "left"},
      ],

      lightCustom: [
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 490, y: 390 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 690, y: 390 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 690, y: 510 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 690, y: 610 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 690, y: 710 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 870, y: 390 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 870, y: 510 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 870, y: 610 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[62].state", tagLightLevel: "beckhoff1.LIGHT.light[62].savedLVL", name:"62", position: { x: 870, y: 710 }, width: 200, height: 200, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[63].state", tagLightLevel: "beckhoff1.LIGHT.light[63].savedLVL", name:"63", position: { x: 670, y: 400 }, width: 150, height: 150, type: "upper-table-light"},
        {tag: "beckhoff1.LIGHT.light[79].state", tagLightLevel: "beckhoff1.LIGHT.light[79].savedLVL", name:"79", position: { x: -13, y: 240 }, width: 100, height: 100, type: "rotated-seven", rotation: 55},
      ],

      rgbLights: [
        {RGBtag: "beckhoff1.LIGHT.light[86].state", RGBtagLevel: "beckhoff1.LIGHT.light[86].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[7].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[7].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[7].blueLight", name: "86-7(RGB)", position: {x: 1430, y: 345}, width: 102, height: 5, areawidth: 130, areaheight: 130, rotation: -90},
        {RGBtag: "beckhoff1.LIGHT.light[51].state", RGBtagLevel: "beckhoff1.LIGHT.light[51].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[6].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[6].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[6].blueLight", name: "51-6(RGB)", position: {x: 1230, y: 605}, width: 155, height: 5, areawidth: 120, areaheight: 120},
        {RGBtag: "beckhoff1.LIGHT.light[61].state", RGBtagLevel: "beckhoff1.LIGHT.light[61].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[8].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[8].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[8].blueLight",name: "61-8(RGB)", position: {x: 750, y: 315}, width: 255, height: 6,areawidth: 100,areaheight: 100},
        {RGBtag: "beckhoff1.LIGHT.light[81].state", RGBtagLevel: "beckhoff1.LIGHT.light[81].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[9].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[9].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[9].blueLight",name: "81-9(RGB)", position: {x: -5, y: 198}, width: 168, height: 6,areawidth: 100,areaheight: 100},
      ],

      rgbTexts: [
        {RGBtag: "beckhoff1.LIGHT.light[86].state", RGBtagLevel: "beckhoff1.LIGHT.light[86].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[7].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[7].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[7].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[7].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[7].lightShowCycleTime",name: "86-7(RGB)", position: {x: 1430, y: 250},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[51].state", RGBtagLevel: "beckhoff1.LIGHT.light[51].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[6].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[6].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[6].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[6].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[6].lightShowCycleTime",name: "51-6(RGB)", position: {x: 1295, y: 560},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[61].state", RGBtagLevel: "beckhoff1.LIGHT.light[61].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[8].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[8].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[8].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[8].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[8].lightShowCycleTime",name: "61-8(RGB)", position: {x: 800, y: 340},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[81].state", RGBtagLevel: "beckhoff1.LIGHT.light[81].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[9].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[9].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[9].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[9].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[9].lightShowCycleTime",name: "81-9(RGB)", position: {x: 60, y: 150},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[53].state", RGBtagLevel: "beckhoff1.LIGHT.light[53].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[5].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[5].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[5].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[5].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[5].lightShowCycleTime",name: "53-5(RGB)", position: {x: 1360, y: 785},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[71].state", RGBtagLevel: "beckhoff1.LIGHT.light[71].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[4].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[4].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[4].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[4].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[4].lightShowCycleTime",name: "71-4(RGB)", position: {x: 115, y: 830},width: 100, height: 100}

      ],

      rgbLightsCustom: [
        {RGBtag: "beckhoff1.LIGHT.light[53].state", RGBtagLevel: "beckhoff1.LIGHT.light[53].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[5].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[5].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[5].blueLight",name: "53-5(RGB)", position: {x: 1050, y: 628}, type: "ground-corner"},
        {RGBtag: "beckhoff1.LIGHT.light[71].state", RGBtagLevel: "beckhoff1.LIGHT.light[71].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[4].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[4].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[4].blueLight",name: "71-4(RGB)", position: {x: 212, y: 600}, type: "bedroom-corner"},
      ],

      //Zaluzije
      blinds: [
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[8].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[8].position", name: "Z9(rolo)", position: { x: 1438, y: 574 }, width: 100, height: 15, rotation: -90},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[9].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[9].position", name: "Z10(rolo)", position: { x: 475, y: 33 }, width: 60, height: 15},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[16].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[16].position", name: "Z17(rolo)", position: { x: 148, y: 605 }, width: 150, height: 15, rotation: -90},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[20].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[20].position", name: "Z21(rolo)", position: { x: 749, y: 195 }, width: 60, height: 15, rotation: -90},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[21].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[21].position", name: "ZAV1", position: { x: 1020, y: 866 }, width: 330, height: 15, rotation: -180},      
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[22].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[22].position", name: "ZAV2", position: { x: 763, y: 270 }, width: 257, height: 13},  
      ],

      //Senzorji
      sensors: [
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[12].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[12].output", tagDisabled:"beckhoff1.SENSOR.sensor[12].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[12].brightness", name:"SG13", position: {x: 380, y: 700}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[13].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[13].output", tagDisabled:"beckhoff1.SENSOR.sensor[13].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[13].brightness", name:"SG14", position: {x: 380, y: 500}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[14].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[14].output", tagDisabled:"beckhoff1.SENSOR.sensor[14].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[14].brightness", name:"SG15", position: {x: 300, y: 300}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[15].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[15].output", tagDisabled:"beckhoff1.SENSOR.sensor[15].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[15].brightness", name:"SG16", position: {x: 300, y: 70}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[16].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[16].output", tagDisabled:"beckhoff1.SENSOR.sensor[16].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[16].brightness", name:"SG17", position: {x: 400, y: 130}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[17].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[17].output", tagDisabled:"beckhoff1.SENSOR.sensor[17].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[17].brightness", name:"SG18", position: {x: 500, y: 100}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[18].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[18].output", tagDisabled:"beckhoff1.SENSOR.sensor[18].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[18].brightness", name:"SG19", position: {x: 550, y: 370}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[19].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[19].output", tagDisabled:"beckhoff1.SENSOR.sensor[19].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[19].brightness", name:"SG20", position: {x: 795, y: 395}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[20].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[20].output", tagDisabled:"beckhoff1.SENSOR.sensor[20].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[20].brightness", name:"SG21", position: {x: 1250, y: 370}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[21].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[21].output", tagDisabled:"beckhoff1.SENSOR.sensor[21].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[21].brightness", name:"SG22", position: {x: 1070, y: 465}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[22].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[22].output", tagDisabled:"beckhoff1.SENSOR.sensor[22].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[22].brightness", name:"SG23", position: {x: 1380, y: 465}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[23].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[23].output", tagDisabled:"beckhoff1.SENSOR.sensor[23].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[23].brightness", name:"SG24", position: {x: 1230, y: 695}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[33].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[33].output", tagDisabled:"beckhoff1.SENSOR.sensor[33].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[33].brightness", name:"SG?", position: {x: 705, y: 295}, width: 80, height: 80},
      ],

      //Ogrevanje
      heatValves: [
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[8].valveOpenReq", name:"K117", position: {x: 580, y:100}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[10].valveOpenReq", name:"K118", position: {x: 270, y:480}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[10].valveOpenReq", name:"K119", position: {x: 270, y:680}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[9].valveOpenReq", name:"K120", position: {x: 240, y:120}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[9].valveOpenReq", name:"K120", position: {x: 380, y:60}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[12].valveOpenReq", name:"K122", position: {x: 1130, y:485}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[12].valveOpenReq", name:"K122", position: {x: 1130, y:685}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[11].valveOpenReq", name:"K123", position: {x: 1310, y:500}, width: 80, height: 80},

        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[11].valveOpenReq", name:"K124", position: {x: 1340, y:555}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[0].valveOpenReq", name:"K125", position: {x: 1160, y:365}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[7].valveOpenReq", name:"K126", position: {x: 720, y:430}, width: 80, height: 80},


      ],
      heatThermostats: [
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[7].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[7].setPoint", name:"ST25", position: {x: 470, y: 420}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[8].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[8].setPoint", name:"ST26", position: {x: 540, y: 200}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[9].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[9].setPoint", name:"ST30", position: {x: 220, y: 240}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[10].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[10].setPoint", name:"ST36", position: {x: 230, y: 660}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[11].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[11].setPoint", name:"ST46", position: {x: 1270, y: 470}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[12].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[12].setPoint", name:"ST48", position: {x: 1055, y: 615}, width: 100, height: 100},

      ],
      thermostatErrors: [
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[7].sensorError", name: "ST25", position: {x: 470, y: 355}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[8].sensorError", name: "ST26", position: {x: 595, y: 170}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[9].sensorError", name: "ST30", position: {x: 220, y: 245}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[10].sensorError", name: "ST36", position: {x: 230, y: 665}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[11].sensorError", name: "ST46", position: {x: 1270, y: 475}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[12].sensorError", name: "ST48", position: {x: 1055, y: 550}},


      ],

      //Vrata
      doors: [
        {doorTag: "beckhoff1.GVL.sensorOpen[0]", position: {x: 1456, y: 325}, name: "SO_N1"}, //vhod v hiso (del za apartma), pri stolpnicah
      ],

      //Okna
      windows: [
        {windowTag: "beckhoff1.GVL.sensorOpen[7]", position: {x: 166, y: 515}, name: "SO_N10"}, //desno v kuhinji pri aparatu za kavo
        {windowTag: "beckhoff1.GVL.sensorOpen[8]", position: {x: 520, y: 50}, name: "SO_N12"}, //okno pri vhodu v sobo z pralnimi stroji, pri stolpnicah
        {windowTag: "beckhoff1.GVL.sensorOpen[9]", position: {x: 766, y: 145}, name: "SO_N13"}, //v sobi z pralnimi stroji
        {windowTag: "beckhoff1.GVL.sensorOpen[6]", position: {x: 270, y: 839}, name: "SO_N9"}, //okno v spalnici
        {windowTag: "beckhoff1.GVL.sensorOpen[5]", position: {x: 500, y: 839}, name: "SO_N8"}, //okno v spalnici
        {windowTag: "beckhoff1.GVL.sensorOpen[4]", position: {x: 1110, y: 839}, name: "SO_N5"}, //okno v spalnici v apartmanu (jug)
        {windowTag: "beckhoff1.GVL.sensorOpen[3]", position: {x: 1300, y: 839}, name: "SO_N4"}, //okno v spalnici v apartmanu (jug)
        {windowTag: "beckhoff1.GVL.sensorOpen[2]", position: {x: 1456, y: 790}, name: "SO_N3"}, //okno v spalnici v apartmanu (vzhod)
        {windowTag: "beckhoff1.GVL.sensorOpen[1]", position: {x: 1456, y: 510}, name: "SO_N2"}, //okno v kopalnici v apartmanu
      ],


      chart:[
        {tag: 'beckhoff1.HEAT.thermostatFB[7].valueTemp', label: 'ST25', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[8].valueTemp', label: 'ST26', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[9].valueTemp', label: 'ST30', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[10].valueTemp', label: 'ST36', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[11].valueTemp', label: 'ST46', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[12].valueTemp', label: 'ST48', unit: '°C'},
      ],
    }
  },


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

.svg-nadstropje-tloris {
  padding: 20px;
}


</style>
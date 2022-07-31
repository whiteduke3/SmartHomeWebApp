<template>
  <div id="cards-div">
      <svg-card>
        <svg class="svg-pritlicje-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
          <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/pritlicje1.svg'/>
          <!-- izklop vec luci -->
          <lightsOffPritlicje tagLightsOffMain="beckhoff1.LIGHT.lightsOffMain.lightsOff" tagLightsOffApartDown="beckhoff1.LIGHT.lightsOffApartDown.lightsOff" x="1000" y="50"/>
          <!-- Luci -->
          <light v-for="(light, index) in lights" :key="'lights'+index" :x="light.position.x" :y="light.position.y" :tag=light.tag :tagLightLevel=light.tagLightLevel :radius=light.radius :type=light.type :areawidth="light.areawidth" :areaheight="light.areawidth" :rectWidth=light.width :rectHeight=light.height :rotation=light.rotation />
          <svg-text v-for="(lightText, index) in lightTexts" :key="'lightText'+index" :x="lightText.position.x" :y="lightText.position.y" :tag=lightText.tag :tagLightLevel=lightText.tagLightLevel :width=lightText.width :height=lightText.height :popoverPos="lightText.popoverPos" />
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
        <svg class="svg-pritlicje-tloris" width="100%" height="100%" viewBox="0 0 1600 900">
          <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" href='../../assets/floor-plan/svg/pritlicje.svg'/>
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

      <div class="outer-chart justify-content-center mx-0 ml-2 p-0">
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
  name: "Floor01",
  mixins: [lights, rgbLights],
  components: {
    "scada-element-wrapper": ScadaElementWrapper,
    "lightsOffPritlicje": lightsOffPritlicje,
    "svg-text": SvgText,
    "blind": Blind,
    "sensor": Sensor,
    "heat-valve": HeatValve,
    "heat-thermostat": HeatThermostat,
    "thermostat-error": thermostatError,
    "door": Door,
    "window": Window
  },
  data() {
    return {
      //Razsvetljava
      lights:[
        {tag: "beckhoff1.LIGHT.light[19].state", tagLightLevel: "beckhoff1.LIGHT.light[19].savedLVL", name:"19", position: { x: 1460, y: 315 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[20].state", tagLightLevel: "beckhoff1.LIGHT.light[20].savedLVL", name:"20", position: { x: 1320, y: 385 }, type: "rect", width: 6, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[20].state", tagLightLevel: "beckhoff1.LIGHT.light[20].savedLVL", name:"20", position: { x: 1240, y: 400 }, type: "rect", width: 20, height: 6, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[20].state", tagLightLevel: "beckhoff1.LIGHT.light[20].savedLVL", name:"20", position: { x: 1165, y: 385 }, type: "rect", width: 6, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[20].state", tagLightLevel: "beckhoff1.LIGHT.light[20].savedLVL", name:"20", position: { x: 1080, y: 400 }, type: "rect", width: 20, height: 6, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[21].state", tagLightLevel: "beckhoff1.LIGHT.light[21].savedLVL", name:"21", position: { x: 1080, y: 500 }, type: "rect", width: 8, height: 20},
        {tag: "beckhoff1.LIGHT.light[21].state", tagLightLevel: "beckhoff1.LIGHT.light[21].savedLVL", name:"21", position: { x: 1140, y: 500 }, type: "rect", width: 20, height: 8},
        {tag: "beckhoff1.LIGHT.light[22].state", tagLightLevel: "beckhoff1.LIGHT.light[22].savedLVL", name:"22", position: { x: 1130, y: 580 }, type: "rect", width: 95, height: 8},
        {tag: "beckhoff1.LIGHT.light[23].state", tagLightLevel: "beckhoff1.LIGHT.light[23].savedLVL", name:"23", position: { x: 1280, y: 455 }, type: "rect", width: 80, height: 8},
        {tag: "beckhoff1.LIGHT.light[24].state", tagLightLevel: "beckhoff1.LIGHT.light[24].savedLVL", name:"24", position: { x: 1280, y: 520 }, type: "rect", width: 35, height: 8},
        {tag: "beckhoff1.LIGHT.light[24].state", tagLightLevel: "beckhoff1.LIGHT.light[24].savedLVL", name:"24", position: { x: 1350, y: 510 }, type: "rect", width: 8, height: 35},
        {tag: "beckhoff1.LIGHT.light[25].state", tagLightLevel: "beckhoff1.LIGHT.light[25].savedLVL", name:"25", position: { x: 1180, y: 670 }, radius: 17},
        {tag: "beckhoff1.LIGHT.light[25].state", tagLightLevel: "beckhoff1.LIGHT.light[25].savedLVL", name:"25", position: { x: 1220, y: 720 }, radius: 12},
        {tag: "beckhoff1.LIGHT.light[26].state", tagLightLevel: "beckhoff1.LIGHT.light[26].savedLVL", name:"26", position: { x: 1240, y: 600 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[27].state", tagLightLevel: "beckhoff1.LIGHT.light[27].savedLVL", name:"27", position: { x: 1360, y: 600 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[29].state", tagLightLevel: "beckhoff1.LIGHT.light[29].savedLVL", name:"29", position: { x: 1015, y: 730 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 460, y: 690 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 460, y: 620 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 460, y: 550 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 460, y: 480 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[34].state", tagLightLevel: "beckhoff1.LIGHT.light[34].savedLVL", name:"34", position: { x: 200, y: 610 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[34].state", tagLightLevel: "beckhoff1.LIGHT.light[34].savedLVL", name:"34", position: { x: 200, y: 680 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[34].state", tagLightLevel: "beckhoff1.LIGHT.light[34].savedLVL", name:"34", position: { x: 200, y: 750 }, type: "rect", width: 8, height: 20, areawidth: 120, areaheight:120},
        {tag: "beckhoff1.LIGHT.light[35].state", tagLightLevel: "beckhoff1.LIGHT.light[35].savedLVL", name:"35", position: { x: 475, y: 260 }, type: "rect", width: 8, height: 30},
        {tag: "beckhoff1.LIGHT.light[35].state", tagLightLevel: "beckhoff1.LIGHT.light[35].savedLVL", name:"35", position: { x: 465, y: 190 }, type: "rect", width: 30, height: 8},
        {tag: "beckhoff1.LIGHT.light[35].state", tagLightLevel: "beckhoff1.LIGHT.light[35].savedLVL", name:"35", position: { x: 475, y: 100 }, type: "rect", width: 8, height: 30},
        {tag: "beckhoff1.LIGHT.light[37].state", tagLightLevel: "beckhoff1.LIGHT.light[37].savedLVL", name:"37", position: { x: 340, y: 180 }, type: "rect", width: 30, height: 8},
        {tag: "beckhoff1.LIGHT.light[37].state", tagLightLevel: "beckhoff1.LIGHT.light[37].savedLVL", name:"37", position: { x: 290, y: 147 }, type: "rect", width: 8, height: 65},
        {tag: "beckhoff1.LIGHT.light[38].state", tagLightLevel: "beckhoff1.LIGHT.light[38].savedLVL", name:"38", position: { x: 610, y: 80 }, radius: 12},
        {tag: "beckhoff1.LIGHT.light[39].state", tagLightLevel: "beckhoff1.LIGHT.light[39].savedLVL", name:"39", position: { x: 678, y: 245 }, radius: 8},
        {tag: "beckhoff1.LIGHT.light[41].state", tagLightLevel: "beckhoff1.LIGHT.light[41].savedLVL", name:"41", position: { x: 200, y: 120 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[41].state", tagLightLevel: "beckhoff1.LIGHT.light[41].savedLVL", name:"41", position: { x: 200, y: 50 }, radius: 10},
        {tag: "beckhoff1.LIGHT.light[42].state", tagLightLevel: "beckhoff1.LIGHT.light[42].savedLVL", name:"42", position: { x: 130, y: 130 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[42].state", tagLightLevel: "beckhoff1.LIGHT.light[42].savedLVL", name:"42", position: { x: 130, y: 80 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[42].state", tagLightLevel: "beckhoff1.LIGHT.light[42].savedLVL", name:"42", position: { x: 130, y: 30 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[43].state", tagLightLevel: "beckhoff1.LIGHT.light[43].savedLVL", name:"43", position: { x: 60, y: 210 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[43].state", tagLightLevel: "beckhoff1.LIGHT.light[43].savedLVL", name:"43", position: { x: 60, y: 470 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[44].state", tagLightLevel: "beckhoff1.LIGHT.light[44].savedLVL", name:"44", position: { x: 1310, y: 270 }, type: "rect", width: 10, height: 10, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[44].state", tagLightLevel: "beckhoff1.LIGHT.light[44].savedLVL", name:"44", position: { x: 1190, y: 270 }, type: "rect", width: 10, height: 10, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[44].state", tagLightLevel: "beckhoff1.LIGHT.light[44].savedLVL", name:"44", position: { x: 1070, y: 270 }, type: "rect", width: 10, height: 10, areawidth: 140, areaheight:140},
        {tag: "beckhoff1.LIGHT.light[45].state", tagLightLevel: "beckhoff1.LIGHT.light[45].savedLVL", name:"45", position: { x: 745, y: 190 }, type: "rect", width: 6, height: 45, areawidth: 120, areaheight:100},
        {tag: "beckhoff1.LIGHT.light[45].state", tagLightLevel: "beckhoff1.LIGHT.light[45].savedLVL", name:"45", position: { x: 745, y: 55 }, type: "rect", width: 6, height: 45, areawidth: 120, areaheight:100},
        {tag: "beckhoff1.LIGHT.light[46].state", tagLightLevel: "beckhoff1.LIGHT.light[46].savedLVL", name:"46", position: { x: 335, y: 410 }, type: "rect", width: 95, height: 8},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 1340, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 1090, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 890, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 670, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 460, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 230, y: 830 }, radius: 6},
        {tag: "beckhoff1.LIGHT.light[95].state", tagLightLevel: "beckhoff1.LIGHT.light[95].savedLVL", name:"95", position: { x: 168, y: 440 }, type: "rect", width: 8, height: 150},
      ],
      lightTexts: [
        {tag: "beckhoff1.LIGHT.light[19].state", tagLightLevel: "beckhoff1.LIGHT.light[19].savedLVL", name:"19", position: { x: 1490, y: 410 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[20].state", tagLightLevel: "beckhoff1.LIGHT.light[20].savedLVL", name:"20", position: { x: 1220, y: 435 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[21].state", tagLightLevel: "beckhoff1.LIGHT.light[21].savedLVL", name:"21", position: { x: 1120, y: 475 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[22].state", tagLightLevel: "beckhoff1.LIGHT.light[22].savedLVL", name:"22", position: { x: 1190, y: 560 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[23].state", tagLightLevel: "beckhoff1.LIGHT.light[23].savedLVL", name:"23", position: { x: 1405, y: 475 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[24].state", tagLightLevel: "beckhoff1.LIGHT.light[24].savedLVL", name:"24", position: { x: 1400, y: 540 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[25].state", tagLightLevel: "beckhoff1.LIGHT.light[25].savedLVL", name:"25", position: { x: 1180, y: 770 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[26].state", tagLightLevel: "beckhoff1.LIGHT.light[26].savedLVL", name:"26", position: { x: 1275, y: 695 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[27].state", tagLightLevel: "beckhoff1.LIGHT.light[27].savedLVL", name:"27", position: { x: 1390, y: 695 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[29].state", tagLightLevel: "beckhoff1.LIGHT.light[29].savedLVL", name:"29", position: { x: 1070, y: 740 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[30].state", tagLightLevel: "beckhoff1.LIGHT.light[30].savedLVL", name:"30", position: { x: 800, y: 440 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 530, y: 600 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 330, y: 585 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[33].state", tagLightLevel: "beckhoff1.LIGHT.light[33].savedLVL", name:"33", position: { x: 360, y: 660 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[34].state", tagLightLevel: "beckhoff1.LIGHT.light[34].savedLVL", name:"34", position: { x: 270, y: 780 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[35].state", tagLightLevel: "beckhoff1.LIGHT.light[35].savedLVL", name:"35", position: { x: 495, y: 170 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[36].state", tagLightLevel: "beckhoff1.LIGHT.light[36].savedLVL", name:"36", position: { x: 360, y: 355 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[37].state", tagLightLevel: "beckhoff1.LIGHT.light[37].savedLVL", name:"37", position: { x: 360, y: 162 }, width: 100, height: 100, popoverPos: "right"},
        {tag: "beckhoff1.LIGHT.light[38].state", tagLightLevel: "beckhoff1.LIGHT.light[38].savedLVL", name:"38", position: { x: 640, y: 180 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[39].state", tagLightLevel: "beckhoff1.LIGHT.light[39].savedLVL", name:"39", position: { x: 710, y: 340 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[40].state", tagLightLevel: "beckhoff1.LIGHT.light[40].savedLVL", name:"40", position: { x: 350, y: 108 }, width: 100, height: 100, popoverPos: "right"},
        {tag: "beckhoff1.LIGHT.light[41].state", tagLightLevel: "beckhoff1.LIGHT.light[41].savedLVL", name:"41", position: { x: 280, y: 85 }, width: 100, height: 100, popoverPos: "right"},
        {tag: "beckhoff1.LIGHT.light[42].state", tagLightLevel: "beckhoff1.LIGHT.light[42].savedLVL", name:"42", position: { x: 110, y: 140 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[43].state", tagLightLevel: "beckhoff1.LIGHT.light[43].savedLVL", name:"43", position: { x: 40, y: 410 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[44].state", tagLightLevel: "beckhoff1.LIGHT.light[44].savedLVL", name:"44", position: { x: 1220, y: 230 }, width: 100, height: 100, popoverPos: "top"},
        {tag: "beckhoff1.LIGHT.light[45].state", tagLightLevel: "beckhoff1.LIGHT.light[45].savedLVL", name:"45", position: { x: 820, y: 160 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[46].state", tagLightLevel: "beckhoff1.LIGHT.light[46].savedLVL", name:"46", position: { x: 285, y: 420 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[49].state", tagLightLevel: "beckhoff1.LIGHT.light[49].savedLVL", name:"49", position: { x: 805, y: 895 }, width: 100, height: 100},
        {tag: "beckhoff1.LIGHT.light[95].state", tagLightLevel: "beckhoff1.LIGHT.light[95].savedLVL", name:"95", position: { x: 215, y: 580 }, width: 100, height: 100},
      ],

      lightCustom: [
        {tag: "beckhoff1.LIGHT.light[30].state", tagLightLevel: "beckhoff1.LIGHT.light[30].savedLVL", name:"30", position: { x: 880, y: 400 }, width: 200, height: 200, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[30].state", tagLightLevel: "beckhoff1.LIGHT.light[30].savedLVL", name:"30", position: { x: 820, y: 400 }, width: 200, height: 200, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[30].state", tagLightLevel: "beckhoff1.LIGHT.light[30].savedLVL", name:"30", position: { x: 760, y: 400 }, width: 200, height: 200, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[30].state", tagLightLevel: "beckhoff1.LIGHT.light[30].savedLVL", name:"30", position: { x: 700, y: 400 }, width: 200, height: 200, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 375, y: 380 }, width: 150, height: 150, rotation: 90, type: "light-two"},
        {tag: "beckhoff1.LIGHT.light[31].state", tagLightLevel: "beckhoff1.LIGHT.light[31].savedLVL", name:"31", position: { x: 460, y: 380 }, width: 150, height: 150, rotation: 90, type: "light-two"},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 400, y: 395 }, width: 200, height: 160, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 350, y: 395 }, width: 200, height: 160, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 300, y: 395 }, width: 200, height: 160, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 250, y: 395 }, width: 200, height: 160, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[32].state", tagLightLevel: "beckhoff1.LIGHT.light[32].savedLVL", name:"32", position: { x: 200, y: 395 }, width: 200, height: 160, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[33].state", tagLightLevel: "beckhoff1.LIGHT.light[33].savedLVL", name:"33", position: { x: 240, y: 580 }, width: 250, height: 250, type: "ground-table-light"},
        {tag: "beckhoff1.LIGHT.light[36].state", tagLightLevel: "beckhoff1.LIGHT.light[36].savedLVL", name:"36", position: { x: 380, y: 190 }, width: 200, height: 140, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[36].state", tagLightLevel: "beckhoff1.LIGHT.light[36].savedLVL", name:"36", position: { x: 310, y: 190 }, width: 200, height: 140, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[36].state", tagLightLevel: "beckhoff1.LIGHT.light[36].savedLVL", name:"36", position: { x: 240, y: 190 }, width: 200, height: 140, rotation: -90, type: "light-three"},
        {tag: "beckhoff1.LIGHT.light[40].state", tagLightLevel: "beckhoff1.LIGHT.light[40].savedLVL", name:"40", position: { x: 153, y: 125 }, width: 300, height: 50, type: "ground-staircase-light"},
      ],
      
      rgbLights: [
        {RGBtag: "beckhoff1.LIGHT.light[47].state", RGBtagLevel: "beckhoff1.LIGHT.light[47].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[0].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[0].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[0].blueLight",name: "47-0(RGB)", position: {x: 1430, y: 345}, width: 102, height: 5,areawidth: 130,areaheight: 130,rotation: -90},
        {RGBtag: "beckhoff1.LIGHT.light[48].state", RGBtagLevel: "beckhoff1.LIGHT.light[48].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[1].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[1].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[1].blueLight",name: "48-1(RGB)", position: {x: 1230, y: 605}, width: 155, height: 5,areawidth: 120,areaheight: 120},
        {RGBtag: "beckhoff1.LIGHT.light[89].state", RGBtagLevel: "beckhoff1.LIGHT.light[89].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[3].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[3].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[3].blueLight",name: "89-3(RGB)", position: {x: 180, y: 820}, width: 335, height: 5,areawidth: 120,areaheight: 120}
      ],

      rgbTexts: [
        {RGBtag: "beckhoff1.LIGHT.light[47].state", RGBtagLevel: "beckhoff1.LIGHT.light[47].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[0].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[0].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[0].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[0].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[0].lightShowCycleTime",name: "47-0(RGB)", position: {x: 1430, y: 250},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[48].state", RGBtagLevel: "beckhoff1.LIGHT.light[48].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[1].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[1].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[1].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[1].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[1].lightShowCycleTime",name: "48-1(RGB)", position: {x: 1295, y: 560},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[89].state", RGBtagLevel: "beckhoff1.LIGHT.light[89].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[3].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[3].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[3].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[3].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[3].lightShowCycleTime",name: "48-1(RGB)", position: {x: 470, y: 775},width: 100, height: 100},
        {RGBtag: "beckhoff1.LIGHT.light[28].state", RGBtagLevel: "beckhoff1.LIGHT.light[28].savedLvl", rgbRed: "beckhoff1.LIGHT.lightRgb[2].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[2].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[2].blueLight", rgbLightShow: "beckhoff1.LIGHT.lightRgb[2].lightShow",rgbCycle: "beckhoff1.LIGHT.lightRgb[2].lightShowCycleTime",name: "28-2(RGB)", position: {x: 1360, y: 785},width: 100, height: 100}
      ],

      rgbLightsCustom: [
        {RGBtag: "beckhoff1.LIGHT.light[28].state", RGBtagLevel: "beckhoff1.LIGHT.light[28].savedLvl",rgbRed: "beckhoff1.LIGHT.lightRgb[2].redLight", rgbGreen: "beckhoff1.LIGHT.lightRgb[2].greenLight", rgbBlue: "beckhoff1.LIGHT.lightRgb[2].blueLight",name: "28-2(RGB)", position: {x: 1050, y: 628}, type: "ground-corner"}, /* width: 400, height: 420, */
      ],

      //Zaluzije
      blinds: [
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[3].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[3].position", name: "Z4(rolo)", position: { x: 1438, y: 574 }, width: 100, height: 15, rotation: -90},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[12].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[12].position", name: "Z13(rolo)", position: { x: 475, y: 33 }, width: 60, height: 15},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[13].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[13].position", name: "Z14(rolo)", position: { x: 148, y: 605 }, width: 150, height: 15, rotation: -90},
        {tagSetPos: "beckhoff1.BLINDS.rollerBlindFB[19].setPosition", tagGetPos: "beckhoff1.BLINDS.rollerBlindFB[19].position", name: "Z20(rolo)", position: { x: 749, y: 195 }, width: 60, height: 15, rotation: -90},
      ],

      //Senzorji
      sensors: [
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[0].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[0].output", tagDisabled:"beckhoff1.SENSOR.sensor[0].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[0].brightness", name:"SG1", position: {x: 300, y: 480}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[1].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[1].output", tagDisabled:"beckhoff1.SENSOR.sensor[1].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[1].brightness", name:"SG2", position: {x: 320, y: 250}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[2].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[2].output", tagDisabled:"beckhoff1.SENSOR.sensor[2].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[2].brightness", name:"SG3", position: {x: 480, y: 150}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[3].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[3].output", tagDisabled:"beckhoff1.SENSOR.sensor[3].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[3].brightness", name:"SG4", position: {x: 340, y: 145}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[4].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[4].output", tagDisabled:"beckhoff1.SENSOR.sensor[4].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[4].brightness", name:"SG5", position: {x: 355, y: 65}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[5].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[5].output", tagDisabled:"beckhoff1.SENSOR.sensor[5].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[5].brightness", name:"SG6", position: {x: 640, y: 120}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[6].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[6].output", tagDisabled:"beckhoff1.SENSOR.sensor[6].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[6].brightness", name:"SG7", position: {x: 700, y: 270}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[7].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[7].output", tagDisabled:"beckhoff1.SENSOR.sensor[7].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[7].brightness", name:"SG8", position: {x: 800, y: 470}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[8].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[8].output", tagDisabled:"beckhoff1.SENSOR.sensor[8].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[8].brightness", name:"SG9", position: {x: 1290, y: 370}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[9].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[9].output", tagDisabled:"beckhoff1.SENSOR.sensor[9].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[9].brightness", name:"SG10", position: {x:1160, y: 480}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[10].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[10].output", tagDisabled:"beckhoff1.SENSOR.sensor[10].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[10].brightness", name:"SG11", position: {x: 1400, y: 510}, width: 80, height: 80},
        {tagMinBrightness:"beckhoff1.SENSOR.sensor[11].minBrightness", tagOutput:"beckhoff1.SENSOR.sensor[11].output", tagDisabled:"beckhoff1.SENSOR.sensor[11].disabled", tagBrightness:"beckhoff1.SENSOR.sensor[11].brightness", name:"SG12", position: {x: 1220, y: 660}, width: 80, height: 80},
      ],

      //Ogrevanje
      heatValves: [
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[2].valveOpenReq", name:"K107", position: {x: 725, y:570}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[3].valveOpenReq", name:"K108", position: {x: 300, y:570}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[4].valveOpenReq", name:"K109", position: {x: 400, y:240}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[15].valveOpenReq", name:"K110", position: {x: 850, y:370}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[6].valveOpenReq", name:"K112", position: {x: 1070, y:470}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[6].valveOpenReq", name:"K112", position: {x: 1180, y:720}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[1].valveOpenReq", name:"K113", position: {x: 1310, y:500}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[1].valveOpenReq", name:"K114", position: {x: 1320, y:560}, width: 80, height: 80},
        {tagValveOpenReq: "beckhoff1.HEAT.valveFB[0].valveOpenReq", name:"K115", position: {x: 1190, y:365}, width: 80, height: 80},
      ],
      heatThermostats: [
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[0].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[0].setPoint", name:"ST2", position: {x: 1120, y: 430}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[1].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[1].setPoint", name:"ST4", position: {x: 1270, y: 475}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[6].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[6].setPoint", name:"ST6", position: {x: 1055, y: 615}, width: 100, height: 100},  
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[2].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[2].setPoint", name:"ST13", position: {x: 770, y: 400}, width: 100, height: 100},  
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[3].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[3].setPoint", name:"ST17", position: {x: 220, y: 670}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[4].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[4].setPoint", name:"ST21", position: {x: 480, y: 80}, width: 100, height: 100},
        {tagThermostatValueTemp: "beckhoff1.HEAT.thermostatFB[5].valueTemp", tagThermostatSetPoint: "beckhoff1.HEAT.valveFB[5].setPoint", name:"ST22", position: {x: 570, y: 90}, width: 100, height: 100},        
      ],
      thermostatErrors: [
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[0].sensorError", name: "ST2", position: {x: 1120, y: 370}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[1].sensorError", name: "ST4", position: {x: 1275, y: 480}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[6].sensorError", name: "ST6", position: {x: 1055, y: 550}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[2].sensorError", name: "ST13", position: {x: 770, y: 405}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[3].sensorError", name: "ST17", position: {x: 220, y: 680}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[4].sensorError", name: "ST21", position: {x: 485, y: 85}},
        {tagThermostatSensorError:"beckhoff1.HEAT.thermostatFB[5].sensorError", name: "ST22", position: {x: 580, y: 95}},
      ],

      //Vrata
      doors: [
        {doorTag: "beckhoff1.GVL.sensorOpen[18]", position: {x: 202, y: 268}, name: "SO_P11"}, //levo, pri vhodu
        {doorTag: "beckhoff1.GVL.sensorOpen[10]", position: {x: 1456, y: 325}, name: "SO_P1"}, //vhod v hiso (del za apartma), pri stolpnicah
      ],

      //Okna
      windows: [
        {windowTag: "beckhoff1.GVL.sensorOpen[17]", position: {x: 166, y: 515}, name: "SO_P10"}, //desno v kuhinji pri aparatu za kavo
        {windowTag: "beckhoff1.GVL.sensorOpen[19]", position: {x: 520, y: 50}, name: "SO_P12"}, //okno pri vhodu v sobo z pralnimi stroji, pri stolpnicah
        {windowTag: "beckhoff1.GVL.sensorOpen[20]", position: {x: 766, y: 145}, name: "SO_P13"}, //v sobi z pralnimi stroji
        {windowTag: "beckhoff1.GVL.sensorOpen[21]", position: {x: 890, y: 283}, name: "SO_P14"}, //pri klavirju
        {windowTag: "beckhoff1.GVL.sensorOpen[16]", position: {x: 380, y: 839}, name: "SO_P8"}, //okno v kuhinji 
        {windowTag: "beckhoff1.GVL.sensorOpen[15]", position: {x: 830, y: 839}, name: "SO_P7"}, //okno v dnevni sobi
        {windowTag: "beckhoff1.GVL.sensorOpen[14]", position: {x: 1110, y: 839}, name: "SO_P5"}, //okno v spalnici v apartmanu (jug)
        {windowTag: "beckhoff1.GVL.sensorOpen[13]", position: {x: 1290, y: 839}, name: "SO_P4"}, //okno v spalnici v apartmanu (jug)
        {windowTag: "beckhoff1.GVL.sensorOpen[12]", position: {x: 1456, y: 790}, name: "SO_P3"}, //okno v spalnici v apartmanu (vzhod)
        {windowTag: "beckhoff1.GVL.sensorOpen[11]", position: {x: 1456, y: 510}, name: "SO_P2"}, //okno v kopalnici v apartmanu
        //{position: {x: 1456, y: 390}, name: "SO_P1"}, //glavni vhod v del z apartmaji (pri stolpnicah in glavnem vhodu)
      ],

      chart:[
        {tag: 'beckhoff1.HEAT.thermostatFB[0].valueTemp', label: 'ST2', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[1].valueTemp', label: 'ST4', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[6].valueTemp', label: 'ST6', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[2].valueTemp', label: 'ST13', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[3].valueTemp', label: 'ST17', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[4].valueTemp', label: 'ST21', unit: '°C'},
        {tag: 'beckhoff1.HEAT.thermostatFB[5].valueTemp', label: 'ST22', unit: '°C'},
      ],

    }
  },

  methods: {
    
  },

  computed: {
  }


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
  margin: auto;
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

.svg-pritlicje-tloris {
  padding: 20px;
}


</style>
<template>
  <div class="home-outer">
    <div class="row justify-content-center">
      <div class="mb-4 py-3 mr-4">
        <div class="card border-dark h-100 shadow">
          <h5 class="card-header p-4">Izklop luči</h5>
          <div class="card-block">

            <div class="row justify-content-center my-3">
              <h6 class="mx-3">Izklop luči glavni del:</h6>
              <svg viewBox="0 0 50 30" width="50" height="30" style="overflow: visible;">
                <rect class="cursor-pointer"  @click="lightsOffMain()" x="48%" y="-4%" rx="5" width="100%" height="100%" fill="#3d4d6b" stroke="white" stroke-width="1px" />
                <image class="cursor-pointer"  @click="lightsOffMain()" x="63%" y="5%" width="70%" height="70%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
              </svg>
            </div>
             <div class="row justify-content-center my-3">
              <h6 class="mx-3">Izklop luči zgornji apartma:</h6>
              <svg viewBox="0 0 50 30" width="50" height="30" style="overflow: visible;">
                <rect class="cursor-pointer" @click="lightsOffApartUp()" x="5%" y="-4%" rx="5" width="100%" height="100%" fill="#3d4d6b" stroke="white" stroke-width="1px" />
                <image class="cursor-pointer" @click="lightsOffApartUp()" x="20%" y="5%" width="70%" height="70%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
              </svg>
            </div>
             <div class="row justify-content-center my-3">
              <h6 class="mx-3">Izklop luči spodnji apartma:</h6>
              <svg viewBox="0 0 50 30" width="50" height="30" style="overflow: visible;">
                <rect class="cursor-pointer" @click="lightsOffApartDown()" x="3%" y="-4%" rx="5" width="100%" height="100%" fill="#3d4d6b" stroke="white" stroke-width="1px" />
                <image class="cursor-pointer" @click="lightsOffApartDown()" x="18%" y="5%" width="70%" height="70%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
              </svg>
            </div>

          </div>
        </div> 
      </div> 

      <scada-card header="Vremenska postaja" class="mr-4"> <!-- class="col-12 col-lg-6 col-xl-4" -->
        <scada-card-list :items="items" />
      </scada-card >

      <scada-card header="Alarmi"> <!-- class="col-12 col-lg-6 col-xl-4" -->
        <!-- <scada-card-list :items=alarms />  -->
        <!-- <alarm-icon filter="/ogrevanje" /> -->
        <alarm-icon filter="/vlomna" />
        <alarm-icon filter="/klime" />
        <!-- <alarm-icon filter="/sistemi" /> -->
      </scada-card>
    </div>


  </div>
</template>

<script>
import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';

import AlarmIcon from "./home/AlarmIcon.vue";

export default {
  components: {
    "alarm-icon": AlarmIcon,
  },
  data() {
    return {
      items:[
        {tag: 'beckhoff1.GVL.weatherStation.temperature', desc: 'Zunanja temperatura', scadaType: 'number', unit: '°C'},
        {tag: 'beckhoff1.GVL.weatherStation.windSpeed', desc: 'Hitrost vetra', scadaType: 'number', unit: 'km/h'},
        {tag: 'beckhoff1.GVL.weatherStation.luminosity', desc: 'Zunanja svetilnost', scadaType: 'number', unit: 'lux'}, 
      ]
      
    
    };
  },

  methods: {
    async lightsOffMain() {
      let command = ["beckhoff1.LIGHT.lightsOffMain.lightsOff", 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },
    async lightsOffApartUp() {
      let command = ["beckhoff1.LIGHT.lightsOffApartUp.lightsOff", 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },

    async lightsOffApartDown() {
      let command = ["beckhoff1.LIGHT.lightsOffApartDown.lightsOff", 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },


  }
};
</script>

<style lang="scss">

.home-outer {
  margin: auto;
  width: 95%;
}

.card {
  color: $text-primary-color;
  min-width:350px;
  background-color:$background-elements-color;
  border-radius: 1rem;
  /* border:none; */

  .card-header{
    min-height:40px;
    border: none;
  }
}


</style>

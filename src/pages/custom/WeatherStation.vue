<template>
  <div class="main-outer">
    
    <div class="row justify-content-center">
      <scada-card header="Vremenska postaja"  class="col-12 col-lg-6 col-xl-4">
        <scada-card-list :items="items" />
      </scada-card >
    </div>  


    <div class="row justify-content-center">
      <scada-card class="col-xl-8">
        <history-line-chart class="pt-2" :tags="chart" />
      </scada-card>
    </div>

  </div>
</template>

<script>


export default {
  data() {
    return {
      items:[
        {tag: 'beckhoff1.GVL.weatherStation.temperature', desc: 'Zunanja temperatura', scadaType: 'number', unit: '°C'},
        {tag: 'beckhoff1.GVL.weatherStation.windSpeed', desc: 'Hitrost vetra', scadaType: 'number', unit: 'km/h'},
        {tag: 'beckhoff1.GVL.weatherStation.luminosity', desc: 'Zunanja svetilnost', scadaType: 'number', unit: 'lux'},

        {tag: 'beckhoff1.GVL.weatherStation.night', desc: 'Dan/noč', scadaType: 'icon', icons:["sun","regular/moon"]},
        {tag: 'beckhoff1.GVL.weatherStation.rain', desc: 'Dež', scadaType: 'icon', icons:["sun","cloud-rain"], colors:["","orange"]},
        {tag: "beckhoff1.GVL.weatherStation.windAlarm1Treshold",scadaType: "setValue",desc: "Nastavitev za alarm 1",unit: "km/h",width: 112},
        {tag: "beckhoff1.GVL.weatherStation.windAlarm2Treshold",scadaType: "setValue",desc: "Nastavitev za alarm 2",unit: "km/h",width: 112},
        {tag: "beckhoff1.GVL.weatherStation.windAlarm1",scadaType: "icon",desc: "Alarm vetra 1",icons: ["regular/check-circle","exclamation-triangle"],colors: ["green", "red"]},
        {tag: "beckhoff1.GVL.weatherStation.windAlarm2",scadaType: "icon",desc: "Alarm vetra 2",icons: ["regular/check-circle","exclamation-triangle"],colors: ["green", "red"]},
      ],
      chart:[
        {tag: 'beckhoff1.GVL.weatherStation.windSpeed', label: 'Veter', unit: 'km/h'},
        {tag: 'beckhoff1.GVL.weatherStation.temperature', label: 'Temperatura', unit: '°C'},
        {tag: 'beckhoff1.GVL.weatherStation.luminosity', label: 'Svetilnost', unit: 'lux'},
        {tag: 'beckhoff1.GVL.weatherStation.rain', label: 'Dež', unit: 'dež'},
      ],

    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-outer {
  margin: auto;
  width: 95%;
}
.desc-text{
  font-size:8px;
}
</style>
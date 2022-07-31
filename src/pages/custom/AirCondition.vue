<template>
  <div class="ac-outer row justify-content-center">

    <scada-card header="Klima"  class="col-12 col-lg-6 col-xl-4">
      <scada-card-list :items="airCondition" />
    </scada-card >



  </div>
</template>

<script>

const alarmIcons = ["regular/check-circle","exclamation-triangle"];
const alarmColors = ['green','red'];

export default {
  data() {
    return {
      airCondition:[
        {tag: 'beckhoff1.GVL.acFB.temperature', desc: 'Temperatura prostora', scadaType: 'number', unit: '°C'},
        {tag: 'beckhoff1.GVL.acFB.temperatureSet', desc: 'Želena temperatura', scadaType: 'setValue', unit: '°C'},
        {tag: 'beckhoff1.GVL.acFB.on', desc: 'Delovanje', text:["off", "on"], color:"green", width:65, scadaType: 'switch'},
        {tag: 'beckhoff1.GVL.acFB.mode', desc: 'Način delovanja', scadaType: 'dropdown', text: ["Auto","Heat","","Cool","","","","","","Fan","","","","","Dry"]},
        {tag: 'beckhoff1.GVL.acFB.fanSpeed', desc: 'Hitrost ventilatorja', scadaType: 'dropdown', text: ["","1","2","3"]},
        {tag: 'beckhoff1.GVL.acFB.alarm', desc: 'Napaka', scadaType: 'icon', icons:alarmIcons, colors:alarmColors},
      ]

    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ac-outer {
    margin: auto;
    width: 95%;
}
.desc-text{
  font-size:8px;
}
</style>
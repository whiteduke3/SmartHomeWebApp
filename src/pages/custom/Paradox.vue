<template>
  <div class="main-outer row justify-content-center">

    <scada-card header="Varovana področja" class="col-12 col-lg-6 col-xl-4">
      <div v-for="(item, index) in areas" :key="'areas'+index" class="row align-items-center justify-content-between m-2">
        <scada-value :tag=item.tagLabel class="col-sm-8" />
        <scada-icon :tag=item.tagValue :icons=item.icons :colors=item.colors :scale=1.5 class="col-sm-4" />  
      </div> 
    </scada-card>

    <scada-card header="Senzorji (cone)" class="col-12 col-lg-6 col-xl-4">
      <div v-for="(item, index) in zones" :key="'zones'+index" class="row align-items-center justify-content-between m-2">
        <scada-value :tag=item.tagLabel class="col-sm-8" />
        <scada-icon :tag=item.tagValue :icons=item.icons :colors=item.colors :scale=1.5 class="col-sm-4" />  
      </div> 
    </scada-card>

    <scada-card header="Uporabniki" class="col-12 col-lg-6 col-xl-4">
      <div v-for="(item, index) in users" :key="'users'+index" class="row align-items-center justify-content-between m-2">
        <div class="col-sm-6">
          {{item.desc}}
        </div> 
        <scada-value :tag=item.tagLabel class="col-sm-6" />
      </div> 
    </scada-card>

    <scada-card header="Alarmi" class="col-12 col-lg-6 col-xl-4">
      <scada-card-list :items="alarms" />
    </scada-card>

   <!-- <scada-card header="Virtualne cone" class="col-12 col-lg-6 col-xl-4">
      <scada-card-list :items="virtualInputs" />
    </scada-card> -->

   <scada-card header="Zgodovina dogodkov" class="col-12 col-xl-10">
      <duration-picker-from-to @update=update />
      <b-table class="table-style mb-0" small :items="tableItems" :fields="tableFields" striped>
        <template v-slot:cell(dateTime)="cell">{{ getDateTimeString(cell.item.dateTime)}}</template>
      </b-table>
      <div v-if='tableItems.length==0'>Za to obdobje ni dogodkov</div> 
    </scada-card>


  </div>
</template>

<script>

import paradoxControler from "./paradox/paradoxController";
import dateTime from "../../modules/dateTime";
import DurationPickerFromTo from '@/components/app/durationPicker/DurationPickerFromTo.vue'

const alarmIcons = ["regular/check-circle","exclamation-triangle"];
const alarmColors = ['green','red'];

const armedIcon = ['lock-open','lock'];
const armedColors = ['','red'];



export default {
  data() {
    return {
      areas:[
        {tagLabel:"paradox1.areaLabel1", tagValue:"paradox1.areaArmed1", icons:armedIcon, colors:armedColors},
        {tagLabel:"paradox1.areaLabel2", tagValue:"paradox1.areaArmed2", icons:armedIcon, colors:armedColors},
        // {tagLabel:"paradox1.areaLabel3", tagValue:"paradox1.areaArmed3", icons:armedIcon, colors:armedColors},
        // {tagLabel:"paradox1.areaLabel4", tagValue:"paradox1.areaArmed4", icons:armedIcon, colors:armedColors},
        // {tagLabel:"paradox1.areaLabel5", tagValue:"paradox1.areaArmed5", icons:armedIcon, colors:armedColors},
        // {tagLabel:"paradox1.areaLabel6", tagValue:"paradox1.areaArmed6", icons:armedIcon, colors:armedColors},
      ],
      zones:[
        {tagLabel:"paradox1.zoneLabel1", tagValue:"paradox1.zoneError1", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel2", tagValue:"paradox1.zoneError2", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel3", tagValue:"paradox1.zoneError3", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel4", tagValue:"paradox1.zoneError4", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel5", tagValue:"paradox1.zoneError5", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel6", tagValue:"paradox1.zoneError6", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel7", tagValue:"paradox1.zoneError7", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel8", tagValue:"paradox1.zoneError8", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel9", tagValue:"paradox1.zoneError9", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel10", tagValue:"paradox1.zoneError10", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel11", tagValue:"paradox1.zoneError11", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel12", tagValue:"paradox1.zoneError12", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel13", tagValue:"paradox1.zoneError13", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel14", tagValue:"paradox1.zoneError14", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel15", tagValue:"paradox1.zoneError15", icons:alarmIcons, colors:alarmColors},
        {tagLabel:"paradox1.zoneLabel16", tagValue:"paradox1.zoneError16", icons:alarmIcons, colors:alarmColors},
        // {tagLabel:"paradox1.zoneLabel17", tagValue:"paradox1.zoneError17", icons:alarmIcons, colors:alarmColors},
        // {tagLabel:"paradox1.zoneLabel18", tagValue:"paradox1.zoneError18", icons:alarmIcons, colors:alarmColors},
        // {tagLabel:"paradox1.zoneLabel19", tagValue:"paradox1.zoneError19", icons:alarmIcons, colors:alarmColors},
        // {tagLabel:"paradox1.zoneLabel20", tagValue:"paradox1.zoneError20", icons:alarmIcons, colors:alarmColors},
      ],
      users:[
        {tagLabel:"paradox1.userLabel1", desc:"uporabnik 1"},
        {tagLabel:"paradox1.userLabel2", desc:"uporabnik 2"},
        {tagLabel:"paradox1.userLabel3", desc:"uporabnik 3"},
        {tagLabel:"paradox1.userLabel4", desc:"uporabnik4"},
        {tagLabel:"paradox1.userLabel5", desc:"uporabnik5"},
        {tagLabel:"paradox1.userLabel6", desc:"uporabnik6"},
        // {tagLabel:"paradox1.userLabel7", desc:"uporabnik7"},
        // {tagLabel:"paradox1.userLabel8", desc:"uporabnik8"},
        // {tagLabel:"paradox1.userLabel9", desc:"uporabnik9"},
        // {tagLabel:"paradox1.userLabel10", desc:"uporabnik10"},
      ],
      alarms:[
        {tag:"paradox1.burglerAlarm", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"Vlomni alarm"},
        {tag:"paradox1.generalError", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"Splošna napaka"},
        {tag:"paradox1.acFailure", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"AC napaka"},
        {tag:"paradox1.batteryFailure", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"Napaka baterije"},
        {tag:"paradox1.clockTrouble", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"Napaka ure"},
        {tag:"paradox1.device.commErr", scadaType:"icon", icons:alarmIcons, colors:alarmColors, desc:"Komunikacija"},
      ],
      // virtualInputs:[
      //   {tag:"paradox1.virtualDisabled1", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"IR KLET"},
      //   {tag:"paradox1.virtualDisabled2", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"IR PRITLJICJE"},
      //   {tag:"paradox1.virtualDisabled3", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"IR MANSARDA"},
      //   {tag:"paradox1.virtualDisabled4", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"IR NAJEMNIK"},
      //   {tag:"paradox1.virtualDisabled5", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"OKNO PRILJICJE"},
      //   {tag:"paradox1.virtualDisabled6", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"OKNO NAJEMNIK"},
      //   // {tag:"paradox1.virtualDisabled7", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"RASVETLJAVA MANS"},
      //   // {tag:"paradox1.virtualDisabled8", scadaType:"switch", text:["omogočena", "blokirana"], color:["green","red"], width:125, desc:"RAZSVETLJAVA NAJ"},
      // ],
      tableFields: [
          {key:'dateTime', label:"Čas", sortable: true},
          {key:'event', label:"Dogodek", sortable: true},
          ],
      tableItems:[],   


    }
  },
  methods:{
    getDateTimeString(time){
      return dateTime.getDateTimeString(time);
    },
    async getValues(fromTime, toTime){
      let items = await paradoxControler.getValues(fromTime, toTime);
      if (items!=undefined){
        this.tableItems = items;
      }
    },
    update(fromTime, toTime){
        this.getValues(fromTime, toTime);
    }
  },
  components: { 
    'duration-picker-from-to':DurationPickerFromTo,
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-outer {
  margin: auto;
  width: 95%;
}

</style>
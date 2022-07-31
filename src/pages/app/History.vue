<template>
  <div class="row zgodovina-outer">
    <scada-card header="Zgodovina dogodkov" class="col-12">
      <duration-picker-from-to @update=update />
      <div class="row px-5">
        <input v-model="filter" placeholder="filter lokacije" class="text-input mt-2" size="50">
      </div>
      <b-table class="table-style mb-0" small :items="tableItems" :fields="fields" striped>
        <template v-slot:cell(dateTime)="cell">{{ getDateTimeString(cell.item.dateTime)}}</template>
      </b-table>
      <div v-if='tableItems.length==0'>Za to obdobje ni dogodkov</div> 
    </scada-card>
  </div>
</template>

<script>

import historyControler from "./history/historyControler";
import dateTime from "../../modules/dateTime";
import DurationPickerFromTo from '../../components/app/durationPicker/DurationPickerFromTo.vue'

export default {
  data () {
    return {
    //   tableItems:[{čas:"1.3.2019 11:30", dogodek:"alarm", opis:"Napaka komunikacije", lokacija:"Ljubljana mesto - DCV Glavni - MPS1", uporabnik:"arosso", komentar:"test"},
    //   {čas:"1.3.2019 11:45", dogodek:"ok", opis:"Napaka komunikacije", lokacija:"Ljubljana mesto - DCV Glavni - MPS1", uporabnik:"", komentar:""}],   
        fields: [
          {key:'dateTime', label:"Čas", sortable: true},
          {key:'name', label:"Dogodek"},
          {key:'location', label:"Lokacija", sortable: true},
          {key:'event', label:"Tip dogodka", sortable: true},
          // {key:'user', label:"Uporabnik"},
          // {key:'comment', label:"Komentar"}
          ],
        tableItems:[],   
        filter:'',
    }
  }, 
  methods:{
    getDateTimeString(time){
      return dateTime.getDateTimeString(time);
    },
    async getValues(fromTime, toTime){
      let items = await historyControler.getValues(fromTime, toTime, this.filter);
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
}

</script>

<style lang="scss">

.zgodovina-outer {
    margin: auto;
    width: 95%;
}
</style>

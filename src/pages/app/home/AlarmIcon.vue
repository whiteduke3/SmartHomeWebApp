<template>
      <div v-if=show class="row align-items-center justify-content-between m-2">
        <div class="col-sm-7 ">
          <icon :name=icon :scale=1.5  />
          &nbsp;&nbsp;{{catagory}}
        </div> 
        <div :style=style class="col">
            <icon :name=source :scale=1.5 />
        </div>
      </div> 
</template>
<script>
import alarmControler from "../../../modules/alarms/alarmController";
import appConfig from '../../../support/app-config'

const alarmIcons = ["regular/check-circle","exclamation-triangle"];

export default {
  props:{
    filter:{
      type:String,
      required: true
    },
  },

  data() {
    return {
      events: {
        alarms: [],
        warnings: [],
        notices: []
      },
      show:true,
    };
  },
  computed: {
    icon(){
      return appConfig.getItem(this.filter).img;
    },
    catagory(){
      return appConfig.getItem(this.filter).name;
    },
    source(){
        // console.log(this.events)
        if (this.events.notices==0&&this.events.warnings==0&&this.events.alarms==0){
            return alarmIcons[0];
        }else{
            return alarmIcons[1];
        }
        
    },
    style(){
        if (this.events.notices==0&&this.events.warnings==0&&this.events.alarms==0){
            return "color:green;";
        }else{
            return "color:red;";
        }
    }

  } ,     
  methods: {
    update() {
      //this.events = alarmControler.getFilteredEvents(this.filter);

      // console.log(this)
      // console.log(this.filter)
    }
  },
  mounted() {
    alarmControler.register(this);
  },

  destroyed() {
    alarmControler.unregister(this);
  },
}

</script>

<style lang="scss">
</style>
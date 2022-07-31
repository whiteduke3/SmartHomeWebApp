<template>
    <div class="main-settings row justify-content-center">

      <scada-card  header="Info" class="col-12 col-lg-6 col-xl-4 mr-3">
        <div class="row align-items-center justify-content-center my-2">
          <div class="col-6">Internetna stran:</div>
          <a class="col-6" :href=info.link>{{info.page}}</a>
        </div>  
        <div class="row align-items-center justify-content-center my-2">
          <div class="col-6">Naslov:</div>
          <div class="col-6">{{info.mail}}</div>
        </div>       
      </scada-card >

      <scada-card  header="Konfiguracija" class="col-12 col-lg-6 col-xl-4 ml-3" v-if=administrator>
        <div class="row align-items-center justify-content-center my-2">
          <div class="col-sm-7">
            Uvozi kofiguracijo alamrov v SQL bazo!
          </div>
          <button class="btn btn-primary" @click="importDatabase('alarms')">
            <icon name='upload' scale="1.5"></icon>
          </button>
        </div>   
        <div class="row align-items-center justify-content-center my-2 pb-2">
          <div class="col-sm-7">
            Uvozi kofiguracijo grafov v SQL bazo!
          </div>
          <button class="btn btn-primary" @click="importDatabase('charts')">
            <icon name='upload' scale="1.5"></icon>
          </button>
        </div>        
      </scada-card >

      <!-- <scada-card  header="SMS nastavitve" class="col-12 col-lg-6 col-xl-4" v-if=administrator>
        <div class="row align-items-center justify-content-center my-2">
          <div class="col-sm-7">
            Pošiljanje sporočil
          </div>
          <sms-switch/>
        </div>      
      </scada-card >   -->

      <b-modal id="importModal"
            title="Uvoz konfiguracije" 
            class="text-dark" 
            centered 
            ok-only
            ref="modal">
            <p v-if="status === 'success'">Uvoz konfiguracije je bil uspešen</p>
            <p v-else>Uvoz konfiguracije je bil neuspešen</p>
      </b-modal>      

    </div>
</template>

<script>

//import smsSwitch from './settings/SmsSwitch.vue'
import Comm from "../../modules/rest/restCommunication";

// const energovat = {mail:"info@energovat.com", page:"www.energovat.com", link:'http://www.energovat.com'};
const arosso = {mail:"info@a-rosso.si", page:"www.a-rosso.si", link:'http://www.a-rosso.si'};

export default {
  data () {
    return {
        status:'',
        info:arosso
    }
  },
  methods:{
    async importDatabase(configuration) {
      this.status =await Comm.get('/server/import-'+ configuration +'/');
      this.$refs.modal.show();
    }    
  },
  computed:{
    administrator(){
      return this.$store.state.user.permissionLvl==3;
    },
  }, 
  components:{
    //'sms-switch':smsSwitch
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-settings {
  margin: auto;
  width: 90%;
}

a {
  color: #3bafda !important;
}
</style>

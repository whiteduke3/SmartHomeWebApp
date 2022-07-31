<template>
  <div class="py-2">
    <div class="row justify-content-center form-group">
      <div class="col-3">
        <p class="col-form-label text-left">Novo geslo</p>
      </div>
      
      <form @submit="save()" class="col-6">
        <b-form-input  type="password" v-model="pword"></b-form-input>
      </form>
    </div>


    <div v-if='success==1'>
        <font color='green'>geslo spremenjeno</font>
    </div>
    <div v-else-if='success==2'>
        <font color='#d9534f'>napaka</font>
    </div>

    <div>
      <b-button size="sm" variant="primary" class="mx-1" @click="save()">Spremeni</b-button>
    </div>  
  </div>
</template>

<script>
import Comm from "@/modules/rest/restCommunication";

export default {

  data () {
    return {
        pword:'',
        success:0
    }
  },
  methods:{
    async save(){
        var req = {username:this.$store.state.user.name, password:this.pword}
        var res =await Comm.post('/auth/change-pass/',req);
        if (res=='true'){
          this.success = 1; 
        }else{
          this.success = 2;
        }
         
      }
  },
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
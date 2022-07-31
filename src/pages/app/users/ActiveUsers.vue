<template>
  <div class="row justify-content-center py-2">
    <div class="bg-light col-10">
      <b-table striped hover
               :items="users"
               :fields="fields"
               class="text-dark"
      >
      <template v-slot:cell(token)="row">
        <b-button size="sm" variant="primary"  @click="logout(row.value)">Odjavi</b-button>
      </template>
      </b-table>
    </div>  
  </div> 
</template>

<script>
import Comm from "@/modules/rest/restCommunication";
import RestAuth from '@/modules/auth/restAuth'

export default {

  data () {
    return {
      users:[{username:'', activity:'', ipAddress:''}],
      fields: [
        {key:"username", label: 'Ime', 'class': 'text-left' },
        {key:"activity", label: 'Aktivnost', 'class': 'text-left' },
        // {key:"ipAddress", label: 'IP naslov', 'class': 'text-left' },
        {key:"token", label: ''},
      ],
    }
  },
  methods:{
    async getActiveUsers(){
      this.users=[];
      var tempUsers = await Comm.get('/users/active/');

      if (tempUsers==undefined){
        tempUsers=[];
      }

      var permission = this.$store.state.user.permissionLvl;
      var username =this.$store.state.user.name;

      if (permission<3){
        for(var i=0;i<tempUsers.length;i++){
          if (tempUsers[i].username==username){
            this.users.push(tempUsers[i]);
          }
        }
      }else{
        this.users = tempUsers;
      }

      // console.log(this.users);
    },
    async logout(token){
      await RestAuth.logout(token);
      this.getActiveUsers();
    }
  },
  mounted:function () {
    this.getActiveUsers();
  },
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
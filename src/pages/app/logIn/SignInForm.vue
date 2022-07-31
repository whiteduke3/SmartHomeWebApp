<template>
 <div id="sign-in-form" class="row justify-content-center mx-1">
    <scada-card  header="Pozdravljeni!">
      <form @submit.stop.prevent="submit" class="mx-4 mt-2">
        <b-form-group>
          <b-form-input type="text" placeholder="Uporabniško ime" v-model="name" :state="stateUser"></b-form-input>
        </b-form-group>
      </form>

      <form @submit.stop.prevent="submit" class="mx-4 my-2">
        <b-form-group>
          <b-form-input type="password" placeholder="Geslo" v-model="pass" :state="statePass"></b-form-input>
        </b-form-group>          
      </form>
      <font color='#d9534f'>{{errorText}}</font>
      <div>
        <b-button variant="primary" class="w-30 m-2" @click="submit">Prijava</b-button>
      </div>

      <div class="row justify-content-center mb-3 mt-1">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="stayLogged">
          <label class="custom-control-label ml-2" for="customCheck1">Ostani prijavljen</label>
        </div>
        
      </div>


    </scada-card>    
  </div>
</template>

<script>
import auth from '../../../modules/auth/auth'

export default {
  name: 'sign-in-form',
  data() {
    return {
      name: '',
      pass: '',
      response:0,
      stayLogged:false,
    }
  },
  methods: {
    async submit() {
      this.response = await auth.login(this.stayLogged, this.name, this.pass, this);
      // console.log(this.response);
    },
  },
  computed: {
    stateUser() {
       return (this.response==1) ? false : null ;
    },
    statePass() {
      return (this.response==1) ? false : null ;
    },
    errorText(){
      if(this.response==1){
        return 'Napačno uporabniško ime ali geslo!';
      }else if(this.response==2){
        return 'Ni povezave s strežnikom!';  
      }else{
        return ''; 
      }
    }
  },

  mounted:function () {
    if (this.$store.state.loggedIn){
      this.$router.push({ name: 'home'});
    }
  }  
}
</script>

<style scoped>


</style>
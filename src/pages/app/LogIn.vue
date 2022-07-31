<template>
    <div id="login-container" class="pt-5">
      <sign-in-form></sign-in-form>
    </div>
</template>

<script>

import SignInForm from './logIn/SignInForm.vue'

export default {
  name: 'login',
  components:{
      'sign-in-form':SignInForm,
  },

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#login-container {
  margin: 0;
}

</style>

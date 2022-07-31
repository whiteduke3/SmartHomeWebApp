<template>
  <div class="outer-users row">
    <scada-card header="Aktivni" class="col-12 col-xl-6">
      <active-users></active-users>
    </scada-card>
    <scada-card header="Nastavitve" class="col-12 col-xl-6" v-if="administrator">
      <users-form></users-form>
    </scada-card>
    <scada-card header="Sprememba gesla" class="col-12 col-xl-6">
      <change-pass></change-pass>
    </scada-card>
  </div>
</template>

<script>
import UsersForm from './users/UsersSetings.vue';
import ActiveUsersTable from "./users/ActiveUsers.vue";
import ChangePassword from "./users/ChangePassword.vue";

export default {
  name: "users",
  computed: {
    administrator() {
      return this.$store.state.user.permissionLvl == 3;
    }
  },
  components: {
    "users-form": UsersForm,
    "active-users": ActiveUsersTable,
    "change-pass": ChangePassword
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-users {
  margin: auto;
  width: 95%;
}
</style>
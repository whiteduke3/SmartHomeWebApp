<template>
  <div id="top-navbar" class="w-100 shadow" fixed="top">
    <div class="d-flex align-items-center">
      <!-- <img src="@/assets/a_rosso.png" class="logo px-1"> -->

      <h5 class="m-3 pl-2">{{title}}</h5>

      <div class="ml-auto row align-items-center m-2" v-if="loggedIn">
        <date-time class="mx-2"></date-time>

        <router-link v-for="(el, index) in topbaritems" :to="{name: el.routerName}" :key="index">
          <icon id="icon" class="p-0 mx-2" v-if="el.img!=''" v-bind:name="el.img" scale="1.5"></icon>
        </router-link>
        <h5 class="m-0 px-2">{{user}}</h5>

        <button @click="logout" class="p-0 mx-2">
          <icon id="icon" name="sign-out-alt" scale="2"></icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../../modules/auth/auth";
import DateTime from "../custom/DateTime.vue";

export default {
  props: {
    'title': {
      type: String
    }
  },
  
  components:{
    'date-time':DateTime
  },
  data() {
    return {
      topbaritems: [
        // { name: "Zgodovina", img: "bell", routerName: "history" },
        { name: "Uporabniki", img: "user", routerName: "users" },
        { name: "Nastavitve", img: "cog", routerName: "settings" },
        { name: "Domov", img: "home", routerName: "home" }
      ],

    };
  },
  methods: {
    logout() {
      auth.logout();
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    user() {
      return this.$store.state.user.name;
    }
  }
};
</script>
<style scoped lang="scss">

@import '../../support/design';

#top-navbar {
  top: 0px;
  height: $top-bar-height;
  background-color: $top-bar-color;
  color: $text-top-bar-color;

  .logo {
    height: $top-bar-height;
  }

  div {
    height: $top-bar-height;
  }

  #icon {
    color: $text-top-bar-color;
  }

  button {
    background-color: transparent;
    border-color: transparent;
    fill: white;
    &:focus {
      outline: none;
    }
  }

  a svg {
    fill: white;
  }
}
</style>

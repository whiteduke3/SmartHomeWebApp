<template>
  <div v-if=loaded id="app" :class="{'collapsed-menu' : collapsedStyle}">
    <top-bar class="d-none d-md-block" title='Ravnihar Reteče 61'/>

    <side-bar-menu  @collapsed="menuCollapsed" @isOnMobile="menuIsOnMobile" width='220px' />
    <div class="my-container">

      <router-view></router-view>

    </div>
      

  </div>
</template>

<script>
import TopBar from "./components/navigation/TopBar.vue";
import NavPath from "./components/navigation/NavPath.vue";

import auth from "./modules/auth/auth";

import scadaControler from "./modules/scada/scadaController";

export default {
  name: "app",
  components: {
    "top-bar": TopBar,
    "nav-path": NavPath
  },
  data() {
    return {
      loaded:false,
      collapsed:false,
      isOnMobile:false
    }
  },
  methods: {
    menuCollapsed(collapsed){
      this.collapsed=collapsed;
    },
    menuIsOnMobile(isOnMobile){
        this.isOnMobile=isOnMobile;
    }
  },

  computed: {
    collapsedStyle(){
      return this.collapsed || this.isOnMobile
    }
  },

  async created() {
    await auth.getUserData();
    scadaControler.start();
    // alarmControler.start();
    this.loaded=true;
  }

}
</script>

<style lang="scss">
@import './support/design.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-left: 200px;
  transition: 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  /*custom scrollbar*/
  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    display: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $selected-background-color;
    border-radius: .35rem;
  }


}

html, body {
  background-color: $background-color !important;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  //overflow-y: hidden;
  
}


#app.collapsed-menu {
  padding-left: 50px;
}

.my-container {
  background-clip: border-box;
  border-radius: .25rem;
  /* margin: auto; */
  width: 100%;
  height: 100%;
  overflow-y: auto;
  //overflow-y: hidden;

  
}

svg text {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none !important;
}
</style>

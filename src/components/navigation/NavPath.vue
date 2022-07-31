<template>
  <div>
    <b-breadcrumb :items="navHierarchy"/>
  </div>
</template>


<script>
import appConfig from '../../support/app-config'

export default {
  data (){
    return {
      navHierarchy: [],
    }
  },
  watch: {
    '$route' (to) {
      this.navHierarchy=appConfig.getNavHierarchy(to.path)
    }
  }
}
</script>


<style scoped lang="scss">
.breadcrumb{
  background-color:transparent;
  margin: 0px;
  font-size: 24px;
}
.breadcrumb-item.active{
  color:white;
}
</style>
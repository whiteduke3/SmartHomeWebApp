<template>
  <div >
    <sidebar-menu class="shadow" :menu="menu" :collapsed="collapsed" :show-one-child="true" :width="width" @toggle-collapse="onToggleCollapse">
        <icon slot="toggle-icon" name="arrows-alt-h" />
        <icon slot="dropdown-icon" name="angle-right" />
    </sidebar-menu>
    <div v-if="isOnMobile && !collapsed" class="sidebar-overlay" @click="collapsed = true"/>
  </div>  
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "./SideBarMenu.scss";

import appConfig from '../../support/app-config';


const separator = {component: "hr", props:{style:"border-color: rgba(255, 255, 255, 0.1); margin: 10px;"}};

export default {
  props: {
      width:{
        type:String
      },
  },
  components: {
    SidebarMenu
  },
  data() {
    return {
      collapsed: false,
      isOnMobile: false,
      logo:{
          component: "img",
          props:{src:require('../../assets/a_rosso.png'),width:"48", class:"ml-1"},
          hidden: false,
      },
      menu: [],
    };
  },
  watch:{
    collapsed(){
      this.emitCollapsed();
    }
  },
  methods: {
    updateItems() {
      this.menu=[];
      this.menu.push(this.logo);
      let itemsFromConfig = appConfig.getItems();
      for (let i=0;i<itemsFromConfig.length;i++){

          let item = this.createItem(itemsFromConfig[i]);
          if (itemsFromConfig[i].subItems){
            item.child = this.createChild(itemsFromConfig[i].subItems);
          }
          
          this.menu.push(item);
        //   console.log(itemsFromConfig[i]);
      }  
      
    },
    createItem(data){
      let item ={};
      if (data.seperator){
            return separator;
      }else if(data.noLink){
        item = {
          title:data.name, 
        };
      }else{
        item = {
          href:data.path, 
          title:data.name, 
        };
      } 

      if (data.img){
        item.icon = {
            element: "side-bar-menu-icon",
            attributes: { 
              name: data.img 
            },
        }
      }

      if (data.alarmBadge){
        item.badge = {
            element: "alarm-badge",
            attributes: { 
              filter: data.path,
            },
        }

      }
      return item;
    },
    createChild(subitems){
      let child=[];
       for(let i=0;i<subitems.length;i++){
         child.push(this.createItem(subitems[i]));
       }
       return child;
    },	

    onToggleCollapse (collapsed) {
    //   console.log(collapsed)
      this.collapsed = collapsed
    },
    // onItemClick (event, item, node) {
    //   console.log('onItemClick')
    //   console.log(event)
    //   console.log(item)
    //   console.log(node)
    // },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        // this.collapsed = false
      }
    },
    emitCollapsed(){
        this.$emit('collapsed', this.collapsed);
        this.$emit('isOnMobile', this.isOnMobile);
    }
  },
  mounted() {
    appConfig.subscribe(this);
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.emitCollapsed();
  },
  destroyed() {
    appConfig.unsubscribe(this);
    window.removeEventListener('resize', this.onResize)
  }
};
</script>
<style lang="scss">


.vsm--item svg {
  fill: white;
}

.vsm--toggle-btn svg {
  fill: white;
} 
</style>
<template>
  <b-table class="table-style mb-0" small :items="tableItems" striped></b-table>
</template>

<script>
import scadaControler from '../../modules/scada/scadaController'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    fields:{
      type:Object
    }
  },
  data () {
    return {
      tableItems:[],      
    }
  },  
  methods:{
    notify(){
       this.calcTableItems(); 
    },
    calcTableItems(){
      var items = [];
      for (let i = 0; i < this.items.length; i++) {
        let row = {};
        for (let j = 0; j < this.items[i].length; j++) {
          let value;
          if (this.items[i][j].value == "?"){
            value = this.items[i][j].value;
          }else if (this.fields!=null&&(this.items[i][j].field in this.fields)){
              value = this.fields[this.items[i][j].field].expression(
              this.items[i][j].value
            );
          }else{
            value = this.items[i][j].value;
          }
          row[this.items[i][j].field] = value;
        }
        items.push(row);
      }

      this.tableItems = items;
    }
  },

  mounted() {
    scadaControler.registerObserver(this);

    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items[i].length; j++) {
        scadaControler.add(this.items[i][j]);
      }
    }

  },
  destroyed() {
    scadaControler.unregisterObserver(this);  

    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items[i].length; j++) {
        scadaControler.remove(this.items[i][j]);
      }
    }
  }
};
</script>


<style lang="scss">

</style>
<template>
  <div v-if=show>
    <slot></slot>
  </div>
</template>

<script>
import scadaControler from '../../modules/scada/scadaController'


export default {
  data() {
    return {
      scadaObject: { tag: this.tag, value: "" },
    };
  },
  props: {
    tag: {
      type: String,
      required: true,
    },
    hideValue:{
        type: Number,
        default:1,
    }
  },
  computed: {
    show() {
        if ((!isNaN(this.scadaObject.value) && this.scadaObject.value==this.hideValue)||isNaN(this.scadaObject.value)){
            return false;
        }else{
            return true;
        }

    },
  },
  mounted() {
    scadaControler.add(this.scadaObject);
  },

  destroyed() {
    scadaControler.remove(this.scadaObject);
  },
};
</script>
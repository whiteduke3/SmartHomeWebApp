<template>
    <svg viewBox="0 0 400 200" width="400" height="200" style="overflow: visible;">
      <g id="lightsOffMain">
        <rect class="lightsOffButton cursor-pointer" @click="lightsOffMain()" x="0" y="0" rx="10" ry="10" width="60" height="50" fill="#3d4d6b" stroke="#3d4d6b" stroke-width="3px" />
        <text x="20%" y="35" fill="#dcdcdc" class="description-text" font-size="25px" font-weight="bold">Izklop luči glavni del</text>
        <image class="cursor-pointer" @click="lightsOffMain()" x="-10" y="5" width="20%" height="20%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
      </g>
      <g id="lightsOffApartUp">
        <rect class="lightsOffButton cursor-pointer"  @click="lightsOffApartUp()" x="0" y="60" rx="10" ry="10" width="60" height="50" fill="#3d4d6b" stroke="#3d4d6b" stroke-width="3px" />
        <text x="20%" y="90" fill="#dcdcdc" class="description-text" font-size="25px" font-weight="bold">Izklop luči zgornji apartma</text>
        <image class="cursor-pointer" @click="lightsOffApartUp()" x="-10" y="65" width="20%" height="20%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
      </g>
    </svg>
</template>

<script>
import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';

export default {
  name: 'lightsOffNadstropje',
  props: {
    tagLightsOffMain: {
        type: String,
        required: true
    },
    tagLightsOffApartUp: {
      type: String
    }
  },
  data() {
    return {

    };
  },
  methods: {
    async lightsOffMain() {
      let command = [this.tagLightsOffMain, 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },
    async lightsOffApartUp() {
      let command = [this.tagLightsOffApartUp, 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },

  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#lightsOffMain, #lightsOffApartUp {
  transition: all 0.5s ease;
  &:focus {
    transform: scale(1.1);
  }
}

</style>
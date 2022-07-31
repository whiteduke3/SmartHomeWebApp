<template>
    <svg viewBox="0 0 400 200" width="400" height="200" style="overflow: visible;">
      <g id="lightsOffMain">
        <rect class="lightsOffButton cursor-pointer" @click="lightsOffMain()" x="0" y="0" rx="10" ry="10" width="60" height="50" fill="#3d4d6b" stroke="#3d4d6b" stroke-width="3px" />
        <text x="20%" y="35" fill="#dcdcdc" class="description-text" font-size="25px" font-weight="bold">Izklop luči glavni del</text>
        <image class="cursor-pointer" @click="lightsOffMain()" x="-10" y="5" width="20%" height="20%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
      </g>
      <g id="lightsOffApartDown">
        <rect class="lightsOffButton cursor-pointer"  @click="lightsOffApartDown()" x="0" y="60" rx="10" ry="10" width="60" height="50" fill="#3d4d6b" stroke="#3d4d6b" stroke-width="3px" />
        <text x="20%" y="90" fill="#dcdcdc" class="description-text" font-size="25px" font-weight="bold">Izklop luči spodnji apartma</text>
        <image class="cursor-pointer" @click="lightsOffApartDown()" x="-10" y="65" width="20%" height="20%" href='../../assets/floor-plan/svg/light-bulb.svg'/>
      </g>
    </svg>
</template>

<script>
import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';

export default {
  name: 'lightsOffPritlicje',
  props: {
    tagLightsOffMain: {
        type: String,
        required: true
    },
    tagLightsOffApartDown: {
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
    async lightsOffApartDown() {
      let command = [this.tagLightsOffApartDown, 1];
      await Comm.restWriteCall(command);
      scadaController.callRest();
    },

  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#lightsOffMain, #lightsOffApartDown {
  transition: all 0.5s ease;
  &:focus {
    transform: scale(1.1);
  }
}

</style>
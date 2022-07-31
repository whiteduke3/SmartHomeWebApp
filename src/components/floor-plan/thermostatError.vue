<template>
    <svg viewBox="0 0 150 150" width="150" height="150" style="overflow: visible;">
        <g :id="String(_uid)">
          <image v-if="this.thermostatSensorErrorObject.value > 0" x="0%" y="0%"  width="30%" height="30%" href='../../assets/floor-plan/svg/generalwarning.svg'/>
        </g>

    </svg>
</template>

<script>
import scadaController from '../../modules/scada/scadaController';

export default {
    props: {
        tagThermostatSensorError: {
            type: String,
            required: true
        },
    },
    
    data() {
        return {
            thermostatSensorErrorObject: {
                tag: this.tagThermostatSensorError,
                value: null
            },

        };
    },

    mounted() {
        scadaController.add(this.thermostatSensorErrorObject);
    },

    destroyed() {
        scadaController.remove(this.thermostatSensorErrorObject);
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

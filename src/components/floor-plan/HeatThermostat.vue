<template>
    <svg viewBox="0 0 150 150" class="cursor-pointer" :width="this.thermostatWidth" :height="this.thermostatHeight" style="overflow: visible;">
        <text :id="String(_uid)" x="0%" y="0%" class="thermostatNameDesc" >{{ valueTempObject.value }}°C</text>

        <b-popover :target="String(_uid)" triggers="click blur" placement="top" custom-class="thermostatPopover">
            <svg width="200" height="120" viewBox="0 0 200 120">
                <text id="naslov" x="50%" y="15%" font-size="11px" fill="white" text-anchor="middle" dominant-baseline="middle">Nastavitve termostata</text>
                <text x="5%" y="40%" font-size="11px" style="fill: white;">Željena temperatura: {{ Math.floor(thermostatSetPointObject.value) }}°C</text>
                <foreignObject x="0%" y="0%" width="200" height="100" style="margin: 0; padding: 0;">
                    <div style="display: flex; align-items: center;">
                        <p class="mr-1 mt-3 cursor-pointer" @click="decreaseTemp()" style="color: white; font-size: 90px; font-family: 'Menlo', 'Lucida Console', 'Monaco', 'Consolas', monospace;">-</p>
                        <b-form-input id="heatingTemp" type="text" size="sm" :value="Math.floor(thermostatSetPointObject.value)" autofocus readonly></b-form-input>
                        <p class="ml-2 mt-1 cursor-pointer" @click="increaseTemp()" style="color: white; font-size: 70px; font-family: 'Menlo', 'Lucida Console', 'Monaco', 'Consolas', monospace;">+</p>
                    </div>
                </foreignObject>
            </svg>
        </b-popover>

    </svg>
</template>

<script>
import scadaController from '../../modules/scada/scadaController';
import Comm from "../../modules/rest/restCommunication";


export default {
    props: {
        tagThermostatValueTemp: {
            type: String,
            required: true
        },

        tagThermostatSetPoint: {
            type: String,
            required: true
        },

        thermostatWidth: {
            type: Number,
            required: true
        },

        thermostatHeight: {
            type: Number,
            required: true
        }
    },
    
    data() {
        return {
            valueTempObject: {
                tag: this.tagThermostatValueTemp,
                value: null
            },

            thermostatSetPointObject: {
                tag: this.tagThermostatSetPoint,
                value: null
            }
        };
    },

    methods: {

        async decreaseTemp() {
            if(Number(this.thermostatSetPointObject.value) > 16) { //dodati && this.thermostatSetPointObject.value) < 26
                let tempVal = Number(this.thermostatSetPointObject.value) - 1;
                let command = [this.thermostatSetPointObject.tag, String(tempVal)];
                await Comm.restWriteCall(command);
                scadaController.callRest();
            }
        },

        async increaseTemp() {
            if(Number(this.thermostatSetPointObject.value) < 26) { //dodati && this.thermostatSetPointObject.value) > 16
                let tempVal = Number(this.thermostatSetPointObject.value) + 1;
                let command = [this.thermostatSetPointObject.tag, String(tempVal)];
                await Comm.restWriteCall(command);
                scadaController.callRest();
            }
        }
    },

    mounted() {
        scadaController.add(this.valueTempObject);
        scadaController.add(this.thermostatSetPointObject);
    },

    destroyed() {
        scadaController.remove(this.valueTempObject);
        scadaController.remove(this.thermostatSetPointObject);
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.thermostatNameDesc {
  fill: white;
  font: bold 27px sans-serif;
  opacity: 0.8;
}

#heatingTemp {
    max-width: 80px;
}

</style>

<style>
.thermostatPopover {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  filter: drop-shadow(0px 0px 10px black);
  border-color: rgb(100, 100, 100, 0.7);

}

.thermostatPopover .arrow {
  all: unset !important;
  visibility: hidden !important;
}

.thermostatPopover .popover-body {
    padding: 10px;
}


</style>
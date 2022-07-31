<template>
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" :width="this.sensorWidth" :height="this.sensorHeight" style="overflow: visible;">
        <g :id="String(_uid)">
            <rect id="clickArea" class="cursor-pointer" x="0%" y="0%" :width="this.sensorWidth/5" :height="this.sensorHeight/3" fill="transparent" stroke="transparent" stroke-width="1px"/>
            <path x="0%" y="0%" :fill="this.strokeFillColor" fill-opacity="0.8" :stroke="this.strokeFillColor" stroke-width="1px" stroke-opacity="0.8" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            <text x="0%" y="75%" class="sensorBrightnessLevel">{{ Math.floor(this.brightnessScadaObject.value) }} lux</text>
        </g>


        <b-popover :target="String(_uid)" triggers="click blur" placement="top" ref="sensorsPopoverRef" custom-class="sensorPopover">
            <svg width="250" height="200" viewBox="0 0 200 200">

                <text id="naslov" x="50%" y="25" fill="white" text-anchor="middle" dominant-baseline="middle">Minimalna svetilnost: {{this.minBrightnessScadaObject.value}}</text>
                <foreignObject x="-10" y="45" width="220" height="55" style="overflow: visible; text-align: center;">
                    <div class="text-input">
                        <input type="text" id="svetilnostInput" placeholder="Vnesi vrednost" autofocus v-model="newBrightnessValue" ><br>
                        <button type="button" id="svetilnostButton" @click="updateSensorMinBrightnessValue(newBrightnessValue)">Nastavi</button>
                    </div>
                </foreignObject>
                <text v-if="this.disabledScadaObject.value == false || this.disabledScadaObject.value == 0" id="promptDisabled" x="50%" y="70%" fill="white" text-anchor="middle" dominant-baseline="middle">Ali želite onemogočiti ta senzor?</text>
                <text v-if="this.disabledScadaObject.value == true || this.disabledScadaObject.value == 1" id="promptDisabled" x="50%" y="70%" fill="white" text-anchor="middle" dominant-baseline="middle">Ali želite omogočiti ta senzor?</text>
                <text v-if="this.disabledScadaObject.value == '?'" id="promptDisabled" x="48%" y="70%" fill="white" text-anchor="middle" dominant-baseline="middle">Stanje senzora ni definirano</text>
                <g v-if="this.disabledScadaObject.value == false || this.disabledScadaObject.value == 0" class="cursor-pointer">
                    <g id="answerYes" @click="disableSensor(); closePopover()">
                        <rect class="yesButton" x="15%" y="80%" rx="5" ry="5" width="60" height="20" fill="#007bff" stroke="#007bff" stroke-width="3px" />
                        <text class="description-text" x="25%" y="87%" fill="#dcdcdc" font-size="14px">DA</text>
                    </g>
                    <g id="answerNo" @click="closePopover()">
                        <rect class="noButton" x="55%" y="80%" rx="5" ry="5" width="60" height="20" fill="#6c757d" stroke="#6c757d" stroke-width="3px" />
                        <text class="description-text" x="65%" y="87%" fill="#dcdcdc" font-size="14px">NE</text>
                    </g>
                </g>
                <g v-if="this.disabledScadaObject.value == true || this.disabledScadaObject.value == 1" class="cursor-pointer">
                    <g id="answerYes" @click="enableSensor(); closePopover()">
                        <rect class="yesButton" x="15%" y="80%" rx="5" ry="5" width="60" height="20" fill="#007bff" stroke="#007bff" stroke-width="3px" />
                        <text class="description-text" x="25%" y="87%" fill="#dcdcdc" font-size="14px" font-weight="bold">DA</text>
                    </g>
                    <g id="answerNo" @click="closePopover()">
                        <rect class="noButton" x="55%" y="80%" rx="5" ry="5" width="60" height="20" fill="#6c757d" stroke="#6c757d" stroke-width="3px" />
                        <text class="description-text" x="65%" y="87%" fill="#dcdcdc" font-size="14px" font-weight="bold">NE</text>
                    </g>
                </g>
                <g v-if="this.disabledScadaObject.value == '?'" class="cursor-pointer">
                    <text class="description-text" x="0" y="85%" fill="#dcdcdc" font-size="14px">Ni možno spreminjati senzorja</text>
                </g>
            </svg>
        </b-popover>    
    </svg>
</template>

<script>
import Comm from "../../modules/rest/restCommunication";
import scadaController from '../../modules/scada/scadaController';

export default {
    props: {
        tagMinBrightness: {
            type: String,
            required: true
        },
        tagOutput: {
            type: String,
            required: true
        },
        tagDisabled: {
            type: String,
            required: true
        },
        tagBrightness: {
            type: String,
            required: true
        },
        sensorWidth: {
            type: Number,
            required: true
        },
        sensorHeight: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            minBrightnessScadaObject: {
                tag: this.tagMinBrightness,
                value: null
            },
            outputScadaObject: {
                tag: this.tagOutput,
                value: null
            },
            disabledScadaObject: {
                tag: this.tagDisabled,
                value: null
            },
            brightnessScadaObject: {
                tag: this.tagBrightness,
                value: null
            },
            
            strokeFillColor: "#ffffff",
            newBrightnessValue: null,
        };
    },
    methods: {
        async updateSensorMinBrightnessValue(value) {
            if(!isNaN(value)) {
                this.minBrightnessScadaObject.value = value;
                let command = [this.minBrightnessScadaObject.tag, Number(this.minBrightnessScadaObject.value)];
                await Comm.restWriteCall(command);
            }
        },
        async disableSensor() {
            let command = [this.disabledScadaObject.tag, 1];
            await Comm.restWriteCall(command);
            scadaController.callRest();
        },

        async enableSensor() {
            let command = [this.disabledScadaObject.tag, 0];
            await Comm.restWriteCall(command);
            scadaController.callRest();
        },

        closePopover() {
            this.$refs.sensorsPopoverRef.$emit('close')
        },

    
    },

    watch: {
        'outputScadaObject.value': function(val) {
            if(val == 1) {
                this.strokeFillColor = "#28a745";
            } else {
                this.strokeFillColor = "#ffffff";
            }
        },
        'disabledScadaObject.value': function(val) {
            if(val == "true" || val == 1) {
                this.strokeFillColor = "red";
            } else {
                this.strokeFillColor = "#ffffff";
            }
        },

        'minBrightnessScadaObject.value': function(newVal, oldVal) {
            if(newVal != oldVal) {
                this.newBrightnessValue = newVal;
            }
        }
    },
    mounted() {
        scadaController.add(this.minBrightnessScadaObject);
        scadaController.add(this.outputScadaObject);
        scadaController.add(this.disabledScadaObject);
        scadaController.add(this.brightnessScadaObject);
    },

    destroyed() {
        scadaController.remove(this.minBrightnessScadaObject);
        scadaController.remove(this.outputScadaObject);
        scadaController.remove(this.disabledScadaObject);
        scadaController.remove(this.brightnessScadaObject);
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.sensorBrightnessLevel {
    fill: white;
    font: bold 7px sans-serif;
    opacity: 0.7;
}

.text-input {
    border: none;
}

#svetilnostInput {
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 5px;
}



#svetilnostButton {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px 10px;
}

</style>

<style>
.sensorPopover {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  filter: drop-shadow(0px 0px 10px black);
  border-color: rgb(100, 100, 100, 0.7);
}
.sensorPopover .arrow {
  all: unset !important;
  visibility: hidden !important;
}

</style>
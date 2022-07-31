<template>
    <svg viewBox="0 0 50 50" :width="this.heatValveWidth" :height="this.heatValveHeight" style="overflow: visible;">
        <!-- <path id="snakeSymbol" fill="none" :stroke="this.strokeColor" stroke-width="7" stroke-opacity="0.7" d="m 78.422625,105.6658 c 11.343763,-0.10934 22.687505,-0.21868 30.399455,-0.18675 7.71196,0.0319 11.79129,0.20508 14.00439,2.64117 2.2131,2.4361 2.55922,7.1337 -4.04683,8.88306 -6.60605,1.74936 -20.164311,0.55003 -28.175288,0.63331 -8.010977,0.0833 -10.828245,1.64522 -12.101739,3.73896 -1.273495,2.09373 -1.354863,5.16566 5.00146,6.36256 6.356323,1.19689 19.146677,0.64682 26.750307,0.37175 7.60364,-0.27506 10.02039,-0.27511 11.62914,1.20096 1.60874,1.47608 2.40948,4.42828 1.34177,6.56043 -1.06772,2.13215 -4.00356,3.44415 -12.21072,3.55354 -8.20716,0.10938 -21.687252,-0.9841 -28.011936,0.70376 -6.324685,1.68787 -5.495355,6.15664 -3.545596,8.38903 1.949759,2.2324 5.013558,2.22797 12.225499,2.19377 7.211941,-0.0342 18.521453,-0.0979 29.850853,-0.16176" /> -->
        <g transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)" :fill="this.strokeColor" :stroke="this.strokeColor">
            <path d="M137 374 c-3 -4 1 -17 10 -30 17 -27 14 -55 -13 -126 -19 -50 -13 -97 14 -106 11 -3 12 0 3 16 -16 31 -13 68 9 112 24 47 25 71 5 110 -17 32 -18 33 -28 24z"/>
            <path d="M227 374 c-3 -4 1 -17 10 -30 17 -27 14 -55 -13 -126 -19 -50 -13 -97 14 -106 11 -3 12 0 3 16 -16 31 -13 68 9 112 24 47 25 71 5 110 -17 32 -18 33 -28 24z"/>
            <path d="M317 374 c-3 -4 1 -17 10 -30 17 -27 14 -55 -13 -126 -19 -50 -13 -97 14 -106 11 -3 12 0 3 16 -16 31 -13 68 9 112 24 47 25 71 5 110 -17 32 -18 33 -28 24z"/>
        </g> 

    </svg>
</template>

<script>
import scadaController from '../../modules/scada/scadaController';


export default {
    props: {
        tagValveOpenReq: {
            type: String,
            required: true
        },
        heatValveWidth: {
            type: Number,
            required: true
        },

        heatValveHeight: {
            type: Number,
            required: true
        }
    },
    
    data() {
        return {
            valveOpenReqObject: {
                tag: this.tagValveOpenReq,
                value: null
            },

            strokeColor: "#ffffff",
        };
    },

    watch: {
        'valveOpenReqObject.value': function(val) {
            if(val == 1) {
                this.strokeColor = "#b4451f";
            } else {
                this.strokeColor = "#ffffff";
            }
        }
    },

    mounted() {
        scadaController.add(this.valveOpenReqObject);
    },

    destroyed() {
        scadaController.remove(this.valveOpenReqObject);
    }
    

   
    

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>

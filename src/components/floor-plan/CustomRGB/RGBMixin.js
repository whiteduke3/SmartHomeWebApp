import RGBCustomWrapper from "./RGBCustomWrapper.vue"
import RGBLight from "../../../components/floor-plan//RGBLight.vue";
import RGBLightDesc from  "../../../components/floor-plan/RGBLightDesc.vue";
import apartCorner from "./apartCorner.vue";
import bedroomTopFloor from "./bedroomTopFloor.vue"

export default {
    components: {
        "rgb-wrapper": RGBCustomWrapper,
        "rgb-light": RGBLight,
        "rgb-text": RGBLightDesc,
        "ground-corner": apartCorner,
        "bedroom-corner": bedroomTopFloor
    } 
}
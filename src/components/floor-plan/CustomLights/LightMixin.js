import LightCustomWrapper from "./LightCustomWrapper.vue";
import CircleLight from "./RingLight.vue";
import parkingDoubleLight from "./parkingDoubleLight.vue";
import parkingQuadrupleLight from "./parkingQuadrupleLight.vue";
import ThreePartLight from "./ThreePartLight.vue";
import groundTableLight from "./groundTableLight";
import upperTableLight from "./upperTableLight";
import groundStaircaseLight from "./groundStaircaseLight";
import twoPartLight from "./twoPartLight";
import garageLight11 from "./garageLight11";
import garageLight12 from "./garageLight12";
import upperRotated7lights from "./upperRotated7lights";
import Light from "../../../components/floor-plan/Light.vue"
import SvgText from '../../../components/floor-plan/svg-text.vue';

export default {
    components: {
        "light-wrapper": LightCustomWrapper,
        "circle-light": CircleLight,
        "parking-double": parkingDoubleLight,
        "parking-quadruple": parkingQuadrupleLight,
        "light": Light,
        "svg-text": SvgText,
        "light-three": ThreePartLight,
        "light-two": twoPartLight,
        "ground-table-light": groundTableLight,
        "upper-table-light": upperTableLight,
        "ground-staircase-light": groundStaircaseLight,
        "rotated-seven": upperRotated7lights,
        "light-11": garageLight11,
        "light-12": garageLight12
    } 
}
<template>
  <div>
    <b-dropdown size="sm" :text="selectedPeriod" variant="outline-light">
      <b-dropdown-item-button
        v-for="(period, index) in periods"
        @click="changePeriod(period)"
        :key="'periodPicker'+index"
      >{{period.periodName}}</b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>[]

<script>
export default {
  props:{
    selectedPeriodIndex:{
      type:Number,
      default:0,
    }
  },
  data() {
    return {
      periods: [
        { periodTime: 1000 * 60 * 60, periodName: "1 h" },
        { periodTime: 1000 * 60 * 60 * 3, periodName: "3 h" },
        { periodTime: 1000 * 60 * 60 * 6, periodName: "6 h" },
        { periodTime: 1000 * 60 * 60 * 12, periodName: "12 h" },
        { periodTime: 1000 * 60 * 60 * 24, periodName: "1 dan" },
        { periodTime: 1000 * 60 * 60 * 27 * 7, periodName: "7 dni" },
        { periodTime: 1000 * 60 * 60 * 27 * 31, periodName: "1 mesec" }
      ],
      selectedPeriod: null
    };
  },
  methods: {
    changePeriod(val) {
      this.selectedPeriod = val.periodName;
      this.$emit("changed", val.periodTime);
      // console.log(this.selectedPeriod);
    }
  },
  mounted() {
    this.selectedPeriod = this.periods[this.selectedPeriodIndex].periodName;
    this.$emit("changed", this.periods[this.selectedPeriodIndex].periodTime);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.b-dropdown .btn-sm {
  @include smallButton;
}
</style>

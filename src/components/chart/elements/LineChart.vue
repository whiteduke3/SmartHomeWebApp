<template>
  <line-chart :chartData="chartData" :options="options" />
</template> 

<script>
import LineChart from "./lineChart.js";

export default {
  props: {
    inputData: {
      type: Array, //[{label:String, unit:String, data:[{x:long(Date), y:Number}]}]
      required: true
    },
  },
  data() {
    return {
      colors: [
        "#ff1a1a",
        "#1a1aff",
        "green",
        "orange",
        "yellow",
        "pink",
        "DeepSkyBlue",
        "OrangeRed",
        "DarkRed",
        "Purple",
        "MidnightBlue",
        "LightGreen"
      ],
      chartData: {},
      options: {}
    };
  },
  components: { LineChart },
  watch: {
    inputData() {
      this.drawChart();
    }
  },
  mounted() {
    this.drawChart();
  },

  methods: {
    drawChart() {
      var yAxisIds = [];
      this.chartData = this.prepareChartData(yAxisIds);
      this.options = this.prepareOptions(yAxisIds);
    },
    prepareChartData(yAxisIds) {
      let datasets = [];
      for (let i = 0; i < this.inputData.length; i++) {
        let yAxisId = this.inputData[i].unit;
        if (yAxisId == undefined || yAxisId == "") {
          yAxisId = " ";
        }
        if (!yAxisIds.includes(yAxisId)) {
          yAxisIds.push(yAxisId);
        }

        let dataSet = {
          label: this.inputData[i].label + " (" + yAxisId + ")",
          borderColor: this.colors[i],
          backgroundColor: this.colors[i],
          fill: false,
          pointRadius: 0,
          borderWidth: 2,
          yAxisID: yAxisId,
          data: this.inputData[i].data
        };
        datasets.push(dataSet);
      }
      return { datasets: datasets };
    },

    prepareOptions(yAxisIds) {
      let options = {
        maintainAspectRatio: false,
        tooltips: {
          mode: "nearest",
          intersect: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "gray"
              },
              ticks: {
                fontColor: "white",
                callback: function(dataLabel, index, ticks) {
                  if (index == ticks.length - 1) {
                    let date = new Date(ticks[index].value);
                    return [dataLabel, date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()];
                  } else {
                    return dataLabel;
                  }
                }
              },
              type: "time",
              time: {
                displayFormats: {
                  millisecond: "H:mm:ss",
                  second: "H:mm:ss",
                  minute: "H:mm",
                  hour: "H:mm",
                  day: "D MMM"
                }
              }
            }
          ],
          yAxes: this.prepareYAxes(yAxisIds)
        },
        legend: {
          // position:'bottom',
          labels: {
            fontColor: "white"
          }
          // onHover:function(event, legendItem) {console.log(legendItem.text)}
        }
      };

      return options;
    },

    prepareYAxes(yAxisIds) {
      let yAxes = [];
      for (let i = 0; i < yAxisIds.length; i++) {
        let yAxis = {
          id: yAxisIds[i],
          gridLines: {
            display: true,
            color: "gray"
          },
          ticks: {
            fontColor: "white"
          },
          scaleLabel: {
            display: true,
            labelString: yAxisIds[i],
            fontColor: "white"
          }
        };
        yAxes.push(yAxis);
      }
      return yAxes;
    }
  }
};
</script>    

<style scoped lang="scss">
</style>

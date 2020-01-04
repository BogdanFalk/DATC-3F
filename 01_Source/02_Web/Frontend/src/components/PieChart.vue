<template>
  <div id="PieChart"></div>
</template>

<script>
/* eslint-disable no-alert, no-console, no-unused-vars */
import ApexCharts from "apexcharts";
export default {
  data() {
    return {};
  },
  mounted: function() {
    var data = {};
    this.$root.$on("dataForPieChart", dataForPiechart => {
      console.log("Ain't nobody got time for that");
      console.log(dataForPiechart);
      data = dataForPiechart;
    });
    setTimeout(() => {
      var options = {
        chart: {
          type: "donut"
        },

        series: [],
        labels: []
      };
      console.log("Data:" + data);
      data.eventCandidates.forEach(candidate => {
        options.series.push(candidate.numberVotes);
        options.labels.push(candidate.name);
      });
      console.log(options);
      var chart = new ApexCharts(document.querySelector("#PieChart"), options);

      chart.render();
    }, 1500);
  }
};
</script>

<style>
</style>
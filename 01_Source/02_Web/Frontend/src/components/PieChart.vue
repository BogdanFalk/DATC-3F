<template>
  <div id="PieChart"></div>
</template>

<script>
/* eslint-disable no-alert, no-console, no-unused-vars */
import ApexCharts from "apexcharts";
export default {
  data() {
    return {
      data:{}
    };
  },
  mounted:function() {
    this.$root.$on("dataForPieChart", dataForPiechart => {
      console.log("Received data from HomeCarousel");
      console.log(dataForPiechart);
      this.data = dataForPiechart;
        var options = {
        chart: {
          type: "donut"
        },

        series: [],
        labels: []
      };
      console.log("Data:" + this.data);
      this.data.eventCandidates.forEach(candidate => {
        options.series.push(candidate.numberVotes);
        options.labels.push(candidate.name);
      });
      console.log(options);
      var chart = new ApexCharts(document.querySelector("#PieChart"), options);

      chart.render();
    });
  
    
    
  }
};
</script>

<style>
</style>
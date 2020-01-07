<template>
  <div id="PieChartParties"></div>
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
  mounted: function() {  
      this.$root.$on("dataForPieChartParties", dataForPiechartParties => {
      console.log("Received data from HomeCarousel Component.");
      console.log(dataForPiechartParties);
      this.data = dataForPiechartParties;
        var options = {
        chart: {
          type: "donut"
        },

        series: [],
        labels: []
      };
      console.log("Data:" + this.data);
      this.data.eventParties.forEach(party => {
        options.series.push(party.numberVotes);
        options.labels.push(party.name);
      });
      console.log(options);
      var chart = new ApexCharts(document.querySelector("#PieChartParties"), options);

      chart.render();
    });
   
   
 
  }
};
</script>

<style>
</style>
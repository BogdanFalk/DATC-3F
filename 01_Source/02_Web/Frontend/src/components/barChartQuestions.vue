<template>
  <div id="barChart"></div>
</template>


<script>
import ApexCharts from "apexcharts";
export default {
  name: "barChartQuestions",
  mounted() {
    var options = {
      chart: {
        type: "bar"
      },
      series: [
        {
          name: "Voturi",
          data: [10000000,25555555]
        }
      ],
      xaxis: {
        categories: ["DA","NU"]
      }
    };
    var chart = new ApexCharts(document.querySelector("#barChart"), options);

    chart.render();
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

</style>
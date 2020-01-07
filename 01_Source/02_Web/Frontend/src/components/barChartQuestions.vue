<template>
  <div id="barChart"></div>
</template>


<script>
/* eslint-disable no-alert, no-console, no-unused-vars */
import ApexCharts from "apexcharts";
export default {
  data() {
    return {
      data: {},
      alreadyCreatedChart: false
    };
  },
  mounted() {
    this.$root.$on("dataForBarChart", dataForBarchart => {
      if (this.alreadyCreatedChart == false) {
        console.log("Received data from HomeCarousel Component.");
        console.log(dataForBarchart);
        this.data = dataForBarchart;

        var options = {
          chart: {
            type: "bar"
          },
          series: [
            // name: "Voturi",
            // data: [10000000,25555555]
            {
              name: "YES",
              data: []
            },
            {
              name: "NO",
              data: []
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: "top"
              }
            }
          },
          xaxis: {
            categories: []
          }
        };

        console.log("Data:" + this.data.Questions);

        this.data.Questions.forEach(question => {
          options.series[0].data.push(question.questionAnswer_Votes_Yes);
          options.series[1].data.push(question.questionAnswer_Votes_No);
          options.xaxis.categories.push(question.questionTitle);
        });
        console.log(options);
        var chart = new ApexCharts(
          document.querySelector("#barChart"),
          options
        );

        chart.render();
        this.alreadyCreatedChart=true
      }
    });
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}
</style>
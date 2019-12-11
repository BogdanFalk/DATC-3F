<template>
  <div id="PieChart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
 props:{
   candidatesFromHomeCarousel:{
     type: Array,
     required:true
   },
 },
 name: "PieChart",
 mounted() {
    var options = {
      chart: {
        type: 'donut',
      },
    
      series:[60,20,10,10],
      labels: ['Candidate1','Candidate2','Candidate3','Candidate4'],
     
      
    
    };
    var chart = new ApexCharts(document.querySelector("#PieChart"), options);

    chart.render();
  }
};
</script>

<style>


</style>
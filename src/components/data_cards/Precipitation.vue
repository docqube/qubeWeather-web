<template>
    <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <md-card>
            <md-card-header>
                <div class="md-title">Total precipitation</div>
            </md-card-header>

            <md-card-content>
                <line-chart :height="300" :chart-data="chartData"></line-chart>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import LineChart from './LineChart.js'
export default {
    components: {
        LineChart
    },
    data() {
        return {
            chartData: null
        }
    },
    mounted() {
        // get current data
        this.fillData();
        setInterval(() => {
            this.fillData();
        }, 5 * 60 * 1000);
    },
    methods:{
        fillData(){
            var endTime = new Date();
            var startTime = new Date();
            startTime.setDate(endTime.getDate()-1);

            this.$http.get('dailyrainin/'+startTime.toISOString() +'/' + endTime.toISOString()).then(response => {
                var times = new Array();
                var values = new Array();

                response.body.data.forEach(element => {
                    times.push(element.time);
                    values.push(Math.round(parseFloat(element.value)*25.4*100) / 100);
                });
                
                this.chartData = {
                    labels: times,
                    datasets: [{
                        label: 'Total precipitation in mm/m²',
                        pointRadius: 0,
                        pointHoverRadius: 1,
                        pointHitRadius: 10,
                        borderColor: 'rgb(0, 84, 159)',
                        data: values
                    }]
                };
            }, response => {
                console.log("ERROR in AJAX")
            });
        }
    }
}
</script>

<style>
</style>

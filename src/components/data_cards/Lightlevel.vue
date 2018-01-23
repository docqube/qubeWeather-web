<template>
    <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <md-card>
            <md-card-header>
                <div class="md-title">Lightlevel</div>
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

            this.$http.get('lightlevel/'+startTime.toISOString() +'/' + endTime.toISOString()).then(response => {
                var times = new Array();
                var values = new Array();

                response.body.data.forEach(element => {
                    times.push(element.time);
                    values.push(parseFloat(element.value));
                });
                
                this.chartData = {
                    labels: times,
                    datasets: [{
                        label: 'Lightlevel lux',
                        pointRadius: 0,
                        pointHoverRadius: 1,
                        pointHitRadius: 10,
                        borderColor: 'rgb(255, 237, 0)',
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

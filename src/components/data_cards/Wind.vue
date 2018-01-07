<template>
    <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <md-card>
            <md-card-header>
                <div class="md-title">Wind</div>
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

            this.$http.get('?sensor=windspeed&starttime='+encodeURI(startTime.toUTCString())+'&endtime='+encodeURI(endTime.toUTCString())).then(response => {
                var times = new Array();
                var windspeedValues = new Array();

                response.body.response.forEach(element => {
                    times.push(element.time);
                    windspeedValues.push(parseFloat(element.value));
                });

                this.$http.get('?sensor=windgust&starttime='+encodeURI(startTime.toUTCString())+'&endtime='+encodeURI(endTime.toUTCString())).then(response => {
                    var windgustValues = new Array();

                    response.body.response.forEach(element => {
                        windgustValues.push(parseFloat(element.value));
                    });

                    this.chartData = {
                        labels: times,
                        datasets: [{
                            label: 'Wind Speed in km/h',
                            pointRadius: 0,
                            pointHoverRadius: 1,
                            pointHitRadius: 10,
                            borderColor: 'rgb(246, 168, 0)',
                            data: windspeedValues
                        },
                        {
                            label: 'Wind Gusts in km/h',
                            pointRadius: 0,
                            pointHoverRadius: 1,
                            pointHitRadius: 10,
                            borderColor: 'rgb(156, 158, 159)',
                            data: windgustValues
                        }]
                    };
                }, response => {
                    console.error("ERROR in AJAX");
                });

                
            }, response => {
                console.log("ERROR in AJAX")
            });
        }
    }
}
</script>

<style>

</style>


import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data(){
      return {
        options: {
            responsive: true,
            bezierCurve: false,
            title: {
                display: false
            },
            legend: {
                display: false
            },
            scales: {
                xAxes:[{
                    display: true,
                    type: 'time',
                    time: {
                        displayFormats: {
                            hour: 'H.mm'
                        }
                    }
                }],
                yAxes:[{
                    display: true,
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
      };
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}

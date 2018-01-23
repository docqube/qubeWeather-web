<template>
  <div class="md-layout-item md-size-100">
        <md-card>
            <md-card-header>
                <div class="md-display-1">{{ StationName }}</div>
            </md-card-header>

            <md-card-content>
                <md-list class="md-double-line">
                    <div class="md-title">Current Data</div>
                    
                    <md-list-item>
                        <i class="mdi mdi-clock"></i> 
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ lastupdate }}</span>
                        </div>
                    </md-list-item>

                    <div class="whitespace"></div>

                    <md-list-item>
                        <i class="mdi mdi-temperature-celsius"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ temperature }} &deg;C</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-water-percent"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ humidity }} %RF</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-speedometer"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ pressure }} hPa</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-weather-windy-variant"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ wind_speed }} km/h</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-weather-windy"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ wind_gusts }} km/h</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-water"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ precipitation }} mm/m²</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <i class="mdi mdi-white-balance-sunny"></i>
                        <div class="md-list-item-text">
                            <span class="text-mono">{{ lightlevel }} lx</span>
                        </div>
                    </md-list-item>
                </md-list>

                <md-list class="md-double-line">
                    <div class="md-title">WeatherUnderground</div>
                    <md-list-item>
                        <a :href="WundergroundURL" target="_blank">{{WundergroundID}}</a>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
    created() {
        // get station name
        const config = require('../config.json')
        this.StationName = config.station.name
        // insert wunderground link
        this.WundergroundID = config.station.wunderground
        this.WundergroundURL = 'https://www.wunderground.com/personal-weather-station/dashboard?ID='+config.station.wunderground+'#history'

        // get current data
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 5 * 60 * 1000);
    },
    methods: {
        loadData(){
            this.$http.get('temperature').then(response => {
                console.log(response.body.data)
                this.lastupdate = new Date(response.body.data.time).toLocaleString()
                this.temperature = response.body.data.value
            }, response => {
                console.log("ERROR in AJAX")
            });
            
            this.$http.get('humidity').then(response => {
                this.humidity = response.body.data.value
            }, response => {
            });
            
            this.$http.get('pressure').then(response => {
                this.pressure = response.body.data.value
            }, response => {
            });
            
            this.$http.get('windspeed').then(response => {
                this.wind_speed = response.body.data.value
            }, response => {
            });
            
            this.$http.get('windgust').then(response => {
                this.wind_gusts = response.body.data.value
            }, response => {
            });

            this.$http.get('dailyrainin').then(response => {
                this.precipitation = Math.round(response.body.data.value * 25.4 * 100) / 100;
            }, response => {
            });
            
            this.$http.get('lightlevel').then(response => {
                this.lightlevel = response.body.data.value
            }, response => {
            });
        }
    },
    data() {
        return {
            lastupdate: '',
            temperature: '',
            humidity: '',
            pressure: '',
            wind_speed: '',
            wind_gusts: '',
            precipitation: '',
            lightlevel: ''
        };
    }
}
</script>

<style>
.whitespace {
    display: block;
    height: 20px;
}
.mdi {
    margin-right: 10px;
}
.text-mono {
    font-family: 'Source Code Pro', monospace !important;
}
.md-layout.md-gutter > .md-layout-item {
    padding-top: 20px;
    padding-bottom: 20px;
}
.md-list-item-content{
    padding-top: 0;
    padding-bottom: 0;
}
.md-list.md-double-line .md-list-item-content {
    min-height: 30px;
}
</style>


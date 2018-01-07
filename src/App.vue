<template>
<div id="app">
    <md-app>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div>
                    <div class="md-title">qubeWeather station</div>
                </div>

                <div class="md-toolbar-section-end">
                    <md-menu md-size="medium" md-align-trigger>
                        <md-button md-menu-trigger class="md-icon-button">
                            <md-icon>more_vert</md-icon>
                        </md-button>
                        <md-menu-content>
                            <a :href="impressLink"><md-menu-item>Impress</md-menu-item></a>
                            <a href="https://github.com/docqube/qubeWeather-web" target="_blank"><md-menu-item>Source Code</md-menu-item></a>
                            <md-divider></md-divider>
                            <md-menu-item>Version {{ version }}</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
            </div>
        </md-app-toolbar>

        <md-app-content>
            <router-view></router-view>
        </md-app-content>
    </md-app>
</div>
</template>

<script>
import pkg from '../package.json'
import config  from './config.json'

export default {
    data() {
        return {
            version: pkg.version,
            impressLink: null
        }
    },
    created(){
        if(config.impress){
            this.impressLink = config.impress
        }
    }
}
</script>

<style>
.md-divider {
    background-color: rgba(0,0,0,.12);
}
.md-menu-content {
    background: #FFF;
}
</style>

# qubeWeather WebUI

This is the fronted webapp for qubeWeather API written in VueJS.

## Requirements

If you want to build the webapp, you have to install Node.js (Version 8.9). You can download it [here](https://nodejs.org/en/).

To display your station data, you also need a qubeWeather API instance running.

## Configuration

Open the `src/config.json` file and change the options to yours. If you want to link your impress, fill the address of it in the impress option.

## Build

``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Deploy

Upload the builded files from the `dist/` folder to a webserver.

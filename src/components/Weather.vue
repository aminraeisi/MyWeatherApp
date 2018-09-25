<template>
    <b-col class="weather-item">

      <div v-if="loaded">
        <a :href="getCityUrl(location)">
          {{location.title}}
          <div>
            <div>
              <img style='width:40px;' :src="getIcon(location.weather.consolidated_weather[0].weather_state_abbr)">
            </div>
            <span class="temp">
              {{ getTemp(location.weather.consolidated_weather[0].the_temp) }}
            </span>
            <span class="min-temp">
              {{ getTemp(location.weather.consolidated_weather[0].min_temp) }}
            </span>
            <span class="max-temp">
              {{ getTemp(location.weather.consolidated_weather[0].max_temp) }}
            </span>
          </div>
        </a>
      </div>
      <div v-else>Loading...</div>
    </b-col>
</template>

<script>
import axios from 'axios';

export default {
  props: ['initialLocation'],
  data() {
    return {
      loaded: false,
      weatherEndpoint: '/weather.php?command=location&woeid=',
      location: this.initialLocation
    }
  },
  methods: {
    getIcon(state_abbr){
      return 'https://www.metaweather.com/static/img/weather/' + state_abbr + '.svg'
    },
    getWeather() {
        axios(this.weatherEndpoint + this.location.woeid)
        .then(response => {
            this.location.weather = response.data
            this.loaded = true
        })
        .catch( error => {
            console.log(error)
        })
    },
    getTemp(temp){
      return Math.trunc(temp)
    },
    getCityUrl(location){
      return '/#/weather/' + location.woeid;
    }
  },
  created() {
    this.getWeather();
  },
}
</script>

<style>
.weather-item{
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    margin: 10px;
    padding:10px;
    border-radius: 8px;
    border: solid 1px #dedede;
    text-align: center;
}
.weather-item div a{
    text-decoration: none;
}
.temp{
  font-size: 35px;
}
.min-temp{
  color: #0000ff;
  font-size: 15px;
}
.max-temp{
  color: #ff0000;
  font-size: 15px;
}
</style>

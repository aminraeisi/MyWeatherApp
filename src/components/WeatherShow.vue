<template>
    <div>
      <b-container>

      <search></search>

      <div v-if="!loaded">
          Loading...
      </div>
      <div v-else>
        <b-row v-if="found">
          <b-col class="px-2 weather-item">
            {{location.title}}
            <div>
              
              <img style='width:40px;' :src="getIcon(location.consolidated_weather[0].weather_state_abbr)">
              
              <span class="temp">
                {{ getTemp(location.consolidated_weather[0].the_temp) }}
              </span>
              <span class="min-temp">
                {{ getTemp(location.consolidated_weather[0].min_temp) }}
              </span>
              <span class="max-temp">
                {{ getTemp(location.consolidated_weather[0].max_temp) }}
              </span>
              <br>
              <b-row>
                <b-col v-for="day in location.consolidated_weather" class="weather-item">
                  {{ getDayName(day.applicable_date) }}
                  
                  <div>
                    <img style='width:40px;' :src="getIcon(day.weather_state_abbr)">
                  </div>
                  <div>
                    <span class="temp">
                      {{ getTemp(day.the_temp) }}
                    </span>
                    <span class="min-temp">
                      {{ getTemp(day.min_temp) }}
                    </span>
                    <span class="max-temp">
                      {{ getTemp(day.max_temp) }}
                    </span>
                  </div>
                </b-col>
              </b-row>

            </div>
          </b-col>
        </b-row>
        <div v-else class="text-center">
          No results were found.
        </div>
      </div>

      </b-container>
    </div>
</template>


<script>

import axios from 'axios';
import search from './Search'

export default {
  components: {
  search
  },
  data() {
    return {
      loaded: false,
      found: false,
      weatherEndpoint: '/weather.php?command=location&woeid=',
      location: [],
      woeid: this.$route.params.woeid,
    }
  },
  methods: {
    getWeather() {
        axios(this.weatherEndpoint + this.woeid)
        .then(response => {
            this.location = response.data
            this.loaded = true
            this.found = true
        })
        .catch( error => {
            this.loaded = true
        })
    },
    getTemp(temp){
      return Math.trunc(temp)
    },
    getIcon(state_abbr){
      return 'https://www.metaweather.com/static/img/weather/' + state_abbr + '.svg'
    },
    getDayName(date){
      var date = new Date(date);
      return date.toLocaleDateString('en-US', { weekday: 'long' })
    }
  },
  created(){
      this.getWeather()
  }
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

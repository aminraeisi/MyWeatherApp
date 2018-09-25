<template>
  <div>

      <b-container>

        <search></search>

        <b-row>
          <weather
          v-for="(location, index) in locations"
          :initial-location='location' :key="index"></weather>
        </b-row>
      </b-container>

  </div>
</template>

<script>

import weather from './Weather';
import search from './Search';

export default {
  components: {
    weather,
    search
  },
  data () {
    return {
      locations: [
        { title: 'Istanbul', woeid: 2344116},
        { title: 'Berlin', woeid: 638242},
        { title: 'London', woeid: 44418},
        { title: 'Helsinki', woeid: 565346},
        { title: 'Dublin', woeid: 560743},
        { title: 'Vancouver', woeid: 9807}
      ]
    }
  }
}
</script>

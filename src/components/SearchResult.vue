<template>
    <div>
      <b-container>

      <search></search>

      <div v-if="loading">
          Loading...
      </div>
      <div v-else>
        <b-row v-if="locations.length && !loading">
            <weather
            v-for="(location, index) in locations"
            :initial-location='location' :key="index"></weather>
        </b-row>
        <div v-else class="text-center">
          No results were found. Try changing the keyword!
        </div>
      </div>

      </b-container>
    </div>
</template>


<script>

import axios from 'axios';
import search from './Search'
import weather from './Weather';

export default {
  components: {
  weather,
  search
  },
  data() {
    return {
      loading: true,
      searchEndpoint: '/weather.php?command=search&keyword=',
      keyword: this.$route.params.keyword,
      locations: []
    }
  },
  methods: {
    getLocations(keyword) {
        this.loading = true
        axios(this.searchEndpoint + keyword)
        .then(response => {
            this.locations = response.data
            this.loading = false
        })
        .catch( error => {
            console.log(error)
            this.loading = false
        })
    }
  },
  created(){
      this.getLocations(this.keyword)
  },
  beforeRouteUpdate (to, from, next) {
    this.getLocations(to.params.keyword)
    next()
  }
}
</script>
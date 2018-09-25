<template>
    <form class="form-inline" v-on:submit.prevent="handleSubmit()">
        <div class="input-group mb-3 mx-auto">
            <input type="text" v-model="keyword" required class="form-control" placeholder="Instanbul?" aria-describedby="basic-addon1">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click="handleSubmit()">Search</button>
            </div>
        </div>
    </form>
</template>


<script>
import axios from 'axios';

export default {
  props: ['initialKeyword'],
  data() {
    return {
      keyword: this.$route.params.keyword,
    }
  },
  methods: {
    handleSubmit() {
        if(this.keyword){
            this.$router.push({ name: 'search-result', params: { keyword: this.keyword }})
        }
    }
  }
}
</script>

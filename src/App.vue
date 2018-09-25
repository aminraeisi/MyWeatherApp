<template>
  <div id="app">

    <ul class="nav">
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" class="nav-link">MyWeatherApp</router-link>
      </li>
    </ul>

    <router-view class="content"></router-view>

  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .nav{
    background-color: #e2e2e257;
  }
  .content{
    margin-top: 30px;
  }
</style>

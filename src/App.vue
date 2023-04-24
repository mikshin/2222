<template>

  <div id="app">

    <router-link to="/login">Авторизация</router-link>
    <router-link to="/registration">Регистрация</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  #app {
    background: #C99C49;
  }
</style>
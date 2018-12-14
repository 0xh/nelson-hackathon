<template>
  <div>
    <TopNav />
    <nuxt/>
  </div>
</template>

<script>
import TopNav from '~/components/presentational/TopNav'

export default {
  components: {
    TopNav
  }
}
</script>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}
</style>

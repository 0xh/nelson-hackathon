<template>
  <div class="container">
    <left-nav/>
    <main>
      <h1>Chart</h1>
      <random-chart />
    </main>
  </div>
</template>

<script>
import LeftNav from '~/components/presentational/LeftNav'
import RandomChart from '~/components/presentational/RandomChart'

export default {
  components: {
    LeftNav,
    RandomChart
  }
}
</script>

<style lang="scss" scoped>
@import "~bedrock/bedrock.scss";

.container {
  margin-top: spacing(4);
  display: flex
}

</style>

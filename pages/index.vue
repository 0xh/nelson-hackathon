<template>
  <div>
    <h1>ROWER</h1>
    <section class="container">
      <div id="map-wrap" style="height: 600px; width: 100vw;">
        <no-ssr>
          <l-map :zoom="13" :center="getCurrentPosition">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            <l-marker :lat-lng="getCurrentPosition"/>
          </l-map>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getCurrentPosition"])
  }
};
</script>

<style lang="scss" src="./index.scss" scoped>
</style>

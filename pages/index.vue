<template>
  <div>
    <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
    <section class="container">
      <rn-button @click="updateCurrentPosition({axios:$axios})">Update Current Position</rn-button>
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
  },
  methods: {
    ...mapActions(["updateCurrentPosition"])
  }
};
</script>

<style lang="scss" src="./index.scss" scoped>
</style>

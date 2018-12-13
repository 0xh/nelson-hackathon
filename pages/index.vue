<template>
  <div>
    <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
    <section class="container">
      <rn-button @click="updateStore({axios:$axios})">Update Current Position</rn-button>
      <div id="map-wrap" style="height: 600px; width: 100vw;">
        <no-ssr>
          <l-map :zoom="13" :center="getCurrentPosition">
            <l-wms-tile-layer
              base-url="https://pepys.nelson/geoserver/ows"
              layers="Hackathon_Geo:GBR_Basemap"
              visible="true"
              name="GBR Basemap"
              layer-type="base" />
            <li v-for="pos in getVesselPositions" :key="pos.lat">
              <l-marker :lat-lng="pos"/>
            </li>
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
    ...mapGetters(["getCurrentPosition", "getVesselPositions"])
  },
  methods: {
    ...mapActions(["updateStore"])
  }
};
</script>

<style lang="scss" src="./index.scss" scoped>
</style>

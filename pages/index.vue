<template>
  <div>
    <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
    <section class="container">
      <rn-button @click="updateStore({axios:$axios})">Update Current Position</rn-button>
      <div id="map-wrap" style="height: 600px; width: 100vw;">
        <no-ssr>
          <l-map :zoom="13" :center="getCurrentPosition">
            <!-- <l-wms-tile-layer
              base-url="https://pepys.nelson/geoserver/ows"
              layers="Hackathon_Geo:GBR_Basemap"
              :visible="true"
              name="GBR Basemap"
              layer-type="base"
            />-->
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            <li v-for="pos in getVesselPositions" :key="pos.lat">
              <l-marker :lat-lng="pos" :icon="icon"/>
            </li>
            <l-marker :lat-lng="getCurrentPosition" :icon="icon"/>
          </l-map>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LMap, LTileLayer, LWMSTileLayer, LMarker, LIcon } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    "l-wms-tile-layer": LWMSTileLayer,
    LIcon
  },
  data() {
    return {
      icon: L.icon({
        iconUrl: "/svg/boat.svg",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    };
  },
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

<template>
  <div>
    <section class="container">
      <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
      <h2>Developed by Admiral Hackbar ("It's a hack!")</h2>
      <rn-button @click="updateStore({axios:$axios})">Update Current Position</rn-button>
      <br>
      <div id="map-wrap" style="height: 600px; width: 100vw;">
        <no-ssr>
          <l-map :zoom="13" :center="getCurrentPosition">
            <l-wms-tile-layer
              base-url="https://pepys.nelson/geoserver/ows"
              layers="Hackathon_Geo:GBR_Basemap"
              :visible="true"
              name="GBR Basemap"
              layer-type="base"
            />
            <!-- <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/> -->
            <li v-for="pos in getVesselPositions" :key="pos.lat">
              <l-marker :lat-lng="pos" :icon="detectedShipIcon"/>
            </li>
            <l-marker :lat-lng="getCurrentPosition" :icon="userShipIcon"/>
          </l-map>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
import GraphQlExample from "../components/containers/GraphqlExample";
import gql from "graphql-tag";
import { mapGetters, mapActions } from "vuex";

const dataSources = gql`
  query {
    dataSources(id: "107893f3155a4ff5b725be4c1d85aadb") {
      ... on RadarTrackDataSource {
        sensorTracks(orderDirection: Ascending) {
          timeOfInformation
          sensorTrackID
          trackPhase
          position {
            ... on PolarPosition {
              azimuth
              range
            }
          }
          velocity {
            ... on WGS84Velocity {
              course
              speed
            }
          }
        }
      }
    }
  }
`;
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
      loading: 0,
      dataSources: [],
      userShipIcon: L.icon({
        iconUrl: "/svg/boat.svg",
        iconSize: [42, 47],
        iconAnchor: [21, 47]
      }),
      detectedShipIcon: L.icon({
        iconUrl: "/svg/information-circle.svg",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      shipWarningIcon: L.icon({
        iconUrl: "/svg/warning-red.svg",
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
  },
  apollo: {
    $loadingKey: "loading",
    dataSources: {
      query: dataSources
    }
  }
};
</script>

<style lang="scss" src="./index.scss" scoped>
</style>

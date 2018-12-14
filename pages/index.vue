<template>
  <div>
      <rn-alert v-if="getWarning" title="WARNING" state="danger" class="warning">
        Swarm attack pattern detected
      </rn-alert>    <section class="container">
      <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
      <h2>Swarm Attack Warning Mode</h2>
      <h4>Developed by Admiral Hackbar ("It's a hack!")</h4>
      <rn-button @click="updateStore({axios:$axios})">Update Current Position</rn-button>
      <br>
      <div id="map-wrap" style="height: 400px; width: 1000px;">
        <no-ssr>
          <l-map :zoom="10" :center="getCurrentPosition">
            <l-wms-tile-layer
              base-url="https://pepys.nelson/geoserver/ows"
              layers="Hackathon_Geo:GBR_Basemap"
              :visible="true"
              name="GBR Basemap"
              layer-type="base"
            />
            <!-- <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/> -->
            <li v-for="pos in getVesselPositions" :key="pos.lat">
              <l-marker v-if="getWarning && Math.random() > 0.5" :lat-lng="pos" :icon="shipWarningIcon"/>
              <l-marker v-else :lat-lng="pos" :icon="detectedShipIcon"/> 
            </li>
            <l-marker :lat-lng="getCurrentPosition" :icon="userShipIcon">
              <!-- <l-popup :content="getCurrentUserShipDataAsString"/> -->
            </l-marker>
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
import {
  LMap,
  LTileLayer,
  LWMSTileLayer,
  LMarker,
  LIcon,
  LPopup
} from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    "l-wms-tile-layer": LWMSTileLayer,
    LIcon,
    LPopup
  },
  data() {
    return {
      loading: 0,
      dataSources: [],
      userShipIcon: L.icon({
        iconUrl: "/svg/boat.svg",
        iconSize: [42, 48],
        iconAnchor: [21, 24]
      }),
      detectedShipIcon: L.icon({
        iconUrl: "/svg/information-circle.svg",
        iconSize: [32, 38],
        iconAnchor: [16, 19]
      }),
      shipWarningIcon: L.icon({
        iconUrl: "/svg/warning-red.svg",
        iconSize: [32, 38],
        iconAnchor: [16, 19]
      })
    };
  },
  computed: {
    ...mapGetters([
      "getCurrentPosition",
      "getVesselPositions",
      "getCurrentUserShipDataAsString",
      "getWarning"
    ])
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

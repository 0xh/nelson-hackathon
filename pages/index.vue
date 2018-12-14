<template>
  <div>
    <h1>Rule-based Offensive Warnings En-Route (ROWER)</h1>
    <section class="container">
      <ul>
        <li v-if="loading">Loading...</li>
        <li
          v-for="source in dataSources"
          :key="source.timeOfInformation"
        >{{source.timeOfInformation}}</li>
      </ul>
      <rn-button @click="updateStore({axios:$axios})">Update Current Position</rn-button>
      <div id="map-wrap" style="height: 600px; width: 100vw;">
        <no-ssr>
          <l-map :zoom="13" :center="getCurrentPosition">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
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

export default {
  computed: {
    ...mapGetters(["getCurrentPosition", "getVesselPositions"])
  },
  methods: {
    ...mapActions(["updateStore"])
  },
  data: () => ({
    loading: 0,
    dataSources: []
  }),
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

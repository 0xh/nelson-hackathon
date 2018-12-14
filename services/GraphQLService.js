import ApolloClient from "apollo-boost";

export default {
  async getCurrentPosition(axios) {
    try {
      let query = `query{
        dataSources{
          ... on NavigationDataSource{
            navigationUpdates(type: Position, limit: 1 ) {
              ... on NavigationPosition{
                timeOfInformation
                position{
                  ... on WGS84Position{
                    latitude
                    longitude
                  }
                }
              }
            }
          }
        }
      }`;

      const response = await axios.post("https://pepys.nelson/requests", {
        query: query
      });
      console.log(
        "current pos stuff",
        response.data.data.dataSources[1].navigationUpdates[0]
      );
      return response.data.data.dataSources[1].navigationUpdates[0];
    } catch (e) {
      console.log("err", e);
    }
  },
  async getCurrentVesselAisData(axios, currentPosition) {
    try {
      //TODO remove hard coding when data is sorted out
      var currentTime = "2018-05-01T08:16:46.000Z"; //currentPosition.timeOfInformation;
      var currentTimePlusIncrement = "2018-05-01T23:59:46.000Z"; //currentTime.substring(0, currentTime.length - 2) + "1Z";
      let query = `query{
        dataSources(id: "80f486a257624523946c5e80b0fcbe89") {
          ... on AisDataSource{
            messages(type: Position, filter:{ receivedTime: { timeGte: "${currentTime}", timeLt: "${currentTimePlusIncrement}"} }) {
              ... on AisPositionBroadcast {
                mmsi
                receivedTime
                position {
                  latitude
                  longitude
                }
                heading
                velocity {
                  course
                  speed
                }
              }
            }
          }
        }
      }`;

      const response = await axios.post("https://pepys.nelson/requests", {
        query: query
      });
      console.log(
        "vessel ais stuff",
        response.data.data.dataSources[0].messages
      );
      return response.data.data.dataSources[0].messages;
    } catch (e) {
      console.log("err", e);
    }
  }
};

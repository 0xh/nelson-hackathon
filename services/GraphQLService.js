import ApolloClient from "apollo-boost";

async function getData(axios, query) {
  try {
    console.log('getting data')
    const response = await axios.post('https://pepys.nelson/requests', {
      query
    });

    console.table(response.data.data)
    return response.data.data
  } catch (e) {
    console.log('getdata err', e)
  }
}
export default {
  async getCurrentPosition(axios) {
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
      }`

      const response = await getData(axios, query);
      return response.dataSources[1].navigationUpdates[0].position;

  },
  async getCurrentVelocity(axios) {
      let query = `query{
        dataSources(id:"07b6df858018425d96f6d10a77034bbf"){
          ... on NavigationDataSource{
            navigationUpdates(type: Velocity, limit: 1) {
              ... on NavigationVelocity{
                timeOfInformation
                absoluteVelocity{
                  ... on WGS84Velocity{
                    speed
                    course
                  }
                }
              }
            }
          }
        }
      }`
      const response = await getData(axios, query);
      return response.dataSources[0].navigationUpdates[0].absoluteVelocity;
  }
}

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
      }`

      const response = await axios.post('https://pepys.nelson/requests', {
        query: query
      })
      console.log('thing', response)
      return response.data;
    } catch (e) {
      console.log('err', e)
    }
  }
}

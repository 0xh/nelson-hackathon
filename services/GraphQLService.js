export default {
  getCurrentPosition(axios) {
    console.log('hello')
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
      return axios.post('graphql/', {
        query: query
      })

      return Promise.resolve({ lat: 56.059525, lng: -4.823311 })
    } catch (e) {
      console.log('err', e)
    }
  }
}

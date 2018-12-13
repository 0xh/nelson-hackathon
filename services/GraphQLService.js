export default {
  getCurrentPosition(axios, timestamp) {
    try {
      let query = '{  }'
      // return axios.post('/graphql', {
      //   query: query
      // })

      return Promise.resolve({ lat: 56.059525, lng: -4.823311 })
    } catch (e) {
      console.log('err', e)
    }
  }
}

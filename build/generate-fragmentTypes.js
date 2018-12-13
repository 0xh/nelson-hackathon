/* eslint no-console: 0 */
'use strict'

const fetch = require('node-fetch')
const fs = require('fs')
const config = require('../config.json')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 // ignore certificate issues

fetch(`${config.GRAPHQL_API_HOST}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // filter out type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    )
    result.data.__schema.types = filteredData

    // write fragmentTypes.json
    fs.writeFile('./build/fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })
  .catch(err => {
    console.error('Error fetching GraphQL schema', err)
  })

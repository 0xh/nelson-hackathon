<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :width="600"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.getRandomData()
          }, {
            label: 'Data One',
            backgroundColor: '#ffcc33',
            data: this.getRandomData()
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getRandomData () {
      const data = []

      for (let pos = 0; pos < 20; pos += 1) {
        data.push(this.getRandomInt())
      }

      return data
    }

  }
}
</script>

<style>
  .small {
    margin:  0 auto;
  }
</style>

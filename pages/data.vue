<template>
  <div class="container">
    <left-nav/>
    <main>
      <h1>Data</h1>
      <rn-table :caption="caption" :headings="headings" :tableData="tableData"/>
    </main>
  </div>
</template>

<script>
import LeftNav from '~/components/presentational/LeftNav'

export default {
  components: {
    LeftNav
  },
  data: () => ({
    caption: 'Whoever heard of a snozzberry?',
    headings: [
      'Ferry Name',
      'In Service',
      'From',
      'To',
      'Capacity'
    ],
    tableData: [
      ['St Faith', 2001, 'Isle of Wight', 'Portsmouth', 500],
      ['St Cecilia', 2003, 'Portsmouth', 'Southampton', 340],
      ['St Clare', 1993, 'Portsmouth', 'Isle of Wight', 225],
      ['Wight Sun', 2008, 'Gosport', 'Portsmouth', 65]
    ]
  })
}
</script>

<style lang="scss" scoped>
@import "~bedrock/bedrock.scss";

.container {
  margin-top: spacing(4);
  display: flex
}

</style>

<template>
  <div class="left-nav">
    <rn-nav orientation="vertical" :navItems="navItems"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        url: '/chart',
        label: 'Chart'
      },
      {
        url: '/form',
        label: 'Form'
      },
      {
        url: '/data',
        label: 'data'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
  @import "~bedrock/bedrock.scss";

  .left-nav {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: spacing(8);
    margin-top: spacing(4);
    padding-right: spacing(12);

    border-right: 1px solid color(30);
  }

</style>

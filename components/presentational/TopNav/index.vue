<template>
  <header>
    <a href="/">
      <img src="~/static/png/nelson-logo.png" class="logo-image" alt="Nelson Logo">
    </a>

    <div class="top-nav">
      <rn-nav orientation="horizontal" :navItems="navItems"/>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      navItems: [
        {
          url: '/',
          label: 'Home'
        },
        {
          url: '/chart',
          label: 'Link 1'
        },
        {
          url: '/example2',
          label: 'Link 2'
        },
        {
          url: '/example3',
          label: 'Link 3'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~bedrock/bedrock.scss";

  header {
    @include shadow(1);
    border-bottom: 1px solid color(30);
    padding: spacing(2) spacing(8);
  }

  .logo-image {
    display: inline-block;
    height: 50px;
    width: 50px;
  }

  .top-nav {
    float: right;
  }

</style>

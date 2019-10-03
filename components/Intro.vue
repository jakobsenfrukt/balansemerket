<template>
  <div class="intro">
    <h1>{{ title }}</h1>
    <section class="tiltak-top">
      <p>{{ lead }}</p>
      <TiltakNav class="nav" />
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TiltakNav from '~/components/TiltakNav.vue'

export default {
  components: {
    TiltakNav
  },
  props: {
    title: String,
    lead: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.intro {
  padding: 2rem;
}
.tiltak-top {
  position: relative;

  .nav {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: $media-s) {
    .nav {
      position: static;
      margin: 3rem auto;
    }
  }
}
</style>

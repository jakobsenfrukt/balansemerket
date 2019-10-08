<template>
  <div class="intro">
    <h1>{{ title }}</h1>
    <section class="top">
      <p v-if="lead">{{ lead }}</p>
      <TiltakNav />
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
  padding: 0;
}
.top {
  position: relative;
}
</style>

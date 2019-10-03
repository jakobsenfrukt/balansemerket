<template>
  <nav class="tiltak-arrows">
    <a href="/">&larr; Forrige</a>
    <a href="/">Neste &rarr;</a>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
import Wave from '~/components/atoms/Wave.vue'

export default {
  components: {
    Wave
  },
  apollo: {
    tiltak: gql`
    query {
      tiltak: entries(section:tiltak) {
    		... on tiltak {
          title
          slug
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.tiltak-arrows {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    display: block;
    font-size: 3rem;
  }
}
</style>

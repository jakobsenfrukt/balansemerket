<template>
  <nav class="tiltak-nav">
    <ol>
      <li>
        <a href="/tiltak"><strong>Tiltak</strong></a>
      </li>
      <li v-for="(tiltak, index) in tiltak" :key="index">
        <a :href="`/tiltak/${tiltak.slug}`">{{ tiltak.title }}</a>
      </li>
    </ol>
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
      tiltak: entries(section: "tiltak") {
    		... on tiltak_tiltak_Entry {
          title
          slug
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.tiltak-nav {
  font-size: .8rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  ol {
    list-style: none;
    max-width: 32rem;
    margin: 0 auto 2rem;
    padding: 0;
  }
  li {
    margin: 0 0 1rem;
  }
  a {
    text-decoration: none;
    display: block;
    border: none;
  }

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 1000px) {
    position: static;
    margin: 3rem auto;
  }
}
</style>

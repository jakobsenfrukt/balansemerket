<template>
  <main class="site-main">
    <h1>{{ tiltakside.overskrift }}</h1>
    <section class="page tiltak">
      <p v-if="tiltakside.ingress">{{ tiltakside.ingress }}</p>
      <ol>
        <li v-for="(tiltak, index) in tiltak" :key="index">
          <a :href="`/tiltak/${tiltak.slug}`">{{ tiltak.title }}</a>
        </li>
      </ol>
      <TiltakArrows />
      <TiltakNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import TiltakArrows from '~/components/TiltakArrows.vue'
import TiltakNav from '~/components/TiltakNav.vue'

export default {
  components: {
    TiltakArrows,
    TiltakNav
  },
  head () {
    return {
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Tiltak for et trygt kulturliv.' 
        }
      ]
    }
  },
  apollo: {
    tiltakside: gql`
    query {
      tiltakside: entry(title: "Samleside for tiltak") {
        ... on AlleTiltak {
          overskrift
          ingress
        }
      }
      tiltak: entries(section:tiltak) {
        ... on Tiltak {
          title
          slug
        }
      }
    }`,
    tiltak: gql`
    query {
      tiltak: entries(section:tiltak) {
        ... on Tiltak {
          title
          slug
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>

</style>


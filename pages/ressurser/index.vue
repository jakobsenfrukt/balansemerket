<template>
  <main class="site-main">
    <h1>{{ ressursside.overskrift }}</h1>
    <section class="page ressurser">
      <p v-if="ressursside.ingress" class="lead">{{ ressursside.ingress }}</p>
      <ul>
        <li v-for="(ressurser, index) in ressurser" :key="index">
          <a :href="`/ressurser/${ressurser.slug}`"><h2>{{ ressurser.title }}</h2></a>
          <p>{{ ressurser.ingress }}</p>
        </li>
      </ul>
      <TiltakNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import TiltakNav from '~/components/TiltakNav.vue'

export default {
  components: {
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
    ressursside: gql`
    query {
      ressursside: entry(title: "Samleside for ressurser") {
        ... on AlleRessurser {
          overskrift
          ingress
        }
      }
    }`,
    ressurser: gql`
    query {
      ressurser: entries(section:ressurser) {
        ... on Ressurser {
          title
          ingress
          slug
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}
a {
  margin-bottom: .5rem;
}
.lead {
  margin-bottom: 2rem;
}
</style>


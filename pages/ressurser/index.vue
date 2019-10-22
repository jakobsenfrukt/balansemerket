<template>
  <main class="site-main">
    <h1>{{ ressursside.overskrift }}</h1>
    <section class="page ressurser">
      <p v-if="ressursside.ingress" class="lead">{{ ressursside.ingress }}</p>
      <div>
        <ul class="page-list">
          <li v-for="(ressurs, index) in ressurser" :key="index">
            <template v-if="ressurs.__typename === 'RessurserPdfRessurs'">
              <a :href="`${ressurs.pdf[0].url}`" target="_blank" class="pdf-ressurs">
                <h2>{{ ressurs.title }}</h2>
                <span class="pdf-label">(PDF)</span>
              </a>
              <p>{{ ressurs.ingress }}</p>
            </template>
            <template v-else>
              <a :href="`/ressurser/${ressurs.slug}`"><h2>{{ ressurs.title }}</h2></a>
              <p>{{ ressurs.ingress }}</p>
            </template>
          </li>
        </ul>
      </div>
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
          __typename
          title
          ingress
          slug
        }
        ... on RessurserPdfRessurs {
          __typename
          title
          ingress
          pdf {
            url
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
h2, h3 {
  margin: 0;
}
a {
  margin-bottom: .5rem;
}
.lead {
  margin-bottom: 2rem;
}
.page-list li {
  margin-bottom: 2rem;
}
.pdf-ressurs {
  position: relative;
}
.pdf-label {
  position: absolute;
  top: .6rem;
  right: 0;
  transform: translateX(110%);
  font-size: .8rem;
  font-weight: 500;
}
</style>


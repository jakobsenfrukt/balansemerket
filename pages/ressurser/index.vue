<template>
  <main class="site-main">
    <h1>{{ ressursside.overskrift }}</h1>
    <section class="page ressurser">
      <p v-if="ressursside.ingress" class="lead">{{ ressursside.ingress }}</p>
      <div class="columns">
        <div class="page-list">
          <ul>
            <li v-for="(ressurser, index) in ressurser" :key="index">
              <a :href="`/ressurser/${ressurser.slug}`"><h2>{{ ressurser.title }}</h2></a>
              <p>{{ ressurser.ingress }}</p>
            </li>
          </ul>
        </div>
        <div class="pdf-list">
          <h2>Nedlastbare ressurser</h2>
          <ul>
            <li v-for="(pdfLenke, index) in ressursside.pdfRessurser" :key="index">
              <h3>{{ pdfLenke.overskrift }}</h3>
              <p>{{ pdfLenke.ingress }}</p>
              <div>&rarr; <a :href="`pdfLenke.pdf.url`">{{ pdfLenke.lenketekst }}</a></div>
            </li>
          </ul>
        </div>
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
          pdfRessurser {
            ... on PdfRessurserPdfLenke {
              overskrift
              ingress
              pdf {
                url
              }
              lenketekst
            }
          }
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
h2, h3 {
  margin: 0;
}
a {
  margin-bottom: .5rem;
}
.lead {
  margin-bottom: 2rem;
}
.columns {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
}
.pdf-list {
  h2 {
    margin-bottom: 1rem;
  }
  p {
    font-size: .9rem;
  }
  h3 {
    margin-bottom: .5rem;
  }
}
</style>


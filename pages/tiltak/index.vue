<template>
  <main class="site-main">
    <h1>{{ tiltakside.overskrift }}</h1>
    <section class="page tiltak">
      <p v-if="tiltakside.ingress">{{ tiltakside.ingress }}</p>
      <img v-if="tiltakside.toppbilde.length" class="main-illustration" :src="tiltakside.toppbilde[0].fullWidth" />
      <div class="main-content" v-if="tiltakside.innhold.length">
        <div v-for="(block, index) in tiltakside.innhold" :key="index" :class="block.__typename">
          <div v-if="block.__typename === 'InnholdTekst'" class="text">
            <h2 v-if="block.overskrift">{{ block.overskrift }}</h2>
            <div v-html="block.tekst.content"></div>
          </div>
          <div v-if="block.__typename === 'InnholdBilde'" class="image">
            <img :src="block.bilde[0].fullWidth" />
          </div>
          <div v-if="block.__typename === 'InnholdTrekkspill'" class="accordion" :id="`accordion-${index}`">
            <h2 @click="readMore('accordion-' + index)" class="read-more">{{ block.overskrift }}</h2>
            <div class="content" v-html="block.tekst.content"></div>
          </div>
          <div v-if="block.__typename === 'InnholdFremhevetTekst'" class="text large">
            <div v-html="block.tekst.content"></div>
          </div>
          <div v-if="block.__typename === 'InnholdPdf'" class="pdf">
            <a :href="block.pdf[0].url" target="_blank">{{ block.lenketekst }}</a>
          </div>
        </div>
      </div>
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
          toppbilde {
            fullWidth: url(transform: fullWidth)
          }
          innhold {
            ... on InnholdTekst {
              __typename
              overskrift
              tekst {
                content
              }
            }
            ... on InnholdBilde {
              __typename
              bilde {
                fullWidth: url(transform: fullWidth)
              }
            }
            ... on InnholdTrekkspill {
              __typename
              overskrift
              tekst {
                content
              }
            }
            ... on InnholdFremhevetTekst {
              __typename
              tekst {
                content
              }
            }
            ... on InnholdPdf {
              __typename
              pdf {
                url
              }
              lenketekst
            }
          }
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


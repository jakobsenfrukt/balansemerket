<template>
  <main class="site-main">
    <h1>{{ om.overskrift }}</h1>
    <section class="page om">
      <p v-if="om.ingress">{{ om.ingress }}</p>
      <img v-if="om.toppbilde.length" class="main-illustration" :src="om.toppbilde[0].fullWidth" />
      <div v-for="(block, index) in om.innhold" :key="index" :class="block.__typename">
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
    </section>
    <Memberlist />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Memberlist from '~/components/Memberlist.vue'

export default {
  components: {
    Memberlist
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
    om: gql`
    query {
      om: entry(title: "Om") {
        ... on Om {
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
    }`
  }
}
</script>

<style lang="scss" scoped>

</style>


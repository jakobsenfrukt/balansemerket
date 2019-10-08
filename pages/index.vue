<template>
  <main class="site-main">
    <section class="page index">
      <Intro
        :title="hjem.overskrift"
        :lead="hjem.ingress"
      />
      <img v-if="hjem.toppbilde.length" class="main-illustration" :src="hjem.toppbilde[0].fullWidth" />
      <div v-for="(block, index) in hjem.innhold" :key="index">
        <div v-if="block.__typename === 'InnholdTekst'" class="text">
          <h2>{{ block.overskrift }}</h2>
          <div v-html="block.tekst.content"></div>
        </div>
        <div v-if="block.__typename === 'InnholdBilde'" class="image">
          <img :src="block.bilde[0].fullWidth" />
        </div>
        <div v-if="block.__typename === 'InnholdTrekkspill'" class="accordion" :id="`accordion-${index}`">
          <h2 @click="readMore('accordion-' + index)" class="accordion-key">{{ block.overskrift }}</h2>
          <div class="accordion-content" v-html="block.tekst.content"></div>
        </div>
      </div>
    </section>
    <TiltakArrows />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Intro from '~/components/Intro.vue'
import TiltakArrows from '~/components/TiltakArrows.vue'

export default {
  components: {
    Intro,
    TiltakArrows
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
    hjem: gql`
    query {
      hjem: entry(title: "Hjem") {
        ... on Hjem {
          overskrift
          ingress
          toppbilde {
            fullWidth: url(transform: fullWidth)
          }
          innhold {
            ... on InnholdTekst {
              __typename
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
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>

</style>


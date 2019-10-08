<template>
  <main class="site-main">
    <Intro
      :title="om.overskrift"
      :lead="om.ingress"
    />
    <img v-if="om.toppbilde.length" class="main-illustration" :src="om.toppbilde[0].fullWidth" />
    <div v-for="(block, index) in tiltak.innhold" :key="index">
      <div v-if="block.tekst" class="text">
        <h2>{{ block.overskrift }}</h2>
        <div v-html="block.tekst.content"></div>
      </div>
      <div v-if="block.bilde" class="image">
        <img :src="block.bilde[0].fullWidth" />
      </div>
      <div v-if="block.trekkspill" class="accordion">
        <h2>{{ block.overskrift }}</h2>
        <div class="accordion-content" v-html="block.tekst.content"></div>
      </div>
    </div>
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


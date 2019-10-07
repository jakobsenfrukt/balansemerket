<template>
  <main class="site-main">
    <Intro
      :title="hjem.overskrift"
      :lead="hjem.ingress"
    />
    <img class="main-illustration" src="/images/ansvar.jpg" />
    <div v-for="(block, index) in hjem.innhold" :key="index">
      <div v-if="block.tekst" v-html="block.tekst.content"></div>
      <div v-if="block.bilde">
        <img :src="block.bilde.fullWidth" />
      </div>
    </div>
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
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.site-main {
  padding-bottom: 10rem;
}
</style>


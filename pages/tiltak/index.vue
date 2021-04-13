<template>
  <main class="site-main">
    <h1>{{ tiltakside.overskrift }}</h1>
    <section class="page tiltak">
      <p v-if="tiltakside.ingress">{{ tiltakside.ingress }}</p>
      <img v-if="tiltakside.toppbilde.length" class="main-illustration" :src="tiltakside.toppbilde[0].fullWidth" :alt="tiltakside.toppbilde[0].title" />
      <ContentBlocks v-if="tiltakside.innhold.length" :content="tiltakside.innhold" />
      <TiltakArrows />
      <TiltakNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import TiltakArrows from '~/components/TiltakArrows.vue'
import TiltakNav from '~/components/TiltakNav.vue'
import ContentBlocks from '~/components/atoms/ContentBlocks.vue'

export default {
  components: {
    TiltakArrows,
    TiltakNav,
    ContentBlocks
  },
  head () {
    return {
      title: this.tiltakside.overskrift,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.tiltakside.ingress
        }
      ]
    }
  },
  apollo: {
    tiltakside: gql`
    query {
      tiltakside: entry(title: "Samleside for tiltak") {
        ... on alleTiltak_alleTiltak_Entry {
          overskrift
          ingress
          toppbilde {
            fullWidth: url(transform: "fullWidth")
            title
          }
          innhold {
            ... on innhold_tekst_BlockType {
              __typename
              overskrift
              tekst
            }
            ... on innhold_bilde_BlockType {
              __typename
              bilde {
                fullWidth: url(transform: "fullWidth")
                title
              }
            }
            ... on innhold_trekkspill_BlockType {
              __typename
              overskrift
              tekst
            }
            ... on innhold_fremhevetTekst_BlockType {
              __typename
              tekst
            }
            ... on innhold_pdf_BlockType {
              __typename
              pdf {
                url
              }
              lenketekst
            }
          }
        }
      }
      tiltak: entries(section: "tiltak") {
        ... on tiltak_tiltak_Entry {
          title
          slug
        }
      }
    }`,
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

</style>


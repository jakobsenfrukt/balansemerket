<template>
  <main class="site-main">
    <h1>{{ tiltak.title }}</h1>
    <section class="page tiltak-page">
      <p v-if="tiltak.ingress">{{ tiltak.ingress }}</p>
      <img v-if="tiltak.toppbilde && tiltak.toppbilde.length" class="main-illustration" :src="tiltak.toppbilde[0].fullWidth" :alt="tiltak.toppbilde[0].title" />
      <ContentBlocks v-if="tiltak.innhold && tiltak.innhold.length" :content="tiltak.innhold" />
      <TiltakArrows :current="tiltak.slug" />
      <TiltakNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Intro from '~/components/Intro.vue'
import TiltakArrows from '~/components/TiltakArrows.vue'
import TiltakNav from '~/components/TiltakNav.vue'
import ContentBlocks from '~/components/atoms/ContentBlocks.vue'

export default {
  components: {
    Intro,
    TiltakArrows,
    TiltakNav,
    ContentBlocks
  },
  head () {
    return {
      title: this.tiltak.title + " | Tiltak",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.tiltak.ingress 
        }
      ]
    }
  },
  methods: {
    readMore: function(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  },
  apollo: {
    tiltak: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query Tiltak($slug: String!) {
        tiltak: entry(section: "tiltak", slug: [$slug]) {
          ... on tiltak_tiltak_Entry {
            title
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
            slug
          }
        }
      }`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

</style>


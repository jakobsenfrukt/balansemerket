<template>
  <main class="site-main">
    <h1>{{ tiltak.title }}</h1>
    <section class="page tiltak-page">
      <p v-if="tiltak.ingress">{{ tiltak.ingress }}</p>
      <img v-if="tiltak.toppbilde.length" class="main-illustration" :src="tiltak.toppbilde[0].fullWidth" :alt="tiltak.toppbilde[0].title" />
      <div v-for="(block, index) in tiltak.innhold" :key="index" :class="block.__typename">
        <div v-if="block.__typename === 'innhold_tekst_BlockType'" class="text">
          <h2 v-if="block.overskrift">{{ block.overskrift }}</h2>
          <div v-html="block.tekst"></div>
        </div>
        <div v-if="block.__typename === 'innhold_bilde_BlockType'" class="image">
          <img :src="block.bilde[0].fullWidth" :alt="block.bilde[0].title" />
        </div>
        <div v-if="block.__typename === 'innhold_trekkspill_BlockType'" class="accordion" :id="`accordion-${index}`">
          <h2 @click="readMore('accordion-' + index)" class="read-more">{{ block.overskrift }}</h2>
          <div class="content" v-html="block.tekst"></div>
        </div>
        <div v-if="block.__typename === 'innhold_fremhevetTekst_BlockType'" class="text large">
          <div v-html="block.tekst"></div>
        </div>
        <div v-if="block.__typename === 'innhold_pdf_BlockType'" class="pdf">
          <a :href="block.pdf[0].url" target="_blank">{{ block.lenketekst }}</a>
        </div>
      </div>
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
export default {
  components: {
    Intro,
    TiltakArrows,
    TiltakNav
  },
  head () {
    return {
      title: 'Tiltak: ' + this.tiltak.title,
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
        tiltak: entry(slug: [$slug]) {
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


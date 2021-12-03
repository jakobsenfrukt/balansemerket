<template>
  <main class="site-main">
    <h1>{{ ressurser.title }}</h1>
    <section class="page ressurs-page">
      <ContentBlocks v-if="ressurser.innhold && ressurser.innhold.length" :content="ressurser.innhold" />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import ContentBlocks from '~/components/atoms/ContentBlocks.vue'

export default {
  components: {
    ContentBlocks
  },
  head () {
    return {
      title: this.ressurser.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.ressurser.ingress
        }
      ]
    }
  },
  apollo: {
    ressurser: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query ressurser($slug: String!) {
        ressurser: entry(section: "ressurser", slug: [$slug]) {
          ... on ressurser_ressurser_Entry {
            title
            ingress
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


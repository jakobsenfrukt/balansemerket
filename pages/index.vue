<template>
  <main class="site-main">
    <h1>{{ hjem.overskrift }}</h1>
    <section class="page index">
      <p v-if="hjem.ingress">{{ hjem.ingress }}</p>
      <img v-if="hjem.toppbilde.length" class="main-illustration" :src="hjem.toppbilde[0].fullWidth" :alt="hjem.toppbilde[0].title" />
      <ContentBlocks v-if="hjem.innhold.length" :content="hjem.innhold" />
      <TiltakArrows index />
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
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.hjem.ingress
        }
      ]
    }
  },
  apollo: {
    hjem: gql`
    query {
      hjem: entry(title: "Hjem") {
        ... on hjem_hjem_Entry {
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
    }`
  }
}
</script>

<style lang="scss" scoped>

</style>


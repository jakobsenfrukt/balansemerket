<template>
  <main class="site-main">
    <section class="ressurs-page">
      <Intro
        :title="ressurs.title"
        :lead="ressurs.ingress"
      />
      <div v-for="(block, index) in ressurs.innhold" :key="index">
        <div v-if="block.tekst" v-html="block.tekst.content"></div>
        <div v-if="block.bilde">
          <img :src="block.bilde[0].fullWidth" />
        </div>
        <div v-if="block.trekkspill" class="accordion">
          <h2>{{ block.overskrift }}</h2>
          <div class="content" v-html="block.tekst.content"></div>
        </div>
      </div>
      <ressursArrows :current="ressurs.slug" />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Intro from '~/components/Intro.vue'
export default {
  components: {
    Intro
  },
  head () {
    return {
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: 'ressurs for et trygt kulturliv.' 
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
        ressurser: entry(slug: $slug) {
          ... on Ressurser {
            title
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


<template>
  <main class="site-main">
    <section class="tiltak-page">
      <Intro
        :title="tiltak.title"
        :lead="tiltak.ingress"
      />
      <img class="main-illustration" :src="`/images/${tiltak.slug}.jpg`" />
      <div class="content" v-html="tiltak.innhold.content"></div>
      <TiltakArrows />
    </section>
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
    tiltak: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query Tiltak($slug: String!) {
        tiltak: entry(slug: $slug) {
          ... on Tiltak {
            title
            ingress
            innhold {
              content
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
.site-main {
  padding-bottom: 10rem;
}
</style>


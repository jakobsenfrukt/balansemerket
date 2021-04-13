<template>
  <main class="site-main">
    <span>Ressurser</span>
    <h1>{{ category.title }}</h1>
    <section class="page resource-category-page">
      hei
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
    category: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query category($slug: String!) {
        category: category(slug: [$slug]) {
          ... on ressurser_Category {
            id
            title
            ingress
            slug
          }
        }
      }`
    },
    ressurser: gql`
    query {
      ressurser: entries(section: "ressurser") {
        ... on ressurser_ressurser_Entry {
          __typename
          title
          ingress
          slug
          resourcesCategory {
            id
            title
          }
        }
        ... on ressurser_pdfRessurs_Entry {
          __typename
          title
          ingress
          pdf {
            url
          }
          resourcesCategory {
            id
            title
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

</style>


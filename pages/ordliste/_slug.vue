<template>
  <main class="site-main">
    <h1 class="site-title">
      <span>Definisjon</span>
      {{ word.title }}
    </h1>
    <section class="page ordliste">
      <div class="content" v-html="word.body"></div>
      <DictionaryNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import DictionaryNav from '~/components/ordliste/DictionaryNav.vue'
export default {
  components: {
    DictionaryNav
  },
  head () {
    return {
      title: 'Ordliste: ' + this.word.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.word.ingress 
        }
      ]
    }
  },
  apollo: {
    word: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query Dictionary($slug: String!) {
        word: entry(section: "dictionary", slug: [$slug]) {
          ... on dictionary_word_Entry {
            title
            ingress
            body
            slug
          }
        }
      }`
    }
  }
}
</script>

<style lang="scss" scoped>
.site-title {
  margin-left: 300px;
  span {
    display: block;
    font-size: .8rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: .8rem;
  }
}
.page.ordliste {
  display: grid;
  grid-template-columns: 300px 1fr;

  .content {
    order: 2;
  }
}
@media (max-width: 900px) {
  .site-title {
    margin-left: 0;
  }
  .page.ordliste {
    grid-template-columns: 1fr;

    .content {
      order: 1;
    }
  }
}
</style>


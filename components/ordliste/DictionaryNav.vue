<template>
  <nav class="dictionary-nav">
    <ul>
      <li class="heading">
         <a href="/ordliste">Alle begreper</a>
      </li>
      <li v-for="(word, index) in dictionary" :key="index">
        <a :href="`/ordliste/${word.slug}`">{{ word.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
import Wave from '~/components/atoms/Wave.vue'

export default {
  components: {
    Wave
  },
  apollo: {
    dictionary: gql`
    query {
      dictionary: entries(section:dictionary) {
    		... on DictionaryWord {
          title
          ingress
          slug
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.dictionary-nav {
  font-size: .8rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  max-width: 12rem;

  ul {
    max-width: 32rem;
    margin: 0 auto 2rem;
    padding: 0 0 0 1rem;
  }
  li {
    margin: 0 0 1rem;

    &.heading {
      list-style: none;
      font-weight: bold;
    }
  }
  a {
    text-decoration: none;
    display: block;
    border: none;
    line-height: 1.3;
  }

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: $media-m) {
    position: static;
    margin: 3rem auto;
  }
}
</style>

<template>
  <main class="site-main">
    <h1 class="site-title">Ordliste</h1>
    <!--<div class="intro">
      <p class="lead">Yo dette er en ingress</p>
    </div>-->
    <section class="page ordliste">
      <div class="word-list">
        <div class="word" v-for="(word, index) in dictionary" :key="`word-${index}`">
          <a :href="`/ordliste/${word.slug}`"><strong>{{word.title}}</strong></a><br />
          <p>{{word.ingress}}</p>
        </div>
      </div>
      <DictionaryNav />
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import DictionaryNav from '~/components/ordliste/DictionaryNav'

export default {
  components: {
    DictionaryNav
  },
  data() {
    return {
      cardNumber: 0
    }
  },
  computed: {
    currentCard() {
      return this.selectedCards[this.cardNumber]
    },
    selectedCards() {
      return this.cards
    }
  },
  methods: {
    readMore: function(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  },
  head () {
    return {
      title: 'Ordliste | Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.cardIndex.ingress
        }
      ]
    }
  },
  apollo: {
    cardIndex: gql`
    query {
      cardIndex: entry(title: "Samtalekort: Forside") {
        ... on CardsIndex {
          ingress
          introText {
            content
          }
          endText {
            content
          }
          body {
            content
          }
        }
      }
    }`,
    dictionary: gql`
    query {
      dictionary: entries(section:dictionary) {
    		... on DictionaryWord {
          slug
          title
          ingress
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.word-list {
  max-width: var(--width-s);
  margin: 0 auto 2rem;
}
.word {
  a {
    margin-bottom: .5rem;
    strong {
      display: block;
      font-size: 1.2rem;
    }
  }
  p {
    margin: 0 0 2rem;
  }
}
</style>


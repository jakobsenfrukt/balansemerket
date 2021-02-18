<template>
  <main class="site-main">
    <h1 class="site-title">Ordliste</h1>
    <section class="page ordliste">
      <div class="intro">
        <p>Begrepsforklaringer</p>
      </div>
    </section>
    <div class="word-list">
      <div class="word" v-for="(word, index) in dictionary" :key="`word-${index}`">
        <strong>{{word.title}}</strong><br />
        <p>{{word.ingress}}</p>
      </div>
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'

export default {
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
      title: 'Om Balansemerket',
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
          title
          ingress
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.site-main {
  background: #eee;
}
.site-title {
  text-align: center;
}
.intro {
  text-align: center;
}
.card {
  display: inline-block;
  background: white;
  border-radius: 2rem;
  box-shadow:
    -2px 2px 0 1px rgb(212, 212, 212),
    -.8rem .8rem 0 rgba(0, 0, 0, .2);
  text-align: center;
  padding: 2rem;
  margin: 1rem;

  &.current {
    display: block;
    width: 90%;
    max-width: 800px;
    margin: 2rem auto;
    font-size: 2rem;
    padding: 4rem 4.2rem;
  }
}
.cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 2rem auto;
}
.card-nav {
  text-align: center;
}
.read-more {
  cursor: pointer;
}
.customize {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 2px solid black;
  padding: 2rem 0;

  h2 {
    grid-column: span 3;
    text-align: left;
    width: 100%;
    max-width: none;
  }
  span {
    font-weight: 700;
  }
}
.show-instructions {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: inline-block;
  border-bottom: 2px solid #000;
}
.instructions {
  display: none;
  position: absolute;
  top: 3rem;
  right: 0;
  background: white;

  &.visible {
    display: block;
  }
}
.word {
  p {
    margin: 0 0 2rem;
  }
}
</style>


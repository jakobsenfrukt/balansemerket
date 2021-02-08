<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>
    <div @click="readMore('instructions')" class="read-more show-instructions">Vis instruksjoner</div>
    <section class="page samtalekort">
      <div class="intro">
        <div class="content" v-html="cardIndex.introText.content"></div>
        <button>Start</button>
        <button>Tilpass kortstokken</button>
      </div>
      <div class="card current">
        <div class="content" v-html="currentCard.cardText.content"></div>
      </div>
      <nav class="card-nav">
        <button @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
        <button @click="cardNumber++"  v-if="cardNumber < selectedCards.length-1">Neste kort</button>
      </nav>
      <div class="cards">
        <div class="card" v-for="(card, index) in cards" :key="`card-${index}`">
          {{card.title}} - {{card.category[0].title}}
        </div>
      </div>
      <div class="end">
        <div class="content" v-html="cardIndex.endText.content"></div>
      </div>
    </section>
    <div class="instructions" id="instructions">
      <div class="content" v-html="cardIndex.body.content"></div>
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'

export default {
  layout: 'cards',
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
    cards: gql`
    query {
      cards: entries(section:cards) {
    		... on Cards {
          title
          cardText {
            content
          }
          category {
            title
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.site-main {
  background: pink;
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
  border-radius: 6px;
  box-shadow:
    -2px 2px 0 1px rgb(212, 212, 212),
    -.8rem .8rem 0 rgba(0, 0, 0, .2);
  text-align: center;
  padding: 2rem;
  margin: 1rem;

  &.current {
    display: block;
    width: 90%;
    max-width: 900px;
    margin: 2rem auto;
    font-size: 2rem;
    padding: 3rem 2rem;
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
  background: white;

  &.visible {
    display: block;
  }
}
</style>


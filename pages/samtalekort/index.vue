<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>
    <div @click="readMore('instructions')" class="read-more show-instructions">Hvordan bruke kortene</div>
    <section class="page samtalekort">
      <div class="intro">
        <div class="content" v-html="cardIndex.introText.content"></div>
        <button>Trekk et kort</button>
        <button>Tilpass kortstokken</button>
      </div>
      <div class="card current">
        <div class="content" v-html="currentCard.cardText.content"></div>
      </div>
      <nav class="card-nav">
        <button @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
        <button @click="cardNumber++"  v-if="cardNumber < selectedCards.length-1">Neste kort</button>
        <button @click="showEnd()"  v-if="cardNumber === selectedCards.length-1">Avslutt</button>
        <div class="card-counter">
          {{cardNumber+1}} / {{ selectedCards.length }}
        </div>
      </nav>
    </section>
    <div class="customize" id="customize">
      <h2>Tilpass kortstokken</h2>
      <div class="customize-options customize-type">
        <span>Vis kort etter type:</span>
        <div>
          <input type="checkbox" id="assertions" name="assertions" checked>
          <label for="assertions">Påstander</label>
        </div>
        <div>
          <input type="checkbox" id="questions" name="questions" checked>
          <label for="questions">Refleksjonsspørsmål</label>
        </div>
      </div>
      <div class="customize-options customize-category">
        <span>Vis kort etter tema:</span>
        <div>
          <input type="checkbox" id="category1" name="category1" checked>
          <label for="category1">Forebygge seksuell trakassering</label>
        </div>
        <div>
          <input type="checkbox" id="category2" name="category2" checked>
          <label for="category2">Utfordre normer</label>
        </div>
        <div>
          <input type="checkbox" id="category3" name="category3" checked>
          <label for="category3">Motvirke hersketeknikker</label>
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="card" v-for="(card, index) in cards" :key="`card-${index}`">
        {{card.title}} - {{card.category[0].title}}
      </div>
    </div>
    <div class="instructions" id="instructions">
      <div class="content" v-html="cardIndex.body.content"></div>
    </div>
    <div class="end">
      <div class="content" v-html="cardIndex.endText.content"></div>
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
</style>


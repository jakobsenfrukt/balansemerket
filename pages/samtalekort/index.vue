<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>
    <div @click="readMore('instructions')" class="read-more show-instructions">Hvordan bruke kortene</div>
    <section class="page samtalekort">
      <div class="intro">
        <strong>(Intro, vises før første kort)</strong><br /><br />
        <div class="content" v-html="cardIndex.introText.content"></div>
        <button class="button">Trekk et kort</button>
        <button class="button secondary">Tilpass kortstokken</button>
      </div>
      <div class="card-counter">
        {{cardNumber+1}} / {{ selectedCards.length }}
      </div>
      <div class="card current">
        <div class="content" v-html="currentCard.cardText.content"></div>
        <div class="dictionary-word" v-if="currentCard.words.length">
          Hva betyr <a href="#" target="_blank" class="word">{{currentCard.words[0].title}}</a>?
        </div>
      </div>
      <nav class="card-nav">
        <button class="button prev" @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
        <button class="button next" @click="cardNumber++"  v-if="cardNumber < selectedCards.length-1">Neste kort</button>
        <button class="button" @click="showEnd()"  v-if="cardNumber === selectedCards.length-1">Avslutt</button>
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
      <div class="cards">
        <span>Velg hvilke kort som skal vises:</span>
        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="`card-${index}`">
            <div class="content" v-html="card.cardText.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="instructions" id="instructions">
      <div class="content" v-html="cardIndex.body.content"></div>
    </div>
    <div class="end">
      <strong>(Avslutning, dukker opp etter siste kort)</strong><br /><br />
      <div class="content" v-html="cardIndex.endText.content"></div>
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Footer from '~/components/samtalekort/Footer.vue'

export default {
  layout: 'cards',
  components: {
    Footer
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
          words {
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
  background: var(--color-yellow);
}
.site-title {
  text-align: center;
  font-size: 1.8rem;
}
.page.samtalekort {
  padding: 4rem 2rem;
}
.intro {
  text-align: center;
  .content {
    margin-bottom: 2rem;
  }
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
  position: relative;

  &.current {
    display: block;
    width: 90%;
    max-width: 800px;
    margin: 2rem auto 3rem;
    font-size: 2rem;
    padding: 4rem 4.2rem;
  }
}
.dictionary-word {
  font-size: 16px;
  color: var(--color-green);
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  .word {
    text-transform: lowercase;
    border: none;
    text-decoration: underline;
  }
}
.card-counter {
  text-align: center;
}
.card-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;

  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  .button {
    grid-column: span 1;
    margin: 0 auto;
    width: 90%;
    &.next {
      grid-column: 2 / span 1;
    }
  }
}
.read-more {
  cursor: pointer;
}
.customize {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 2rem 2rem;
  margin: 0 -2rem;
  background: var(--color-green);
  color: var(--color-black);

  h2 {
    grid-column: span 3;
    text-align: left;
    width: 100%;
    max-width: none;
  }
  span {
    font-weight: 700;
  }
  .cards {
    grid-column: span 3;
    margin-top: 2rem;
  }
}
.card-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  color: var(--color-black);
  .card {
    display: inline-block;
    font-size: 13px;
    width: 200px;
    height: 150px;
    border-radius: 18px;
    padding: 1rem;
    line-height: 1.3;
    display: flex;
    align-items: center;
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
.end {
  text-align: center;
}
.intro, .end {
  border: 4px dashed rgba(0, 0, 0, .1);
  border-radius: 30px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
/*
.button {
  background: var(--color-green);
  color: #000;

  &.secondary {
    background: #fff;
  }
}
*/
</style>


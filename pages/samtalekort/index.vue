<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>
    <div @click="toggle('instructions')" class="read-more show-instructions">Hvordan bruke kortene</div>
    <section class="page samtalekort">
      <div class="intro" v-if="cardNumber === -1">
        <div class="intro-content">
          <div class="content" v-html="cardIndex.introText.content"></div>
          <button class="button" @click="cardNumber++">Trekk et kort</button>
          <button class="button secondary" @click="toggle('customize')">Tilpass kortstokken</button>
        </div>
      </div>
      <div class="card-wrapper" v-if="currentCard">
        <div class="card current">
          <div class="content" v-html="currentCard.cardText.content"></div>
          <div class="dictionary-word" v-if="currentCard.words.length">
            Hva betyr <a href="#" target="_blank" class="word">{{currentCard.words[0].title}}</a>?
          </div>
        </div>
        <nav class="card-nav">
          <button class="button prev disabled" disabled v-if="cardNumber <= 0">Forrige kort</button>
          <button class="button prev" @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
          <button class="button next" @click="cardNumber++"  v-if="cardNumber < selectedCards.length-1">Neste kort</button>
          <button class="button" @click="cardNumber++"  v-if="cardNumber === selectedCards.length-1">Avslutt</button>
        </nav>
        <div class="card-counter">
          {{cardNumber+1}} / {{ selectedCards.length }}
        </div>
      </div>
      <div class="end" v-if="cardNumber === selectedCards.length">
        <div class="end-content">
          <div class="content" v-html="cardIndex.endText.content"></div>
          <button class="button" @click="cardNumber = -1">Start på nytt</button>
        </div>
      </div>
    </section>
    <div class="customize-open">
      <button @click="toggle('customize')">Tilpass</button>
    </div>
    <div class="customize" id="customize">
      <div class="customize-wrapper">
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
        <div class="customize-done">
          <button class="button" @click="toggle('customize')">Ferdig</button>
        </div>
        <div class="customize-close">
          <button class="button close" @click="toggle('customize')" aria-label="Lukk"></button>
        </div>
      </div>
    </div>
    <div class="instructions" id="instructions">
      <div class="instructions-wrapper">
        <div class="content" v-html="cardIndex.body.content"></div>
        <div class="instructions-done">
          <button class="button" @click="toggle('instructions')">Sett i gang</button>
        </div>
        <div class="instructions-close">
          <button class="button close" @click="toggle('instructions')" aria-label="Lukk"></button>
        </div>
      </div>
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
      cardNumber: -1
    }
  },
  computed: {
    currentCard() {
      if (this.cardNumber === -1) {
        return false
      } else if (this.cardNumber === this.selectedCards.length) {
        return false
      } else {
        return this.selectedCards[this.cardNumber]
      }
    },
    selectedCards() {
      return this.cards
    }
  },
  methods: {
    toggle: function(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  },
  head () {
    return {
      title: 'Samtalekort | Balansemerket',
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
  padding-bottom: 2rem;
}
.site-title {
  text-align: center;
  font-size: 1.8rem;
}
.page.samtalekort {
  padding: 1rem 2rem;
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
    font-size: 2rem;
    padding: 4rem;
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
  margin: 3rem auto 2rem;
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
  opacity: 0;
  transform: translateY(-100%);
  transition: all .3s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background: rgba(0, 0, 0, .5);
  padding: 2rem 2rem 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 3rem 3rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
    background: var(--color-green);
    color: var(--color-black);
    position: relative;
    border-radius: 2rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .4);
  }

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
  .customize-done {
    grid-column: span 2;
  }
}
.card-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto 1rem;
  color: var(--color-black);
  .card {
    display: inline-block;
    font-size: 12px;
    width: 220px;
    height: 160px;
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
  opacity: 0;
  transform: translateY(-100%);
  transition: all .3s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background: rgba(0, 0, 0, .5);
  padding: 2rem 2rem 6rem;

  &-wrapper {
    padding: 3rem 3rem 2rem;
    max-width: 700px;
    margin: 0 auto;
    background: var(--color-white);
    color: var(--color-black);
    position: relative;
    border-radius: 2rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .4);
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
.intro, .end, .card.current {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}
.intro, .end, .card-wrapper {
  min-height: 70vh;
  width: 80%;
  max-width: 1000px;
  margin: 2rem auto;
  &-content {
    width: 100%;
  }
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
@media (max-width: 800px) {
  .page.samtalekort {
    padding: 0;
  }
  .site-title {
    margin-top: 6rem;
    font-size: 1.4rem;
  }
  .card {
    &.current {
      margin: 2rem 0;
      width: 100%;
      padding: 2rem 1.4rem;
      font-size: 1.3rem;
    }
  }
  .card-nav {
    display: block;
    margin-bottom: 2rem;
    .button {
      margin-bottom: 1rem;
    }
  }
  .button {
    width: 100%;
  }
  .intro, .end, .card-wrapper {
    min-height: 50vh;
    width: 100%;
  }
}
</style>


<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>

    <div class="read-more show-instructions">
      <span @click="toggle('instructions')">Hvordan bruke kortene</span>
      <button class="button button-info" @click="toggle('instructions')" aria-label="Instruksjoner"></button>
    </div>

    <section class="page samtalekort">
      <div class="intro" v-if="cardNumber === -1">
        <div class="intro-content">
          <div class="content" v-html="cardIndex.introText.content"></div>
          <button class="button" @click="cardNumber++">Trekk et kort</button>
          <button class="button secondary" @click="toggle('customize')">Tilpass kortstokken</button>
        </div>
      </div>
      <div class="card-wrapper" v-if="currentCard">
        <CurrentCard class="current-card" :card="currentCard" />
        <nav class="card-nav">
          <button class="button next" @click="cardNumber++"  v-if="cardNumber < selectedCards.length-1">Neste kort</button>
          <button class="button the-end" @click="cardNumber++"  v-if="cardNumber === selectedCards.length-1">Avslutt</button>
          <button class="button prev disabled" disabled v-if="cardNumber <= 0">Forrige kort</button>
          <button class="button prev" @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
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
      <button class="button" @click="toggle('customize')">Tilpass kortstokken</button>
      <button class="button secondary" @click="alert('Stokker bunken!')">Stokk bunken</button>
    </div>

    <div class="overlay" id="overlay"></div>

    <div class="customize" id="customize">
      <div class="customize-wrapper">
        <h2>Tilpass kortstokken</h2>
        <div class="customize-options customize-category">
          <h3>Vis kort etter tema:</h3>
          <FilterOption v-for="category in categories" :key="category.id" :option="category" class="category-option" checked />
        </div>
        <div class="customize-options customize-type">
          <h3>Vis kort etter type:</h3>
          <FilterOption v-for="type in cardTypes" :key="type.id" :option="type" class="type-option" checked />
        </div>
        <div class="cards">
          <h3>Velg hvilke kort som skal vises:</h3>
          <div>Velg alle</div>
          <div>Fjern markeringer</div>
          <div class="card-list">
            <Card v-for="(card, index) in cards" :card="card" :key="`card-${index}`" checked/>
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
import CurrentCard from '~/components/samtalekort/CurrentCard.vue'
import FilterOption from '~/components/samtalekort/FilterOption.vue'
import Card from '~/components/samtalekort/Card.vue'
import Footer from '~/components/samtalekort/Footer.vue'

export default {
  layout: 'cards',
  components: {
    CurrentCard,
    FilterOption,
    Card,
    Footer
  },
  data() {
    return {
      cardNumber: -1,
      cardTypes: [
        {
          id: 'assertions',
          title: 'Påstander'
        },
        {
          id: 'questions',
          title: 'Refleksjonsspørsmål'
        }
      ]
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
    nextCard() {
      if (this.cardNumber === -2) {
        return false
      } else if (this.cardNumber === this.selectedCards.length-1) {
        return false
      } else {
        return this.selectedCards[this.cardNumber+1]
      }
    },
    selectedCards() {
      return this.cards
    }
  },
  methods: {
    toggle: function(id) {
      document.getElementById(id).classList.toggle('visible')
      document.getElementById('overlay').classList.toggle('visible')
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
    }`,
    categories: gql`
    query {
      categories: categories {
    		... on CardsCategory {
          id
          title
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
    &.next, &.the-end {
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
  transition: all .5s ease;
  
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
  padding: 2rem 2rem 6rem;

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
    margin-bottom: 2rem;
  }
  h3 {
    font-weight: 700;
    display: block;
    margin: .8rem 0;
  }
  .cards {
    grid-column: span 3;
    margin-top: 2rem;
  }
  &-done {
    grid-column: span 2;
  }

  &-open {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: var(--color-white);
    border-radius: 12px;
    .button {
      font-size: 16px;
      padding: .5rem .75rem;
      margin: .5rem 0;
      width: 10rem;
      transform: translateX(-15px);
    }
    box-shadow:
      5px -5px 0 rgba(0, 0, 0, .2),
      15px -15px 10px rgb(255, 255, 255),
      20px -20px 0 rgba(0, 0, 0, .2),
      -5px 5px 10px rgba(0, 0, 0, .2),
      -15px 15px 0 rgb(255, 255, 255),
      35px -35px 10px rgba(0, 0, 0, .2);
  }
}
.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding: .5rem;
  margin: 2rem auto 2rem;
  color: var(--color-black);
}
.show-instructions {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: inline-block;
  span {
    border-bottom: 2px solid #000;
  }
  .button {
    display: none;
  }
}
.instructions {
  opacity: 0;
  transform: translateY(-100%);
  transition: all .5s ease;
  
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
  padding: 2rem 2rem 6rem;

  &-wrapper {
    padding: 3rem 3rem 2rem;
    max-width: 700px;
    margin: 0 auto;
    background: var(--color-orange);
    color: var(--color-black);
    position: relative;
    border-radius: 2rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .4);
  }
}
.instructions, .customize {
  h2 {
    padding-right: 3rem;
  }
}
.end {
  text-align: center;
  .end-content .content {
    margin-bottom: 2rem;
  }
}
.intro, .end {
  border: 4px dashed rgba(0, 0, 0, .1);
  border-radius: 30px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.intro, .end {
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background: rgba(0, 0, 0, .5);

  display: none;
  opacity: 0;
  transition: opacity .6s ease;
  &.visible {
    display: block;
    opacity: 1;
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
@media (min-width: 800px) {
  .card-nav {
    .prev {
      order: 1;
      grid-column: 1 / span 1;
    }
    .next, .the-end {
      order: 2;
    }
  }
}
@media (max-width: 800px) {
  .page.samtalekort {
    padding: 0;
  }
  .site-title {
    margin-top: 4rem;
    font-size: 1.4rem;
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
    &.close, &-info {
      width: 3rem;
      height: 3rem;
    }
  }
  .intro, .end, .card-wrapper {
    min-height: 50vh;
    width: 100%;
  }
  .show-instructions {
    position: absolute;
    top: 0;
    right: 0;
    span {
      display: none;
    }
    .button {
      display: block;
    }
  }
  .instructions {
    padding: 1rem;
    &-wrapper {
      padding: 2rem;
    }
  }
  .customize {
    padding: 1rem;
    &-wrapper {
      padding: 2rem 1.5rem;
      display: block;
    }

    h3 {
      margin: 2.4rem 0 1rem;
      font-size: 1.2rem;
    }

    &-open {
      position: static;
      box-shadow: none;
      background: transparent;
      width: 100%;
      .button {
        width: 100%;
        padding: .75rem 1rem;
        transform: none;
      }
    }
  }
  .card-list {
    grid-template-columns: 1fr;
  }
}
</style>


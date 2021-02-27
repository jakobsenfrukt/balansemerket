<template>
  <main class="site-main">
    <h1 class="site-title">Samtalekort</h1>
    <div class="background">
      <img src="/images/snakk-transparent.png" />
    </div>

    <div class="read-more show-instructions">
      <span @click="toggleModal('instructions')">Hvordan bruke kortene</span>
      <button class="button button-info" @click="toggleModal('instructions')" aria-label="Instruksjoner"></button>
    </div>

    <section class="page samtalekort">
      <div class="intro" v-if="cardNumber === -1">
        <div class="intro-content">
          <div class="content" v-html="cardIndex.introText.content"></div>
          <button class="button" @click="cardNumber++">Trekk et kort</button>
        </div>
      </div>
      <div class="card-wrapper" v-if="currentCard">
        <CurrentCard class="current-card" :card="currentCard" />
        <nav class="card-nav">
          <button class="button next" @click="cardNumber++"  v-if="cardNumber < cardStack.length-1">Neste kort</button>
          <button class="button the-end" @click="cardNumber++"  v-if="cardNumber === cardStack.length-1">Avslutt</button>
          <button class="button prev disabled" disabled v-if="cardNumber <= 0">Forrige kort</button>
          <button class="button prev" @click="cardNumber--" v-if="cardNumber > 0">Forrige kort</button>
        </nav>
        <div class="card-counter">
          {{cardNumber+1}} / {{ cardStack.length }}
        </div>
      </div>
      <div class="end" v-if="cardNumber === cardStack.length">
        <div class="end-content">
          <div class="content" v-html="cardIndex.endText.content"></div>
          <button class="button" @click="cardNumber = -1">Start på nytt</button>
        </div>
      </div>
    </section>

    <div class="customize-open">
      <button class="button" @click="toggleModal('customize')">Tilpass kortstokken</button>
      <button class="button secondary" @click="shuffle(cardStack)">Stokk bunken</button>
    </div>

    <div class="overlay" id="overlay"></div>

    <div class="customize" id="customize">
      <div class="customize-wrapper">
        <h2>Tilpass kortstokken</h2>
        <div class="customize-options customize-category">
          <h3>Vis kort etter tema</h3>
          <div v-for="category in allCategories" :key="category.id" @click="() => { category.selected = !category.selected; filter(); $forceUpdate(); }">
            <FilterOption :option="category" class="category-option" :checked="category.selected" />
          </div>
        </div>
        <div class="customize-options customize-type">
          <h3>Vis kort etter type</h3>
          <div v-for="type in cardTypes" :key="type.id" @click="() => { type.selected = !type.selected; filter(); $forceUpdate();}">
            <FilterOption :option="type" class="type-option" :checked="type.selected" />
          </div>
        </div>
        <div class="cards" id="customize-cards">
          <h3 class="readmore" @click="toggle('customize-cards')">Velg hvilke enkeltkort som skal vises</h3>
          <div class="card-lists">
            <div class="card-list-category" v-for="(category,index) in cardsByCategory" :key="`category-card-list-${index}`">
              <div class="card-list-header">
                <h4>{{category[0].category[0].title}}</h4>
                <div class="card-list-select">
                  <span @click="selectAll(); $forceUpdate();">Velg alle</span>
                  <span @click="deSelectAll(); $forceUpdate();">Fjern markeringer</span>
                </div>
              </div>
              <div class="card-list">
                <div class="card-list-wrapper" v-for="card in category" :key="card.id" @click="() => { card.selected = !card.selected; filter(); $forceUpdate(); }">
                  <Card :card="card" :checked="card.selected" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="customize-done">
          <button class="button" @click="toggleModal('customize')">Ferdig</button>
        </div>
        <div class="customize-close">
          <button class="button button-close" @click="toggleModal('customize')" aria-label="Lukk"></button>
        </div>
      </div>
    </div>

    <div class="instructions" id="instructions">
      <div class="instructions-wrapper">
        <div class="content" v-html="cardIndex.body.content"></div>
        <div class="instructions-done">
          <button class="button" @click="toggleModal('instructions')">Sett i gang</button>
        </div>
        <div class="instructions-close">
          <button class="button button-close" @click="toggleModal('instructions')" aria-label="Lukk"></button>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import Vue from 'vue'
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
      selectedCategories: [],
      selectedCards: [],
      allCards: [],
      allCategories: [],
      cardTypes: [
        {
          id: 'assertion',
          title: 'Påstander',
          selected: true
        },
        {
          id: 'question',
          title: 'Refleksjonsspørsmål',
          selected: true
        }
      ]
    }
  },
  computed: {
    currentCard() {
      if (this.cardNumber === -1) {
        return false
      } else if (this.cardNumber === this.cardStack.length) {
        return false
      } else {
        return this.cardStack[this.cardNumber]
      }
    },
    nextCard() {
      if (this.cardNumber === -2) {
        return false
      } else if (this.cardNumber === this.cardStack.length-1) {
        return false
      } else {
        return this.cardStack[this.cardNumber+1]
      }
    },
    cardStack() {
      return this.shuffle(this.selectedCards)
    },
    cardsByCategory() {
      const cards = this.allCards
      const cardsByCategory = [];

      this.selectedCategories.forEach(category => {
        const categoryArray = [];
        cards.filter(card => {
          if (category.title === card.category[0].title) {
            categoryArray.push(card)
          }
        })
        cardsByCategory.push(categoryArray)
      })
      /*
      const filteredCardsByCategory = cards.filter(card => {
        return this.selectedCategories.some(category => {
          return category.title === card.category[0].title
        })
      })*/

      return cardsByCategory
    }
  },
  methods: {
    toggleModal: function(id) {
      document.getElementById(id).classList.toggle('visible')
      document.getElementById('overlay').classList.toggle('visible')
    },
    toggle: function(id) {
      document.getElementById(id).classList.toggle('visible')
    },
    shuffle(cards) {
      this.cardNumber = -1
      return cards.sort(() => 0.5 - Math.random())
    },
    filter() {
      this.filterCategories();
      this.filterCards();
    },
    filterCategories() {
      const categories = this.allCategories;
      const filteredCategories = [];
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].selected === true) {
          filteredCategories.push(categories[i])
        }
      }
      this.selectedCategories = filteredCategories
    },
    filterCards() {
      const cards = this.allCards;
      const filteredCards = [];

      // check if cards match selected categories
      const filteredCardsByCategory = cards.filter(card => {
        return this.selectedCategories.some(category => {
          return category.title === card.category[0].title
        })
      })
      
      // check if cards match selected type
      const selectedTypes = this.cardTypes.filter(type => {
        return type.selected === true
      })
      const filteredCardsByType = filteredCardsByCategory.filter(card => {
        return selectedTypes.some(type => {
          return type.id === card.cardType
        })
      })
      
      // check if card is selected
      for (let i = 0; i < filteredCardsByType.length; i++) {
        if (filteredCardsByType[i].selected === true) {
          filteredCards.push(filteredCardsByType[i])
        }
      }

      this.selectedCards = filteredCards

      cards.forEach(card => {
        if (filteredCards.includes(card)) {
          card.selected = true
        } else {
          card.selected = false
        }
      })
    },
    selectAll(category) {
      for (let i = 0; i < this.allCards.length; i++) {
        this.allCards[i].selected = true
      }
      this.shuffle(this.selectedCards);
    },
    deSelectAll(category) {
      for (let i = 0; i < this.allCards.length; i++) {
        this.allCards[i].selected = false
      }
      this.shuffle(this.selectedCards);
    },
    addData() {
      const cards = this.cards
      for (let i = 0; i < cards.length; i++) {
        cards[i].selected = true
        //Vue.set(this.allCards, i, cards[i])
        this.allCards.push(cards[i])
      }

      const categories = this.categories
      for (let i = 0; i < categories.length; i++) {
        categories[i].selected = true
        //Vue.set(this.allCategories, i, categories[i])
        this.allCategories.push(categories[i])
      }

      this.filter();
    }
  },
  mounted() {
    this.addData()
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
          id
          title
          cardText {
            content
          }
          cardType
          category {
            id
            title
          }
          words {
            ... on DictionaryWord {
              title
              ingress
              slug
            }
          }
          disclaimer
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
  padding-bottom: 2rem;
  position: relative;
}
.background {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  img {
    width: 53%;
    max-width: 800px;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: -10%;
  }
  @media (max-width: 800px) {
    display: none;
  }
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
    margin-bottom: 3rem;
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
  z-index: 1002;
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
  &-done {
    grid-column: span 2;
  }

  &-open {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1000;
    .button {
      font-size: 16px;
      padding: .5rem .75rem;
      margin: .5rem 0;
      width: 10rem;
      transform: translateX(-15px);
      background: var(--color-green);
      color: var(--color-black);
    }
  }
  .cards {
    grid-column: span 3;
    margin-top: 2rem;
    border-top: 2px solid rgba(255, 255, 255, .2);
    border-bottom: 2px solid rgba(255, 255, 255, .2);
    .card-lists {
      display: none;
    }
    .readmore {
      cursor: pointer;
      margin: 0 0 1rem;
      max-width: none;
      padding: .75rem 2rem 0 0;
      position: relative;
      &:after {
        content: "▼";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-25%);
      }
    }
    &.visible {
      .card-lists {
        display: block;
      }
      .readmore {
        &:after {
          content: "▲";
        }
      }
    }
  }
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5%;
  padding: .5rem;
  margin: 2rem auto 0;
  color: var(--color-black);

  &-category {
    background: rgba(255, 255, 255,.2);
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    h4 {
      width: 80%;
      text-align: left;
      margin: 0;
    }
  }

  &-wrapper {
    width: 30%;
  }
  @media (max-width: 900px) {
    &-wrapper {
      width: 47.5%;
    }
  }
  @media (max-width: 500px) {
    &-wrapper {
      width: 100%;
    }
  }

  &-select {
    width: 100%;
    font-size: 14px;
    margin-top: .5rem;
    span {
      display: inline-block;
      margin-right: 1.5rem;
      border-bottom: 2px solid #000;
      cursor: pointer;
    }
  }
}
.show-instructions {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
  display: inline-block;
  cursor: pointer;
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
  z-index: 1002;
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
    margin-bottom: 3rem;
  }
}
.intro, .end {
  border: 4px dashed rgba(0, 0, 0, .05);
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
  z-index: 1000;
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
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;

      .button {
        padding: 1rem 1.2rem;
        transform: none;
        width: 48%;
        font-size: 12px;
      }
    }
  }
  .card-list {
    grid-template-columns: 1fr;
  }
}
</style>


<template>
  <main class="site-main">
    <div class="background">
      <img src="/images/snakk-transparent.png" />
    </div>

    <div class="read-more show-instructions">
      <button class="button-textonly" @click="toggleModal('instructions')">Hvordan bruke kortene</button>
      <button class="button button-info" @click="toggleModal('instructions')" aria-label="Instruksjoner"></button>
    </div>

    <section class="page samtalekort">
      <div class="intro" v-if="cardNumber === -1">
        <div class="intro-content">
          <div class="content" v-html="cardIndex.introText"></div>
          <div v-if="!cardStack.length">
            <button class="button" @click="toggleModal('customize')">Velg kort</button>
            <span class="empty-message">Ingen kort valgt</span>
          </div>
          <button class="button" @click="cardNumber++" v-else-if="cardNumber === -1">Trekk et kort</button>
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
          <div class="content" v-html="cardIndex.endText"></div>
          <button class="button" @click="cardNumber = -1">Start på nytt</button>
        </div>
      </div>
    </section>

    <div class="customize-open">
      <button class="button" @click="toggleModal('customize')">Tilpass kortstokken</button>
      <button class="button secondary" @click="shuffle(cardStack)">Stokk bunken</button>
      <span class="cards-chosen">{{cardStack.length}} av {{allCards.length}} kort valgt</span>
    </div>

    <div class="overlay" id="overlay"></div>

    <div class="customize" id="customize">
      <div class="customize-wrapper">
        <h2>Tilpass kortstokken</h2>
        <div class="customize-info">
          <button class="button-textonly" @click="setDefaultState()">Nullstill</button>
          <span class="cards-chosen">{{cardStack.length}} av {{allCards.length}} kort valgt</span>
        </div>
        <div class="customize-options customize-category">
          <h3>Vis kort etter tema</h3>
          <button v-for="category in allCategories" :key="category.id" @click="() => { toggleCategory(category) }">
            <FilterOption :option="category" class="category-option" :checked="isCategorySelected(category)" />
          </button>
          <div v-if="!getSelectedCategories().length" class="empty-message">Du må velge minst ett tema</div>
        </div>
        <div class="customize-options customize-type">
          <h3>Vis kort etter type</h3>
          <button v-for="type in cardTypes" :key="type.id" @click="() => { toggleType(type) }">
            <FilterOption :option="type" class="type-option" :checked="isTypeSelected(type)" />
          </button>
          <div v-if="!getSelectedTypes().length" class="empty-message">Du må velge minst én type</div>
        </div>
        <div class="cards" id="customize-cards" v-if="getSelectedCategories().length && getSelectedTypes().length">
          <button @click="toggle('customize-cards')">
            <h3 class="readmore">Velg hvilke enkeltkort som skal vises</h3>
          </button>
          <div class="card-lists">
            <div class="card-list-category" v-for="(item, index) in selectableCardsByCategory()" :key="`category-card-list-${index}`">
              <div class="card-list-header">
                <h4>{{item.category.title}}</h4>
                <div class="card-list-select" v-if="item.cards.length">
                  <button class="button-textonly" @click="selectAll(item.category); $forceUpdate();">Velg alle</button>
                  <button class="button-textonly" @click="deSelectAll(item.category); $forceUpdate();">Fjern markeringer</button>
                </div>
                <div v-else class="empty-message">Temaet inneholder ingen kort av typen <span v-for="(type, index) in getSelectedTypes()" :key="index" class="empty-message__type">{{ type.title }}</span></div>
              </div>
              <div class="card-list">
                <button class="card-list-wrapper" v-for="card in item.cards" :key="card.id" @click="() => { toggleCard(card) }">
                  <Card :card="card" :checked="isCardSelected(card)" />
                </button>
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
        <div class="content" v-html="cardIndex.body"></div>
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
      selectedCards: [],
      selectedCategories: [],
      selectedTypes: [],
      allCards: [],
      allCategories: [],
      cardTypes: [
        {
          id: 'assertion',
          title: 'Påstander',
        },
        {
          id: 'question',
          title: 'Refleksjonsspørsmål',
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
      return this.shuffle(this.getSelectedCards())
    },
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
    toggleValue(arr, value) {
      let index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
        return false
      } else {
        arr.push(value)
        return true
      }
    },
    removeAll(arr, values) {
      values.forEach(value => {
        if (arr.includes(value)) (
          this.toggleValue(arr, value)
        )
      })
    },
    uniq(arr) {
      return [...new Set(arr)];
    },
    toggleCategory(category) {
      this.selectedCards = this.uniq(this.selectedCards)
      this.selectedCategories = this.uniq(this.selectedCategories)
      const added = this.toggleValue(this.selectedCategories, category.id)
      const cardIds = this.getCardsInCategory(category.id).filter(
        card => this.selectedTypes.some(
          typeId => (typeId === card.cardType)
        )
      ).map(card => card.id)
      if (added) {
        cardIds.filter(
          cardId => !this.selectedCards.includes(cardId)
        ).forEach(
          cardId => this.selectedCards.push(cardId)
        )
      } else {
        this.removeAll(this.selectedCards, cardIds)
      }
      this.saveToLocalStorage()
      this.$forceUpdate()
    },
    toggleType(type) {
      this.selectedTypes = this.uniq(this.selectedTypes)
      const added = this.toggleValue(this.selectedTypes, type.id)
      const cardIds = this.getCardsWithType(type.id).filter(
        card => this.selectedCategories.some(
          categoryId => (categoryId === card.category[0].id)
        )
      ).map(card => card.id)
      if (added) {
        cardIds.filter(
          cardId => !this.selectedCards.includes(cardId)
        ).forEach(
          cardId => this.selectedCards.push(cardId)
        )
      } else {
        this.removeAll(this.selectedCards, cardIds)
      }
      this.saveToLocalStorage()
      this.$forceUpdate()
    },
    toggleCard(card) {
      this.selectedCards = this.uniq(this.selectedCards)
      const added = this.toggleValue(this.selectedCards, card.id)
      this.saveToLocalStorage()
      this.$forceUpdate()
    },
    getSelectedCategories() {
      return this.allCategories.filter(category => this.selectedCategories.includes(category.id))
    },
    getSelectedTypes() {
      return this.cardTypes.filter(type => this.selectedTypes.includes(type.id))
    },
    getSelectedCards() {
      return this.allCards.filter(card => this.selectedCards.includes(card.id))
    },
    getCardsInCategory(categoryId) {
      return this.allCards.filter(card => card.category[0].id === categoryId)
    },
    getCardsWithType(typeId) {
      return this.allCards.filter(card => card.cardType === typeId)
    },
    selectableCardsByCategory() {
      return this.getSelectedCategories().map(category => {
        const cardsInCategory = this.allCards.filter(card => (
          category.id === card.category[0].id && this.selectedTypes.includes(card.cardType)
        ))
        return {
          category: category,
          cards: cardsInCategory,
        }
      })
    },
    isCategorySelected(category) {
      return this.getSelectedCategories().includes(category)
    },
    isTypeSelected(type) {
      return this.getSelectedTypes().includes(type)
    },
    isCardSelected(card) {
      return this.getSelectedCards().some(haystack => haystack.id === card.id)
    },
    selectAll(category) {
      const cardIds = this.getCardsInCategory(category.id).filter(
        card => this.selectedTypes.some(
          typeId => (typeId === card.cardType)
        )
      ).map(card => card.id)
      cardIds.forEach(cardId => {
        if (!this.selectedCards.includes(cardId)) {
          this.selectedCards.push(cardId)
        }
      })
      this.shuffle(this.selectedCards)
    },
    deSelectAll(category) {
      const cardIds = this.getCardsInCategory(category.id).filter(
        card => this.selectedTypes.some(
          typeId => (typeId === card.cardType)
        )
      ).map(card => card.id)
      this.removeAll(this.selectedCards, cardIds)
      this.shuffle(this.selectedCards)
    },
    addData() {
      this.allCards = this.cards
      this.allCategories = this.categories

      try {
        if (localStorage.selectedCards && JSON.parse(localStorage.selectedCards).length) {
          this.loadFromLocalStorage()
        } else {
          this.setDefaultState()
        }
      } catch (error) {
        console.error(error)
        this.setDefaultState()
      }
    },
    setDefaultState() {
      this.selectedCards = this.allCards.map(card => card.id)
      this.selectedCategories = this.allCategories.map(category => category.id)
      this.selectedTypes = this.cardTypes.map(type => type.id)
      this.saveToLocalStorage()
      this.$forceUpdate()
    },
    saveToLocalStorage() {
      localStorage.selectedCards = JSON.stringify(this.selectedCards)
      localStorage.selectedCategories = JSON.stringify(this.selectedCategories)
      localStorage.selectedTypes = JSON.stringify(this.selectedTypes)
    },
    loadFromLocalStorage() {
      const validCardIds = this.allCards.map(card => card.id)
      const validCategoryIds = this.allCategories.map(category => category.id)
      const validTypeIds = this.cardTypes.map(type => type.id)
      this.selectedCards = JSON.parse(localStorage.selectedCards).filter(
        cardId => validCardIds.includes(cardId)
      )
      this.selectedCategories = JSON.parse(localStorage.selectedCategories).filter(
        categoryId => validCategoryIds.includes(categoryId)
      )
      this.selectedTypes = JSON.parse(localStorage.selectedTypes).filter(
        typeId => validTypeIds.includes(typeId)
      )
      this.$forceUpdate()
    },
    keyDownHandler(event) {
      if (event.key === "ArrowLeft") {
        if (this.cardNumber > 0) {
          this.cardNumber--
          event.preventDefault()
        }
        return
      }
      if (event.key === "ArrowRight") {
        if (this.cardNumber < this.cardStack.length) {
          this.cardNumber++
          event.preventDefault()
        }
        return
      }
    }
  },
  mounted() {
    this.addData()
    window.addEventListener("keydown", this.keyDownHandler)
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler)
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
        ... on cardsIndex_cardsIndex_Entry {
          ingress
          introText
          endText
          body
        }
      }
    }`,
    cards: gql`
    query {
      cards: entries(section: "cards") {
    		... on cards_cards_Entry {
          id
          title
          cardText
          cardType
          category {
            id
            title
          }
          words {
            ... on dictionary_word_Entry {
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
      categories: categories(group: "cards") {
    		... on cards_Category {
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
.page.samtalekort {
  padding: 3.6rem 2rem 1rem;
}
.intro {
  text-align: center;
  text-shadow: 
    1px 1px 1px var(--color-yellow),
    1px -1px 1px var(--color-yellow),
    -1px 1px 1px var(--color-yellow),
    -1px -1px 1px var(--color-yellow),
    0 0 5px var(--color-yellow);
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
  z-index: 3002;
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
    grid-column: span 2;
    text-align: left;
    width: 100%;
    max-width: none;
    margin-bottom: .5rem;
  }
  h3 {
    font-weight: 700;
    display: block;
    margin: .8rem 0;
  }
  h4 {
    font-size: 1rem;
  }
  &-done {
    grid-column: span 2;
  }

  &-open {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 1000;
    .button {
      font-size: 16px;
      padding: .6rem .8rem;
      margin: .5rem 0;
      width: 10rem;
      background: var(--color-green);
      color: var(--color-black);
    }
    span {
      font-size: 14px;
      display: block;
      width: 100%;
      text-align: center;
      padding: 0 .75rem;
    }
  }
  &-options {
    button {
      width: 100%;
    }
  }
  &-info {
    display: block;
    grid-column: span 2;
    font-size: 14px;
    margin-bottom: 1rem;
    span {
      margin-right: 1.5rem;
    }
  }
  .cards {
    grid-column: span 2;
    margin-top: 2rem;
    border-top: 2px solid rgba(255, 255, 255, .2);
    border-bottom: 2px solid rgba(255, 255, 255, .2);
    .card-lists {
      display: none;
    }
    > button {
      width: 100%;
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
  }
}
.show-instructions {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
  display: inline-block;
  cursor: pointer;
  .button-textonly {
    margin: 0;
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
  z-index: 3002;
  overflow-y: scroll;
  padding: 2rem 2rem 6rem;

  &-wrapper {
    padding: 3rem 3rem 2rem;
    max-width: 800px;
    margin: 0 auto;
    background: var(--color-green);
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
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro, .end, .card-wrapper {
  min-height: 70vh;
  width: 80%;
  max-width: 1000px;
  margin: 1rem auto 2rem;
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
  z-index: 3000;
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
.empty-message {
  font-style: italic;
  font-size: .8rem;
  display: inline-block;
  &:before {
    content: "!";
    display: inline-block;
    background: var(--color-pink);
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    margin-right: .3rem;
    text-align: center;
    border-radius: 50px;
    text-shadow: none;
    font-style: normal;
    color: var(--color-white);
    font-weight: 700;
  }
  &__type {
    text-transform: lowercase;
  }
}
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
    padding: 3rem 0 0;
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
    &-close, &-info {
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
    .button-textonly {
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
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;

      .button {
        padding: 1rem 1.2rem;
        transform: none;
        width: 48%;
        margin-bottom: 1rem;
        font-size: 12px;
      }
    }
  }
  .card-list {
    grid-template-columns: 1fr;
  }
}
</style>


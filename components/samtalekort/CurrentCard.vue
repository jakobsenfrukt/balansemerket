<template>
  <div class="card current">
    <div class="content" v-html="card.cardText.content"></div>
    <div v-if="card.disclaimer" class="disclaimer">{{ card.disclaimer }}</div>
    <div class="show-word" v-if="card.words.length">
      <button class="button button-question" @click="showWord = !showWord" :aria-label="`Hva betyr ${card.words[0].title}`"></button>
    </div>
    <div class="word" :class="{visible: showWord}" v-if="card.words.length">
      <h2>{{card.words[0].title}}</h2>
      <p class="word-definition">{{card.words[0].ingress}}</p>
      <a :href="`/ordliste/${card.words[0].slug}`" target="_blank">Les mer i ordlisten</a>
      <button class="button button-close" @click="showWord = !showWord" aria-label="Lukk"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data() {
    return {
      showWord: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  background: white;
  border-radius: 2rem;
  box-shadow:
    -2px 2px 0 1px rgb(212, 212, 212),
    -.8rem .8rem 0 rgba(0, 0, 0, .2);
  text-align: center;
  margin: 1rem;
  position: relative;
  z-index: 2000;

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 4rem;
}
.content {
  font-size: 2rem;
}
.disclaimer {
  font-size: 14px;
  font-style: italic;
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  right: 4rem;
}
.button-question {
  width: 2rem;
  height: 2rem;
  position: static;
  background-color: var(--color-darkgreen);
}
.button-close {
  width: 2rem;
  height: 2rem;
}
.show-word {
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
.word {
  position: absolute;
  bottom: 1rem;
  right: -1rem;
  background: var(--color-green);
  box-shadow: 0 0 10px rgba(0, 0, 0, .6);
  border-radius: 1rem;
  padding: 1rem 1.5rem 1.25rem;
  width: 400px;
  max-width: 100%;
  text-align: left;

  display: none;
  &.visible {
    display: block;
  }

  h2 {
    font-size: 1.2rem;
    margin: .25rem 0 1rem;
    text-align: left;
  }

  p {
    margin: 0 0 1rem;
  }
}
@media (max-width: 800px) {
  .card {
    margin: 2rem 0;
    width: 100%;
    padding: 2rem 1.5rem;
    min-height: 45vh;
    .content {
      font-size: 1.2rem;
    }
    .disclaimer {
      font-size: 10px;
      line-height: 1;
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
    }
    .show-word {
      bottom: auto;
      top: 1rem;
      right: 1rem;
    }
    .word {
      bottom: auto;
      top: 1rem;
    }
  }
}
</style>

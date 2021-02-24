<template>
  <div class="card current">
    <div class="content" v-html="card.cardText.content"></div>
    <div class="dictionary-word" v-if="card.words.length">
      Hva betyr <a href="#" target="_blank" class="word">{{card.words[0].title}}</a>?
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object
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

  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-size: 2rem;
  padding: 4rem;
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
@media (max-width: 800px) {
  .card {
    margin: 2rem 0;
    width: 100%;
    padding: 2rem 1.5rem;
    font-size: 1rem;
    min-height: 45vh;
  }
}
</style>

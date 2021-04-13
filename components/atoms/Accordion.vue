<template>
  <div class="accordion" :id="id">
    <h2 @click="readMore(id)" class="read-more">{{ heading }}</h2>
    <div class="accordion-content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    content: String,
    id: String
  },
  methods: {
    readMore(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  max-width: var(--width-s);
  margin: 2rem auto 0;
  padding: .8rem 0;
  border-top: 2px solid var(--color-black);
  border-bottom: 2px solid var(--color-black);
  .read-more {
    cursor: pointer;
    margin: 0;
    padding-right: 2rem;
    position: relative;
    &:after {
      content: "▼";
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  &-content {
    margin: 2rem auto;
    display: none;
  }
  &.visible {
    .accordion-content {
      display: block;
    }
    .read-more {
      &:after {
        content: "▲";
      }
    }
  }
}
</style>


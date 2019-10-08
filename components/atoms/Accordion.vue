<template>
  <div class="accordion">
    <h2 @click="readMore(id)" class="accordion-key">{{ heading }}</h2>
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
    readMore: function(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


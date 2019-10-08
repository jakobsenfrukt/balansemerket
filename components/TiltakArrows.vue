<template>
  <nav v-if="current" class="tiltak-arrows">
    <div class="prev">
      <a v-if="arrows.prev" :href="arrows.prev.slug">&larr; {{ arrows.prev.title }}</a>
      <a v-else href="/">&larr; Forsiden</a>
    </div>
    <div class="next">
      <a v-if="arrows.next" :href="arrows.next.slug">{{ arrows.next.title }} &rarr;</a>
      <a v-else href="/om">Om merket &rarr;</a>
    </div>
  </nav>
  <nav v-else class="tiltak-arrows index">
    <div class="prev">
    </div>
    <div class="next">
      <a :href="`tiltak/${tiltak[0].slug}`">{{ tiltak[0].title }} &rarr;</a>
    </div>
  </nav>
</template>

<script>
import gql from 'graphql-tag'
import Wave from '~/components/atoms/Wave.vue'

export default {
  components: {
    Wave
  },
  apollo: {
    tiltak: gql`
    query {
      tiltak: entries(section:tiltak) {
    		... on Tiltak {
          title
          slug
        }
      }
    }`
  },
  props: {
    current: String
  },
  computed: {
    arrows() {
      var i;
      for(i = 0; i < this.tiltak.length; i++) {
        if (this.tiltak[i].slug === this.current) {
          if (i === 0) {
            var y = i + 1;
            return {
              next: this.tiltak[y]
            }
          }
          else if (i === this.tiltak.length) {
            var x = i - 1;
            return {
              prev: this.tiltak[x]
            }
          }
          else {
            var x = i - 1;
            var y = i + 1;
            return {
              prev: this.tiltak[x],
              next: this.tiltak[y]
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.tiltak-arrows {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    display: block;
    font-size: 3rem;
  }
}
</style>

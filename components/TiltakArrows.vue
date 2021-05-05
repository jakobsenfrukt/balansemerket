<template>
  <nav v-if="current" class="tiltak-arrows">
    <div class="prev">
      <a v-if="arrows.prev" :href="`/tiltak/${arrows.prev.slug}`">&larr; {{ arrows.prev.title }}</a>
      <a v-else href="/">&larr; Forsiden</a>
    </div>
    <div class="next">
      <a v-if="arrows.next" :href="`/tiltak/${arrows.next.slug}`">{{ arrows.next.title }} &rarr;</a>
      <a v-else href="/om">Om merket &rarr;</a>
    </div>
  </nav>
  <nav v-else-if="index" class="tiltak-arrows index">
    <div class="prev">
    </div>
    <div class="next">
      <a :href="`tiltak`">Tiltak &rarr;</a>
    </div>
  </nav>
  <nav v-else class="tiltak-arrows index">
    <div class="prev">
    </div>
    <div class="next">
      <a :href="`/tiltak/${tiltak[0].slug}`">{{ tiltak[0].title }} &rarr;</a>
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
      tiltak: entries(section: "tiltak") {
    		... on tiltak_tiltak_Entry {
          title
          slug
        }
      }
    }`
  },
  props: {
    current: String,
    index: Boolean
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
.tiltak-arrows {
  padding-top: 7rem;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    border: none;
    display: block;
    font-size: 3rem;
    transition: all .2s ease-in-out;
    &:hover {
      color: var(--color-pink);
      border-color: var(--color-pink);
    }
  }
  .next {
    text-align: right;
  }
  .prev {
    text-align: left;
  }

  @media (max-width: 700px) {
    flex-wrap: wrap;
    a {
      font-size: 2rem;
    }
    .next, .prev {
      width: 100%;
    }
    .next {
      order: 1;
    }
    .prev {
      order: 2;
    }
  }
}
</style>

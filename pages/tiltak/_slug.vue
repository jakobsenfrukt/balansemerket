<template>
  <main class="site-main">
    <section class="page tiltak-page">
      <Intro
        :title="tiltak.title"
        :lead="tiltak.ingress"
      />
      <img v-if="tiltak.toppbilde.length" class="main-illustration" :src="tiltak.toppbilde[0].fullWidth" />
      <div v-for="(block, index) in tiltak.innhold" :key="index" :class="block.__typename">
        <div v-if="block.__typename === 'InnholdTekst'" class="text">
          <h2>{{ block.overskrift }}</h2>
          <div v-html="block.tekst.content"></div>
        </div>
        <div v-if="block.__typename === 'InnholdBilde'" class="image">
          <img :src="block.bilde[0].fullWidth" />
        </div>
        <div v-if="block.__typename === 'InnholdTrekkspill'" class="accordion" :id="`accordion-${index}`">
          <h2 @click="readMore('accordion-' + index)" class="read-more">{{ block.overskrift }}</h2>
          <div class="content" v-html="block.tekst.content"></div>
        </div>
        <div v-if="block.__typename === 'InnholdFremhevetTekst'" class="text large">
          <div v-html="block.tekst.content"></div>
        </div>
        <div v-if="block.__typename === 'InnholdPdf'" class="pdf">
          <a :href="block.pdf[0].url" target="_blank">{{ block.lenketekst }}</a>
        </div>
      </div>
    </section>
    <TiltakArrows :current="tiltak.slug" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Intro from '~/components/Intro.vue'
import TiltakArrows from '~/components/TiltakArrows.vue'
export default {
  components: {
    Intro,
    TiltakArrows
  },
  head () {
    return {
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Tiltak for et trygt kulturliv.' 
        }
      ]
    }
  },
  methods: {
    readMore: function(id) {
      document.getElementById(id).classList.toggle('visible')
    }
  },
  apollo: {
    tiltak: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query Tiltak($slug: String!) {
        tiltak: entry(slug: $slug) {
          ... on Tiltak {
            title
            ingress
            toppbilde {
              fullWidth: url(transform: fullWidth)
            }
            innhold {
              ... on InnholdTekst {
                __typename
                overskrift
                tekst {
                  content
                }
              }
              ... on InnholdBilde {
                __typename
                bilde {
                  fullWidth: url(transform: fullWidth)
                }
              }
              ... on InnholdTrekkspill {
                __typename
                overskrift
                tekst {
                  content
                }
              }
              ... on InnholdFremhevetTekst {
                __typename
                tekst {
                  content
                }
              }
              ... on InnholdPdf {
                __typename
                pdf {
                  url
                }
                lenketekst
              }
            }
            slug
          }
        }
      }`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.image {
  max-width: 1200px;
  margin: 2rem auto;
}
.accordion {
  width: 100%;
  max-width: $width-s;
  margin: 2rem auto 0;
  padding: .8rem 0;
  border-top: 2px solid $color-black;
  border-bottom: 2px solid $color-black;
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
  .content {
    margin: 2rem auto;
    display: none;
  }
  &.visible {
    .content {
      display: block;
    }
    .read-more {
      &:after {
        content: "▲";
      }
    }
  }
}
.InnholdTrekkspill + .InnholdTrekkspill {
  .accordion {
    border-top: none;
    margin-top: 0;
  }
}
.InnholdTekst + .InnholdTrekkspill {
  margin-top: 4rem;
}
.pdf {
  max-width: $width-s;
  margin: 2rem auto;
  color: $color-red;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.2;
  &:before {
    content: "→ ";
  }
}
</style>


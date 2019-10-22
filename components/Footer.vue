<template>
  <footer class="site-footer">
    <div class="columns">
      <div v-for="(block, index) in globals.footer.tekstkolonner" :key="index" class="column">
        <h3 v-if="block.overskrift">{{ block.overskrift }}</h3>
        <div v-html="block.tekst.content"></div>
      </div>
    </div>
    <a href="https://balansekunstprosjektet.no/" target="_blank" class="bklogo"><BKLogo /></a>
    <div class="footnote">
      {{ globals.footer.bunntekst }}
    </div>
    <a class="to-top" href="#">
      Til toppen
    </a>
  </footer>
</template>

<script>
import gql from 'graphql-tag'
import BKLogo from '~/components/atoms/BKLogo.vue'

export default {
  components: {
    BKLogo
  },
  apollo: {
    globals: gql`
    query {
      globals {
        footer {
          tekstkolonner {
            ... on TekstkolonnerTekstkolonne {
              overskrift
              tekst {
                content
              }
            }
          }
          bunntekst
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.site-footer {
  width: 100%;
  font-size: .8rem;
  padding: 2rem;
}
.columns {
  margin: 0 auto 4rem;

  .column {
    width: 28%;
    min-width: 280px;
    display: block;
    margin: 2rem auto;

    &:nth-child(1) {
      margin-left: 0;
    }
    &:nth-child(3) {
      margin-right: 0;
    }

    h3, p {
      margin: 0 0 .5rem;
    }

    h3 {
      font-weight: normal;
      font-size: 1em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    a {
      color: inherit;
      text-decoration: none;
      display: inline-block;
      border-bottom: 2px solid $color-text;
      line-height: 1;
      transition: all .2s ease-in-out;
      &:hover {
        color: $color-red;
        border-color: $color-red;
      }
    }
  }
}
.footnote {
  float: left;
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.to-top {
  text-decoration: none;
  display: block;
  float: right;
  line-height: 1;
  border-bottom: 2px solid $color-black;
}
@media (max-width: $width-s) {
  .site-footer {
    padding-bottom: 5rem;
  }
  .columns {
    div {
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        margin-left: 0;
      }
    }
  }
}
.bklogo {
  display: block;
  margin: 1rem 0;
}
</style>

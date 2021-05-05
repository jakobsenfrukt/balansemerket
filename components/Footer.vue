<template>
  <footer class="site-footer">
    <div class="columns">
      <div v-for="(block, index) in footer.tekstkolonner" :key="index" class="column">
        <h3 v-if="block.overskrift">{{ block.overskrift }}</h3>
        <div v-html="block.tekst"></div>
      </div>
    </div>
    <a href="https://balansekunstprosjektet.no/" target="_blank" class="bklogo"><BKLogo invert /></a>
    <div class="footnote">
      {{ footer.bunntekst }}
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
    footer: gql`
    query {
      footer: globalSet(ref: "Footer") {
        ... on footer_GlobalSet {
          tekstkolonner {
            ... on tekstkolonner_tekstkolonne_BlockType {
              overskrift
              tekst
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
.site-footer {
  width: 100%;
  font-size: .8rem;
  padding: 2rem;
  background: var(--color-text);
  color: var(--color-background);
}
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 2rem auto;

  .column {
    padding-right: 3rem;

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
      border-bottom: 2px solid var(--color-text);
      line-height: 1;
      transition: all .2s ease-in-out;
      &:hover {
        color: var(--color-red);
        border-color: var(--color-red);
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
  text-decoration: underline;
  display: block;
  float: right;
  line-height: 1;
  border-bottom: 2px solid var(--color-black);
}
@media (max-width: 800px) {
  .site-footer {
    padding-bottom: 1rem;
  }
  .columns {
    grid-template-columns: 1fr;
    div {
      max-width: 500px;
      margin-bottom: 2rem;
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        margin-left: 0;
      }
    }
  }
  .footnote {
    float: none;
  }
  .to-top {
    padding: 2rem 0;
    float: none;
    text-align: right;
  }
}
.bklogo {
  display: block;
  margin: 1rem 0;
}
</style>

<template>
  <footer class="site-footer">
    Utviklet av
    <a href="https://balansekunstprosjektet.no/" target="_blank" class="bklogo"><BKLogo invert /></a>
    i samarbeid med
    <div class="friends">
      <div v-for="(partner, index) in cardIndex.partners" :key="index" class="friend">
        <a :href="partner.websiteUrl" target="_blank">
          <img :src="partner.logo[0].thumb" :alt="partner.logo[0].title" />
        </a>
      </div>
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
    cardIndex: gql`
    query {
      cardIndex: entry(title: "Samtalekort: Forside") {
        ... on CardsIndex {
          partners {
          ... on PartnersPartner {
              partnerName
              websiteUrl
              logo {
                thumb: url(transform: thumbnail)
                title
              }
            }
          }
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
  background: $color-text;
  color: $color-background;
}
.friends {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 2rem auto;

  .friend {
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
.to-top {
  text-decoration: underline;
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

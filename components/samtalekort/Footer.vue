<template>
  <footer class="site-footer">
    <div class="balansekunst">
      <h2>Utviklet av</h2>
      <a href="https://balansekunstprosjektet.no/" target="_blank" class="bklogo"><BKLogo invert /></a>
      <p>med støtte fra <a href="https://www.sparebankstiftelsen.no/" target="_blank">Sparebankstiftelsen</a></p>
    </div>
    <div class="friends">
      <h2>i samarbeid med</h2>
      <div class="friend-list">
        <div v-for="(partner, index) in cardIndex.partners" :key="index" class="friend">
          <a :href="partner.websiteUrl" target="_blank">
            {{partner.partnerName}}
          </a>
        </div>
      </div>
    </div>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
h2 {
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
  font-size: 1.2rem;
  width: 100%;
  margin: 0 0 1rem;
}
p {
  margin: 0 0 1rem;
}
.friends {
  grid-column: span 2;
}
.friend-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .friend {
    a {
      font-size: 1rem;
      color: inherit;
      display: inline-block;
      text-decoration: none;
      margin-bottom: .5rem;
      border-bottom: 1px solid var(--color-white);
      line-height: 1.2;
      transition: all .2s ease-in-out;
      &:hover {
        color: var(--color-green);
        border-color: var(--color-green);
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
@media (max-width: 1000px) {
  .friend-list {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 800px) {
  .site-footer {
    padding-bottom: 5rem;
    grid-template-columns: 1fr;
  }
  .friend-list {
    grid-template-columns: 1fr;
  }
}
.bklogo {
  display: block;
  margin: 1rem 0;
}
</style>

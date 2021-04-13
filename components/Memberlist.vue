<template>
  <section class="members" id="deltakere">
    <h2>Disse har oppnådd Balansemerket</h2>
    <div v-if="deltakere.deltakere.length" class="member-list">
      <a v-for="(member, index) in deltakere.deltakere" :key="index" :href="member.nettsideUrl" target="_blank" class="member">
        <div class="member-logo">
          <img :src="member.logo[0].url" :alt="member.logo[0].title" />
        </div>
        <div class="member-text">
          <!--<h3>{{ member.navn }}</h3>-->
          <p>{{ member.tekst }}</p>
        </div>
      </a>
    </div>
    <div v-else>
      <div v-html="deltakere.reservetekst"></div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    deltakere: gql`
    query {
      deltakere: entry(title: "Deltakere") {
        ... on deltakere_medlemmer_Entry {
          deltakere {
            ... on deltakere_deltaker_BlockType {
              navn
              tekst
              logo {
                url
                title
              }
              nettsideUrl
            }
          }
          reservetekst
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.members {
  margin-top: 8rem;
  h2 {
    font-size: 2.8rem;
  }
}
.member-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;

  @media (max-width: 1000px) {
    display: block;
  }
}
.member {
  width: 50%;
  display: flex;
  align-items: center;
  margin: 0 auto 2rem;
  text-decoration: none;

  @media (max-width: 1000px) {
    width: 100%;
    max-width: 32rem;
  }

  &-logo {
    width: 40%;
    padding-right: 1.2rem;
    img {
      display: block;
      width: auto;
      margin: 0 auto;
      max-width: 100%;
      min-width: 5rem;
      max-height: 16rem;
      filter: grayscale(100%);
      transition: filter .2s linear;

      &:hover {
        filter: grayscale(0);
      }
    }
  }
  &-text {
    width: 60%;
    padding-right: 2rem;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: .2rem;
  }

  p {
    font-size: .8rem;
  }
}
</style>
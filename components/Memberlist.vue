<template>
  <section class="members" id="deltakere">
    <h2>Deltakere i ordningen</h2>
    <div v-if="deltakere.deltakere.length" class="member-list">
      <a v-for="(member, index) in deltakere.deltakere" :key="index" :href="member.nettsideUrl" target="_blank" class="member">
        <div class="member-logo">
          <img :src="member.logo[0].url" />
        </div>
        <div class="member-text">
          <h3>{{ member.navn }}</h3>
          <p>{{ member.tekst }}</p>
        </div>
      </a>
    </div>
    <div v-else>
      <p>&mdash;</p>
      <p>Bli den første! Send en mail til <a href="mailto:hei@balansekunstprosjektet.no">hei@balansekunstprosjektet.no</a></p>
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
        ... on DeltakereMedlemmer {
          deltakere {
            ... on DeltakereDeltaker {
              navn
              tekst
              logo {
                url
              }
              nettsideUrl
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

  @media (max-width: $media-m) {
    display: block;
  }
}
.member {
  width: 50%;
  display: flex;
  align-items: center;
  margin: 0 auto 2rem;
  text-decoration: none;

  @media (max-width: $media-m) {
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
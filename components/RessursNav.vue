<template>
  <nav class="ressurs-nav">
    <ol>
      <li>
        <a href="/ressurser"><strong>Ressurser</strong></a>
      </li>
      <li><a href="https://kurs.balansemerket.no">Nettkurs</a></li>
      <li><a href="/samtalekort">Samtalekort</a></li>
      <li><a href="/ordliste">Ordliste</a></li>
      <li v-for="category in categories" :key="category.id">
        <a :href="`/ressurser/kategori/${category.slug}`">{{ category.title }}</a>
      </li>
    </ol>
  </nav>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    categories: gql`
    query {
      categories(group: "ressurser") {
        ... on ressurser_Category {
          id
          title
          ingress
          slug
          color
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.ressurs-nav {
  font-size: .8rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  ol {
    list-style: none;
    max-width: 32rem;
    margin: 0 auto 2rem;
    padding: 0;
  }
  li {
    margin: 0 0 1rem;
  }
  a {
    text-decoration: none;
    display: block;
    border: none;
  }

  @media (max-width: 1000px) {
    position: static;
    margin: 3rem auto;
  }
}
</style>

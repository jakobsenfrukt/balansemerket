<template>
  <main class="site-main">
    <h1>{{ ressursside.overskrift }}</h1>
    <p v-if="ressursside.ingress" class="lead">{{ ressursside.ingress }}</p>
    <ResourceList :categories="categories" :resources="ressurser" :resourcePage="ressursside" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import ResourceList from '~/components/ressurser/ResourceList.vue'

export default {
  components: {
    ResourceList
  },
  head () {
    return {
      title: 'Balansemerket: ' + this.ressursside.overskrift,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.ressursside.ingress
        }
      ]
    }
  },
  apollo: {
    ressursside: gql`
    query {
      ressursside: entry(title: "Samleside for ressurser") {
        ... on alleRessurser_alleRessurser_Entry {
          overskrift
          ingress
          coursesLead
          cardsLead
          dictionaryLead
        }
      }
    }`,
    ressurser: gql`
    query {
      ressurser: entries(section: "ressurser") {
        ... on ressurser_ressurser_Entry {
          __typename
          title
          ingress
          slug
          resourcesCategory {
            id
            title
          }
        }
        ... on ressurser_pdfRessurs_Entry {
          __typename
          title
          ingress
          pdf {
            url
          }
          resourcesCategory {
            id
            title
          }
        }
      }
    }`,
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
h2, h3 {
  margin: 0;
}
a {
  margin-bottom: .5rem;
}
.lead {
  margin-bottom: 2rem;
}
.page-list li {
  margin-bottom: 2rem;
}
.pdf-ressurs {
  position: relative;
}
.pdf-label {
  position: absolute;
  top: .6rem;
  right: 0;
  transform: translateX(110%);
  font-size: .8rem;
  font-weight: 500;
}
</style>


<template>
  <main class="site-main">
    <div class="category-header">
      <a href="/ressurser">Ressurser</a>
      <h1 class="category-title">{{ category.title }}</h1>
      <p class="lead category-lead" v-if="category.ingress">{{ category.ingress }}</p>
    </div>
    <section class="page resource-category-page">
      <ul class="resource-list">
        <li 
          v-for="resource in resourcesByCategory[category.id]" 
          :key="resource.id" 
          class="resource"
          :class="{nobackground: !resource.color}"
          :style="{ background: resource.color}"
        >
          <div v-if="resource.toppbilde.length" class="resource-image">
            <img :src="resource.toppbilde[0].url" />
          </div>
          <template v-if="resource.__typename === 'ressurser_pdfRessurs_Entry'">
            <div class="resource-text">
              <h3 class="resource-title pdf-title">{{ resource.title }}</h3>
              <span class="pdf-label">(PDF)</span>
              <p>{{ resource.ingress }}</p>
            </div>
            <a class="resource-link" :href="`${resource.pdf[0].url}`" target="_blank">Last ned PDF</a>
          </template>
          <template v-else>
            <div class="resource-text">
              <h3 class="resource-title">{{ resource.title }}</h3>
              <p>{{ resource.ingress }}</p>
            </div>
            <a class="resource-link" :href="`/ressurser/${resource.slug}`">Gå til ressurs</a>
          </template>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import ContentBlocks from '~/components/atoms/ContentBlocks.vue'

export default {
  components: {
    ContentBlocks
  },
  computed: {
    resourcesByCategory() {
      var sortedResources = {};
      for (var i = 0, max = this.resources.length; i < max ; i++ ) {
          if (sortedResources[this.resources[i].resourcesCategory[0].id] == undefined ) {
            sortedResources[this.resources[i].resourcesCategory[0].id] = [];
          }
          sortedResources[this.resources[i].resourcesCategory[0].id].push(this.resources[i]);
      }
      return sortedResources
    }
  },
  head () {
    return {
      title: this.category.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.category.ingress
        }
      ]
    }
  },
  apollo: {
    category: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: gql`
      query category($slug: String!) {
        category: category(slug: [$slug]) {
          ... on ressurser_Category {
            id
            title
            ingress
            slug
          }
        }
      }`
    },
    resources: gql`
    query {
      resources: entries(section: "ressurser") {
        ... on ressurser_ressurser_Entry {
          __typename
          title
          ingress
          slug
          toppbilde {
            url
          }
          color
          resourcesCategory {
            id
            title
          }
        }
        ... on ressurser_pdfRessurs_Entry {
          __typename
          title
          ingress
          toppbilde {
            url
          }
          color
          pdf {
            url
          }
          resourcesCategory {
            id
            title
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.category-header {
  max-width: 40em;
  margin: 0 auto;
}
.category-title {
  font-size: 3rem;
  max-width: none;
}
.category-lead {
  margin-left: 0;
}
.resource-list {
  list-style: none;
  margin: 3rem auto 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.4rem;
  max-width: 1600px;

  .resource {
    margin: 0;
    border-radius: 1rem;
    position: relative;
    &-text {
      padding: 1.2rem 1.8rem 1.4rem;
      position: relative;
    }
    &-image {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      width: 100%;
      padding-top: 60%;
      position: relative;
      overflow: hidden;

      img {
        display: block;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-nobackground {
      .resource-image {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }
    &-title {
      margin: 0 0 .8rem;
      font-size: 1.6rem;
      line-height: 1.2;
      text-decoration: underline;
      &.pdf-title {
        padding-right: 3rem;
      }
    }
    &-link {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      overflow: hidden;
      text-indent: -9999px;
      z-index: 0;
    }
    transition: transform .2s ease-in-out;
    &:hover {
      transform: translateY(-10px);
    }
  }
}
.pdf-label {
  position: absolute;
  top: 1.4rem;
  right: 1.8rem;
  font-size: .8rem;
  font-weight: 500;
}
@media (max-width: 1100px) {
  .resource-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 700px) {
  .resource-list {
    grid-template-columns: 1fr;
  }
}
</style>


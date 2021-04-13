<template>
  <section class="resources">
    <ul class="resource-grid">
       <li class="category">
        <h2>
          <a href="https://kurs.balansemerket.no/">Nettkurs</a>
        </h2>
        <p class="lead">Litt om nettkurs</p>
      </li>
      <li class="category">
        <h2>
          <a href="/samtalekort">Samtalekort</a>
        </h2>
        <p class="lead">Litt om samtalekort</p>
      </li>
      <li class="category">
        <h2>
          <a href="/ordliste">Ordliste</a>
        </h2>
        <p class="lead">Litt om ordlisten</p>
      </li>
      <li v-for="category in categories" :key="category.id" class="category">
        <h2>
          <a :href="`/ressurser/kategori/${category.slug}`">{{ category.title }}</a>
        </h2>
        <p class="lead" v-if="category.ingress">{{ category.ingress }}</p>
        <ul class="resource-list">
          <li v-for="resource in resourcesByCategory[category.id]" :key="resource.id" class="resource">
            <template v-if="resource.__typename === 'ressurser_pdfRessurs_Entry'">
              <a :href="`${resource.pdf[0].url}`" target="_blank" class="pdf-ressurs">
                <h3 class="resource-title">{{ resource.title }}</h3>
                <span class="pdf-label">(PDF)</span>
              </a>
              <p>{{ resource.ingress }}</p>
            </template>
            <template v-else>
              <h3 class="resource-title"><a :href="`/ressurser/${resource.slug}`">{{ resource.title }}</a></h3>
              <p>{{ resource.ingress }}</p>
            </template>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    categories: Array,
    resources: Array
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
  }
}
</script>

<style lang="scss" scoped>
.resources {
  ul, p, h2, h3 {
    max-width: none;
  }
}
.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  list-style: none;

  .lead {
    font-size: 1rem;
  }

  .category {
    background: pink;
    padding: 1.4rem 2rem;
    border-radius: 1rem;
  }
}
.resource-list {
  .resource {
    margin: 0 0 1rem;
    &-title {
      margin: 0;
    }
  }
}
.pdf-ressurs {
  display: inline-block;
  position: relative;
}
.pdf-label {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(110%);
  font-size: .8rem;
  font-weight: 500;
}
</style>
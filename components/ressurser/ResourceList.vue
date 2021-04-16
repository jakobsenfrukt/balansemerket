<template>
  <section class="resources">
    <ul class="resource-grid">
       <li class="category quiz">
        <h2 class="category-title">Nettkurs</h2>
        <p class="lead">Litt om nettkurs</p>
        <a class="category-link" href="https://kurs.balansemerket.no/">Gå til nettkursene</a>
      </li>
      <li class="category cards">
        <h2 class="category-title">Samtalekort</h2>
        <p class="lead">Litt om samtalekort</p>
        <a class="category-link" href="/samtalekort">Gå til samtalekortene</a>
      </li>
      <li class="category dictionary">
        <h2 class="category-title">Ordliste</h2>
        <p class="lead">Litt om ordlisten</p>
        <a class="category-link" href="/ordliste">Gå til ordlisten</a>
      </li>
      <li v-for="category in categories" :key="category.id" class="category" :style="{ background: category.color}">
        <h2 class="category-title">{{ category.title }}</h2>
        <p class="lead" v-if="category.ingress">{{ category.ingress }}</p>
        <a class="category-link" :href="`/ressurser/kategori/${category.slug}`">Gå til kategori</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    categories: Array,
    resources: Array
  }
}
</script>

<style lang="scss" scoped>
.resources {
  p, h2, h3 {
    max-width: none;
  }
}
.resource-grid {
  list-style: none;
  padding: 0;
  margin: 3rem auto;
  max-width: 1600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.4rem;

  .category {
    background: var(--color-yellow);
    padding: 1.4rem 1.8rem;
    border-radius: 1rem;
    grid-column: span 1;
    position: relative;
    
    &-title {
      text-transform: uppercase;
      font-size: 1.4rem;
      letter-spacing: 1px;
      text-decoration: underline;
      a {
        text-decoration: none;
      }
    }
    &.quiz {
      background: var(--color-green);
    }
    &.cards {
      background: var(--color-pink);
    }
    &.dictionary {
      background: var(--color-red);
    }
    .lead {
      max-width: 32rem;
      font-size: 1rem;
      margin: 0 0 2rem;
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
    transition: all .2s ease-in-out;
    &:hover {
      transform: translateY(-4px);
    }
  }
}

@media (max-width: 1100px) {
  .resource-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 700px) {
  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>
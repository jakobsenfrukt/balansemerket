<template>
  <header class="site-header">
    <div class="logo">
      <a href="/"><Logo /></a>
    </div>
    <div class="menu-toggle" :class="{ open: open }" @click="open = !open">
      <template v-if="open">&#9776;</template>
      <template v-else>&#9776;</template>
    </div>
    <div class="site-nav" :class="{ open: open }">
      <nav>
        <a v-for="(page, index) in page" :key="index" :href="`${page.slug}`">
          {{ page.title }} <Wave />
        </a>
        <a class="featured" href="https://kurs.balansemerket.no">Nettkurs</a>
        <a class="featured kort" href="/samtalekort">Samtalekort</a>
        <a class="balansekunst-link" href="https://balansekunstprosjektet.no" target="_blank">Til Balansekunst &#8599;</a>
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/atoms/Logo.vue'
import Wave from '~/components/atoms/Wave.vue'

export default {
  components: {
    Logo,
    Wave
  },
  data: function() {
    return {
      open: false,
      page: [
        {
          title: "Tiltak",
          slug: "/tiltak"
        },
        {
          title: "Ressurser",
          slug: "/ressurser"
        },
        {
          title: "Om merket",
          slug: "/om"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  width: 100%;
  padding: 2rem;
  line-height: 1.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: block;
  }
}
.logo {
  text-align: left;

  a {
    text-decoration: none;
  }
}
.site-nav {
  text-align: right;

  a {
    display: inline-block;
    text-decoration: none;
    margin: 0 .8rem;
    position: relative;
    font-size: .8rem;
    &:nth-of-type(5) {
      margin-right: 0;
    }
    &.featured {
      background: var(--color-green);
      padding: .2rem .8rem;
      border-radius: 2rem;
      &.kort {
        background: var(--color-pink);
      }
    }
    &.balansekunst-link {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      font-size: .6rem;
      text-decoration: none;
      padding: .2rem .4rem;
      background: #dddddd;
      text-transform: uppercase;
      letter-spacing: .05em;
    }
  }
  .wave {
    position: absolute;
    bottom: -.6rem;
    left: 30%;
  }
}
.menu-toggle {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  
  display: none;
}

@media (max-width: 700px) {
  .site-header {
    display: block;
  }
  .site-nav {
    margin: 1rem auto;
    display: none;

    a {
      font-size: 1.4rem;
      display: block;
      margin: 1rem 0;
      &.featured {
        display: block;
        width: max-content;
        background: var(--color-green);
        padding: .4rem 1.2rem;
        margin: 1rem 0 1rem auto;
        border-radius: 2rem;
      }
      &.balansekunst-link {
        margin: 1rem 0;
        position: static;
        font-size: .8rem;
        display: block;
        text-decoration: none;
        padding: .2rem .4rem;
        background: none;
        text-transform: uppercase;
        letter-spacing: .05em;
      }
    }
    .wave {
      display: none;
    }

    &.open {
      display: block;
    }
  }

  .menu-toggle {
    display: block;
  }
}
</style>

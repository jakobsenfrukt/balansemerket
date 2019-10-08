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
        <a v-for="(page, index) in page" :key="index" :href="`/${page.slug}`">
          {{ page.title }} <Wave />
        </a>
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
          title: "Hjem",
          slug: "#"
        },
        {
          title: "Ressurser",
          slug: "ressurser"
        },
        {
          title: "Om merket",
          slug: "om"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
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
    margin: 0 1rem;
    position: relative;
    font-size: .8rem;
    &:last-of-type {
      margin-right: 0;
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

  /*width: 2rem;
  height: 3px;
  background: $color-black;
  position: relative;
  &:before, &:after {
    content: " ";
    display: block;
    width: 2rem;
    height: 3px;
    background: $color-black;
    position: absolute;
    top: -8px;
  }
  &:after {
    top: auto;
    bottom: -8px;
  }*/
  
  display: none;
}

@media (max-width: $media-s) {
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

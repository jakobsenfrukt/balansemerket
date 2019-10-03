<template>
  <header class="site-header">
    <div class="logo">
      <a href="/"><Logo /></a>
    </div>
    <div class="site-nav">
      <nav>
        <a v-for="(tiltak, index) in tiltak" :key="index" :href="`/tiltak/${tiltak.slug}`">
          {{ tiltak.title }} <Wave />
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
      tiltak: [
        {
          title: "Hjem",
          slug: "hjem"
        },
        {
          title: "Tiltak",
          slug: "tiltak"
        },
        {
          title: "Ressurser",
          slug: "yo"
        },
        {
          title: "Om merket",
          slug: "yo"
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
</style>

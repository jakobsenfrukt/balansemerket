<template>
  <header class="site-header">
    <div class="header-logo">
      <a href="/"><Logo /></a>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/atoms/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.site-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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

@media (max-width: $media-s) {
  .site-header {
    display: block;
    padding: 1rem;
  }
  .header-logo {
    width: 50%;
    a, .logo {
      width: 100%;
      max-width: 10rem;
    }
  }
}
</style>

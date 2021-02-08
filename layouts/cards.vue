<template>
  <div>
    <HeaderMini />
    <nuxt />
    <div v-html="script"></div>
  </div>
</template>

<script>
import HeaderMini from '~/components/HeaderMini.vue'

export default {
  components: {
    HeaderMini
  },
  data: function() {
    return {
      script: `<script type="text/javascript">
        var _paq = window._paq || [];
        _paq.push(['disableCookies']);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//a.444.no/";
          _paq.push(['setTrackerUrl', u+'js/']);
          _paq.push(['setSiteId', '4']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'js/'; s.parentNode.insertBefore(g,s);
        })();
      <\/script>
    `
    }
  }
}
</script>
<template>
  <footer class="site-footer">
    <div class="columns">
      <div class="email">
        <span>E-post</span>
        <span><a href="mailto:hei@balansekunstprosjektet.no" target="_blank">hei@balansekunstprosjektet.no</a></span>
      </div>
      <div class="balansekunst">
        Balansemerket er et initiativ fra Balansekunst.
      </div>
      <div class="members">
        Se liste over kulturinstitusjoner som har gjennomgått kurs med oss.
      </div>
    </div>
    <div class="footnote">
      Balansemerket er utviklet med støtte fra Kulturdepartementet
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.site-footer {
  width: 100%;
  font-size: .8rem;
}
.columns {
  margin: auto;
}
.footnote {
  text-align: center;
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  padding: 4rem 2rem 2rem;
}
</style>

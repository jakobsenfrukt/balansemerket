<template>
  <footer class="site-footer">
    <div class="columns">
      <div>
        <h3>Kontakt oss</h3>
        <p>
          Vi tilbyr workshops som kan bidra til økt bevisstgjøring og en åpen dialog i virksomheten. Les om våre workshoptilbud her.
          <a href="mailto:hei@balansekunstprosjektet.no" target="_blank">hei@balansekunstprosjektet.no</a>
        </p>
      </div>
      <div>
        <h3>Våre medlemmer</h3>
        <p>
          Se liste over kulturinstitusjoner som har gjennomgått kurs med oss.
        </p>
      </div>
      <div>
        <h3>Balansekunst</h3>
        Balansemerket er et initiativ fra Balansekunst. Balansekunst er et samarbeid mellom over 70 norske kunst- og kulturorganisasjoner som jobber for et likestilt og mangfoldig kulturliv.
      </div>
    </div>
    <div class="footnote">
      Balansemerket er utviklet med støtte fra Kulturdepartementet
    </div>
    <a class="to-top" href="#">
      Til toppen
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.site-footer {
  width: 100%;
  font-size: .8rem;
  padding: 2rem;
}
.columns {
  margin: 0 auto 4rem;

  div {
    width: 28%;
    min-width: 280px;
    display: block;
    margin: 2rem auto;

    &:nth-child(1) {
      margin-left: 0;
    }
    &:nth-child(3) {
      margin-right: 0;
    }

    h3, p {
      margin: 0 0 .5rem;
    }

    h3 {
      font-weight: normal;
      font-size: 1em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    a {
      color: inherit;
      text-decoration: none;
      display: inline-block;
      border-bottom: 2px solid $color-text;
      line-height: 1;
      transition: all .2s ease-in-out;
      &:hover {
        color: $color-red;
        border-color: $color-red;
      }
    }
  }
}
.footnote {
  float: left;
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.to-top {
  text-decoration: none;
  display: block;
  float: right;
  line-height: 1;
  border-bottom: 2px solid $color-black;
}
@media (max-width: $width-s) {
  .site-footer {
    padding-bottom: 5rem;
  }
  .columns {
    div {
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        margin-left: 0;
      }
    }
  }
}
</style>

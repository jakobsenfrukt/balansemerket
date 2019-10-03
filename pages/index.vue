<template>
  <main class="site-main">
    <Intro
      :title="hjem.overskrift"
      :lead="hjem.ingress"
    />
    <img class="main-illustration" src="/images/ansvar.jpg" />
    <p>Med utgangspunkt i Likestillings- og diskrimineringsombudets (LDO) anbefalinger, vil vi trekke frem seks tiltak mot seksuell trakassering, tilpasset til kulturlivet.</p>
    <p>Å forebygge seksuell trakassering er ikke gjort en gang for alle, men krever et kontinuerlig arbeid. På denne siden vil vi stadig oppdatere og videreutvikle våre tiltak, ressurser og verktøy mot seksuell trakassering i kulturlivet.</p>
    <p>Disse anbefalingene kan benyttes i midlertidige prosjekter, produksjoner eller i tradisjonelle arbeidsplasser.</p>
    <p>Kulturfeltet er mangfoldig, bestående av både små, store og kjempestore institusjoner og aktører fordelt over eksempelvis scenekunst-, film- og tv-, musikk- og billedkunstfeltet. Ulike aktører kan ha vidt forskjellige utfordringer og behov. Kulturaktører som gjennomgår ordningen vil delta i veiledningsmøter hvor vi forsøker å imøtegå den enkelte virksomhets utfordringer og behov.</p>
    <TiltakArrows />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import Intro from '~/components/Intro.vue'
import TiltakArrows from '~/components/TiltakArrows.vue'

export default {
  components: {
    Intro,
    TiltakArrows
  },
  head () {
    return {
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Tiltak for et trygt kulturliv.' 
        }
      ]
    }
  },
  apollo: {
    hjem: gql`
    query {
      hjem: entry(title: "Hjem") {
        ... on Hjem {
          overskrift
          ingress
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.site-main {
  padding-bottom: 10rem;
}
</style>


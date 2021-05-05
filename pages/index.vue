<template>
  <main class="site-main">
    <h1 class="site-title">{{ hjem.overskrift }}</h1>
    <section class="page index">
      <div class="content">
        <p v-if="hjem.ingress">{{ hjem.ingress }}</p>
        <img v-if="hjem.toppbilde.length" class="main-illustration" :src="hjem.toppbilde[0].fullWidth" :alt="hjem.toppbilde[0].title" />
        <ContentBlocks v-if="hjem.innhold.length" :content="hjem.innhold" />
        <TiltakArrows index />
      </div>
      <div class="navigation">
        <TiltakNav index />
        <RessursNav />
      </div>
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import TiltakArrows from '~/components/TiltakArrows.vue'
import TiltakNav from '~/components/TiltakNav.vue'
import RessursNav from '~/components/RessursNav.vue'
import ContentBlocks from '~/components/atoms/ContentBlocks.vue'

export default {
  components: {
    TiltakArrows,
    TiltakNav,
    RessursNav,
    ContentBlocks
  },
  head () {
    return {
      title: 'Balansemerket',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { 
          hid: 'description', 
          name: 'description', 
          content: this.hjem.ingress
        }
      ]
    }
  },
  apollo: {
    hjem: gql`
    query {
      hjem: entry(title: "Hjem") {
        ... on hjem_hjem_Entry {
          overskrift
          ingress
          toppbilde {
            fullWidth: url(transform: "fullWidth")
            title
          }
          innhold {
            ... on innhold_tekst_BlockType {
              __typename
              overskrift
              tekst
            }
            ... on innhold_bilde_BlockType {
              __typename
              bilde {
                fullWidth: url(transform: "fullWidth")
                title
              }
            }
            ... on innhold_trekkspill_BlockType {
              __typename
              overskrift
              tekst
            }
            ... on innhold_fremhevetTekst_BlockType {
              __typename
              tekst
            }
            ... on innhold_pdf_BlockType {
              __typename
              pdf {
                url
              }
              lenketekst
            }
          }
        }
      }
    }`
  }
}
</script>

<style lang="scss" scoped>
.site-title {
  margin-left: 25%;
}
.page.index {
  display: grid;
  grid-template-columns: 25% 1fr;

  .content {
    order: 2;
  }
  .navigation {
    order: 1;
    z-index: 2;
    position: relative;
  }
}
.main-illustration {
  display: block;
  max-width: 1200px;
  max-height: 700px;
  object-fit: contain;
  margin: 0 -10% 0 -20%;
  width: calc(100% + 25%);
  z-index: 1;
  position: relative;

  @media (max-width: 1200px) {
    margin-left: -4rem;
    width: 100%;
  }

  @media (max-width: 900px) {
    margin-left: -4rem;
    margin-right: -4rem;
    width: calc(100% + 8rem);
  }
}
@media (max-width: 900px) {
  .site-title {
    margin-left: 0;
  }
  .page.index {
    grid-template-columns: 1fr;

    .content {
      order: 1;
    }
    .navigation {
      order: 2;
    }
  }
}
</style>


<template>
  <div class="content-blocks">
    <div v-for="(block, index) in content" :key="index" :class="block.__typename">
      <div v-if="block.__typename === 'innhold_tekst_BlockType'" class="text">
        <h2 v-if="block.overskrift">{{ block.overskrift }}</h2>
        <div v-html="block.tekst"></div>
      </div>
      <div v-if="block.__typename === 'innhold_bilde_BlockType'" class="image">
        <img :src="block.bilde[0].fullWidth" :alt="block.bilde[0].title" />
      </div>
      <div v-if="block.__typename === 'innhold_fremhevetTekst_BlockType'" class="text large">
        <div v-html="block.tekst"></div>
      </div>
      <div v-if="block.__typename === 'innhold_pdf_BlockType'" class="pdf">
        <a :href="block.pdf[0].url" target="_blank">{{ block.lenketekst }}</a>
      </div>
      <Accordion 
        v-if="block.__typename === 'innhold_trekkspill_BlockType'"
        :heading="block.overskrift"
        :content="block.tekst"
        :id="`accordion-${index}`"
      />
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/atoms/Accordion'

export default {
  components: {
    Accordion
  },
  props: {
    content: Array
  }
}
</script>

<style lang="scss" scoped>

</style>


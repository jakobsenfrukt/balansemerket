<template>
  <div class="card" :class="{checked: checked}">
    <div class="content" v-html="card.cardText.content"></div>
    <div class="checkmark"></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    checked: Boolean
  }
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 12px;
  width: 100%;
  min-height: 180px;
  border-radius: 18px;
  padding: 1rem;
  margin-bottom: 2rem;
  line-height: 1.3;
  display: flex;
  align-items: center;
  background: white;
  box-shadow:
    -1px 1px 0 1px rgb(212, 212, 212),
    -.4rem .4rem 0 rgba(0, 0, 0, .2);
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform .2s ease;

  &:hover {
    transform: scale(1.05);
  }
  .content, p {
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
}
.checkmark {
  position: absolute;
  top: -.6rem;
  left: -.8rem;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border: 3px solid black;
  border-radius: 2rem;
}
.checked .checkmark {
  background-color: black;
  background-image: url('/graphics/check.svg');
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

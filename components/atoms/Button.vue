<template>
  <button class="button">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: block;
  width: 80%;
  max-width: 500px;
  background: var(--color-black);
  color: var(--color-white);
  font-family: inherit;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 1.2rem 2rem;
  margin: 1.5rem auto;
  cursor: pointer;
  border: none;
  border-radius: 2rem;
  transition: all .2s ease;
  + .button {
    margin-top: 0;
  }

  &:hover {
    color: var(--color-white);
    transform: scale(1.05);
  }
}
</style>


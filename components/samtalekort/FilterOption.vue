<template>
  <div class="filter-option" @click="checked = !checked" :class="{checked: checked}">
    <input class="checkbox" type="checkbox" :id="option.id" :name="option.id" :aria-label="option.title" checked />
    <div class="checkmark"></div>
    <label :for="option.id">{{ option.title }}</label>
    <span>{{ option.title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    option: Object,
    checked: Boolean
  }
}
</script>

<style lang="scss" scoped>
.filter-option {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform .2s ease;
  margin: .5rem 1rem .5rem 0;
  background: rgba(255, 255, 255, .2);
  padding: .5rem;
  border-radius: 2rem;
  transition: transform .2s ease;

  &:hover {
    transform: scale(1.02);
  }

  label {
    visibility: hidden;
    width: 0px;
    height: 0px;
  }
}
.checkbox {
  visibility: hidden;
  width: 0;
  margin: 0;
}
.checkmark {
  width: 2rem;
  height: 2rem;
  background-color: white;
  border: 3px solid black;
  border-radius: 2rem;
  margin-right: .8rem;
}
.checked .checkmark {
  background-color: black;
  background-image: url('/graphics/check.svg');
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}
@media (max-width: 800px) {
  .filter-option {
    margin: .5rem -.5rem;
  }
}
</style>

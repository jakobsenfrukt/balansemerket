<template>  
  <svg class="wave" viewBox="0 0 24 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-92.000000, -437.000000)" stroke="#000000" stroke-width="2.5">
              <path d="M93.75,440.729153 C95.1620528,439.296208 96.8000764,438.579736 98.6640705,438.579736 C100.109553,438.579736 101.95034,439.241758 103.847418,440.580187 C105.246547,441.567302 107.188588,442.579736 108.906136,442.579736 C111.276723,442.579736 113.058011,441.620083 114.25,439.700776" transform="translate(104.000000, 440.579736) rotate(-4.000000) translate(-104.000000, -440.579736) "></path>
          </g>
      </g>
  </svg>
</template>

<style lang="scss">
.wave {
  width: 24px;
  height: 7px;
  path {
    stroke: var(--color-text);
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
}
a:hover .wave {
  path {
    animation: dash 1s linear forwards;
  }
}
@keyframes dash {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

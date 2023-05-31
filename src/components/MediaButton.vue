<template>
  <a
    class="media-icon"
    :href="mediaLink"
  >
    <font-awesome-icon
      class="media-icon__fa-svg" 
      :icon="['fab', faIco]"
    />
  </a>
</template>

<script lang="ts">
export default {
  props: {
    mediaLink: {
      type: String,
      required: false,
      default: () => '#',
    },
    faIco: {
      type: String,
      required: false,
      default: () => 'square-js'
    }
  },
}
</script>

<style lang="scss">
.media-icon {
  color: $grayish-blue;

  &__fa-svg {
    width: 1.5rem;
    height: 1.5rem;
    
    &:hover {
      color: $soft-red;
    }
  }
}
</style>
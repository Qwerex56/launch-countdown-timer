<template>
  <a
    class="media-icon"
    :href="mediaLink"
  >
    <img
      class="media-icon__media-image" 
      :src="icoImgSrc"
      alt="mIco"
    >
  </a>
</template>

<script lang="ts">
import icoDefault from '@/images/icon-facebook.svg';

export default {
  props: {
    mediaLink: {
      type: String,
      required: false,
      default: () => '#',
    },
    icoImgSrc: {
      type: String,
      default: () => icoDefault,
    }
  },
}
</script>

<style lang="scss">
.media-icon {
  
  &__media-image {

  }
}
</style>
<template>
  <div class="media-bar">
    <MediaButton 
      v-for="mediaButton in mediaButtons"
      :key="mediaButton.id"
      
      :fa-ico="mediaButton.icon"
    />
  </div>
</template>

<script lang="ts">
import MediaButton from '@/components/MediaButton.vue';

export default {
  components: {
    MediaButton,
  },
  data() {
    return {
      mediaButtons: [
        {
          id: 0,
          icon: 'square-facebook'
        },
        {
          id: 1,
          icon: 'instagram'
        },
        {
          id: 2,
          icon: 'pinterest'
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
.media-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
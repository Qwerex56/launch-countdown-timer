<template>
  <div>
    Essasito man!!!
    <MediaButton
      :fa-ico="'instagram'"
    />
    <FlipCard/>
  </div>
</template>

<script lang="ts">
import MediaButton from './components/MediaButton.vue';
import FlipCard from './components/FlipCard.vue';

export default {
  components: {
    MediaButton,
    FlipCard,
},
}
</script>

<style scoped>
div {
  display: flex;

  align-items: center;
}
</style>

<template>
  <div>
    <MediaButton
      :fa-ico="'instagram'"
    />
    <LaunchTimerWidget/>
  </div>
</template>

<script lang="ts">
import MediaButton from './components/MediaButton.vue';
import FlipCard from './components/FlipCard.vue';
import LaunchTimerWidget from './widgets/LaunchTimerWidget.vue';

export default {
  components: {
    MediaButton,
    FlipCard,
    LaunchTimerWidget,
},
}
</script>

<style scoped>
div {

  align-items: center;
}
</style>

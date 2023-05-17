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
import LaunchTimerWidget from './widgets/LaunchTimerWidget.vue';

export default {
  components: {
    MediaButton,
    LaunchTimerWidget,
},
}
</script>

<style scoped>
div {
  margin: 10px;
  align-items: center;
}
</style>

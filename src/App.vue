<template>
  <div class="launch-app">
    <LaunchTimerWidget class="launch-app__timer"> WE'RE LAUNCHING SOON </LaunchTimerWidget>
    <MediaBar class="launch-app__media-bar"/>
  </div>
</template>

<script lang="ts">
import LaunchTimerWidget from './widgets/LaunchTimerWidget.vue';
import MediaBar from './widgets/MediaBar.vue';

import HillPattern from '@/images/pattern-hills.svg';
import BgStars from '@/images/bg-stars.svg';

export default {
  components: {
    LaunchTimerWidget,
    MediaBar,
  },
  data() {
    return {
      hillPattern: HillPattern,
      bgStars: BgStars,
    }
  }
}
</script>

<style scoped lang="scss">
.launch-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: $very-dark-blue;
  background-image: url('@/images/pattern-hills.svg'), url('@/images/bg-stars.svg');
  background-repeat: no-repeat;
  background-position: bottom;

  &__timer {
    margin-top: auto;
    margin-bottom: auto;
    padding: 0 1rem;
  }

  &__media-bar {
    margin-bottom: 3rem;

  }
}

@media screen and (min-width: 768px) {
  .launch-app {
    &__media-bar {
      margin-bottom: 3.75rem;
    }
  }  
}

@media screen and (min-width:1440px) {
  .launch-app {
    background-size: contain;

    &__media-bar {
      margin-bottom: 4.5rem;
    }
  }
}
</style>

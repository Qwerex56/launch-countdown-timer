<template>
  <FlipCard v-for="flipData in flipCardsData" :cycles="flipData.cycles" @timeout="() => {foo()}" @click="flipData.animate = !flipData.animate" :class="{'animate' : flipData.animate}"/>
</template>

<script lang="ts">
import FlipCard from '@/components/FlipCard.vue';

export default {
  components: {
    FlipCard,
  },
  data() {
    return {
      flipCardsData: [
        {
          id: 1,
          cycles: 60,
          loop: true,
          animate: false,
        },
        {
          id: 2,
          cycles: 60,
          loop: true,
          animate: false,
        },
        {
          id: 3,
          cycles: 60,
          loop: true,
          animate: false,
        },
        {
          id: 4,
          cycles: 60,
          loop: true,
          animate: false,
        },
      ]
    }
  },
  methods: {
    foo() {
      console.log("timeout");
    }
  },
}
</script>

<style>

</style>
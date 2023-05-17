<template>
  <div class="flip-card-timer" >
    <h1 class="flip-card-timer__title">
      <slot>

      </slot>
    </h1>

    <div class="flip-card-timer__timer">
      <FlipCard
        v-for="flipCard in flipCards"
        :key="flipCard.id"

        :class="{'animate' : flipCard.animate}"
        
        @cycle-end="() => {
          callNext(flipCard.idNext);
        }"

        @timeout="(data) => {
          flipCard.animate = !flipCard.animate;
          flipCard.cyclesLeft = data.cyclesLeft;
        }"

        :cycles="flipCard.cycles"
        :loop="doLoop(flipCard.id)"
      >
        {{ flipCard.description }}
      </FlipCard>
    </div>
  </div>
</template>

<script lang="ts">
import FlipCard from '@/components/FlipCard.vue';

export default {
  mounted() {
    this.startLaunchTimer();
  },
  components: {
    FlipCard,
  },
  data() {
    return {
      flipCards: [
        {
          id: 0,
          idNext: 1,
          cycles: 5,
          cyclesLeft: 60,
          loop: true,
          animate: false,
          description: 'seconds',
        },
        {
          id: 1,
          idNext: 2,
          cycles: 2,
          cyclesLeft: 60,
          loop: true,
          animate: false,
          description: 'seconds',
        },
        {
          id: 2,
          idNext: 3,
          cycles: 2,
          cyclesLeft: 60,
          loop: true,
          animate: false,
          description: 'seconds',
        },
        {
          id: 3,
          idNext: 4,
          cycles: 1,
          cyclesLeft: 60,
          loop: true,
          animate: false,
          description: 'seconds',
        },
      ],

    }
  },
  methods: {
    //TODO:
    // do wymiany ta nazwa
    callNext(id: number) {
      this.flipCards[id].animate = true;
    },
    // to tez ladnie nazwij
    startLaunchTimer() {
      setInterval(() => {
        this.flipCards[0].animate = !this.flipCards[0].animate;
      }, /* dodaj stałą dla delay*/ 1000)
    },
    doLoop(id: number) {
      const nextCard = this.flipCards[id + 1];
      return nextCard ? (nextCard.cyclesLeft > 0) : false;
    },
  },
}
</script>

<style scoped lang="scss">
</style>
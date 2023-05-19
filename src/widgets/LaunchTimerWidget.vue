<template>
  <div class="flip-card-timer" >
    <h1 class="flip-card-timer__title">
      <slot>

      </slot>
    </h1>

    <div class="flip-card-timer__container">
      <FlipCard
        v-for="flipCard in flipCards"
        :key="flipCard.id"

        @cycle-end="() => {
          callNext(flipCard.idNext);
        }"

        @timeout="(data) => {
          flipCard.cyclesLeft = data.cyclesLeft;
          flipCard.animate = false;
          flipCard.loop = shouldLoop(flipCard.id);
        }"

        :class="{ 'animate': flipCard.animate}"
        :cycles="flipCard.cycles"
        :loop="flipCard.loop"
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
    this.startLaunchTimer;
  },
  components: {
    FlipCard,
  },
  props: {
    inetrvalTime: {
      type: Number,
      required: false,
      default: 1000,
    }
  },
  data() {
    return {
      flipCards: [
        {
          id: 0,
          idNext: 1,
          cycles: 2,
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
  computed: {
    // to tez ladnie nazwij
    startLaunchTimer() {
      setInterval(() => {
        this.flipCards[0].animate = true;
      }, this.inetrvalTime);
    },
  },
  methods: {
    //TODO:
    // do wymiany ta nazwa
    callNext(id: number) {
      if (id >= this.flipCards.length) {
        return;
      }

      const card = this.flipCards[id];
      this.flipCards[id].animate = (card.cyclesLeft > 0);
    },
    shouldLoop(id: number) {
      if (id + 1 >= this.flipCards.length) {
        return false;
      }
      
      const nextCard = this.flipCards[id + 1];
      return nextCard ? (nextCard.cyclesLeft > 0) : false;
    },
  },
}
</script>

<style scoped lang="scss">
.flip-card-timer {
  display: flex;

  &__title {

  }

  &__container {
    display: grid;
    
    grid-template: repeat(1, 1fr [col-start]) / repeat(4, 1fr [row-start]);
  }
}
</style>
<template>
  <div class="flip-card-timer" >
    <h1 class="flip-card-timer__title">
      <slot>Lorem ipsum dolor sit amet.</slot>
    </h1>

    <div class="flip-card-timer__container">
      <FlipCard
        v-for="flipCard in flipCards"
        :key="flipCard.id"

        @cycle-end="() => {
          callNext(flipCard.id);
        }"

        @timeout="(data) => {
          flipCard.cyclesLeft = data.cyclesLeft;
          flipCard.animate = false;
          flipCard.loop = shouldLoop(flipCard.id);
        }"

        :animate="flipCard.animate"
        :cycles="flipCard.cycles"
        :initial-value="flipCard.initialValue"
        :loop="flipCard.loop"
      >{{ flipCard.description }}</FlipCard>
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
          id: 4,
          cycles: 30,
          initialValue: 8,
          cyclesLeft: 8,
          loop: false,
          animate: false,
          description: 'DAYS',
        },
        {
          id: 3,
          cycles: 23,
          initialValue: 21,
          cyclesLeft: 21,
          loop: true,
          animate: false,
          description: 'HOURS',
        },
        {
          id: 2,
          cycles: 59,
          initialValue: 48,
          cyclesLeft: 48,
          loop: true,
          animate: false,
          description: 'MINUTES',
        },
        {
          id: 1,
          cycles: 59,
          initialValue: 23,
          cyclesLeft: 23,
          loop: true,
          animate: true,
          description: 'SECONDS',
        },
      ],
    }
  },
  methods: {
    startLaunchTimer() {
      setInterval(() => {
        var card = this.flipCards[3];
        if (card.cyclesLeft > 0) {
          card.animate = true;
        }
        else {
          card.animate = false;
        }
      }, this.inetrvalTime);
    },
    callNext(id: number) {
      if (id >= this.flipCards.length) {
        return;
      }
      const nextId = this.flipCards.length - 1 - id;
      
      const card = this.flipCards[nextId];
      this.flipCards[nextId].animate = (card.cyclesLeft > 0);
    },
    shouldLoop(id: number) {
      const nextId = this.flipCards.length - 1 - id;
      if (id >= this.flipCards.length) {
        return false;
      }
      
      const nextCard = this.flipCards[nextId];
      return nextCard ? (nextCard.cyclesLeft > 0) : false;
    },
  },
}
</script>

<style scoped lang="scss">
.flip-card-timer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-bottom: 3.75rem;
    padding: 0 2rem;

    color: $white;

    font-family: $red-hat-text;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: .5rem;
  }

  &__container {
    display: grid;
    
    grid-template: repeat(1, 1fr [row-start]) / repeat(4, 4.375rem [col-start]);
    gap: 1rem;
  }
}

@media screen and (min-width: 768px) {
  .flip-card-timer {
    &__container {
      grid-template: repeat(1, 1fr [row-start]) / repeat(4, 6.875rem [col-start]);
      gap: 1.5rem;
    }
  }
}

@media screen and (min-width: 1440px) {
  .flip-card-timer {
    &__container {
      grid-template: repeat(1, 1fr [row-start]) / repeat(4, 9.375rem [col-start]);
      gap: 2rem;
    }
  }
}
</style>
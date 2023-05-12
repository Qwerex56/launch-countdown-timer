<template>
  <div class="flip-card">
    <div class="flip-card__top flip-card--part" @animationend="handleAnimationEnd($event)">
      <p class="flip-card__top__text-top">
        {{ initialValue }}
      </p>
    </div>
    <div class="flip-card__bottom flip-card--part">
      <p class="flip-card__bottom__text-bottom">
        {{ initialValue }}
      </p>
    </div>
    <p class="flip-card__description">
      months
    </p>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['timeout'],
  props: {
    cycles: {
      type: Number,
      required: true,
    },
    initialValue: {
      type: Number,
      required: false,
      default: 60,
    },
    loop: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data() {
    return {
      cyclesLeft: this.cycles,
    }
  },
  computed: {
    resetCycles(cycles: number): number {
      if (cycles <= 0) {
        return this.cycles;
      }
      else {
        return cycles;
      }
    },
  },
  methods: {
    handleAnimationEnd(e: AnimationEvent) {
      this.cyclesLeft -= 1;
      
      return e;
    }
  }
}
</script>

<style scoped lang="scss">
.flip-card {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(1, 1fr);
  align-self: center;

  color: $soft-red;

  font-family: $red-hat-text;
  font-size: 2rem;

  text-align: center;

  perspective: 28.125rem;
  transform-style: preserve-3d;

  &--part {
    padding: 0 .75rem;

    border-radius: .25rem;

    overflow: hidden;
  }

  &__top {
    position: relative;
    transform-origin: bottom;

    background-color: $very-dark-blue2;

    animation: card-flip 3s ease-in infinite;

    &__text-top {
      transform: translateY(50%);
      
      color: darken($soft-red, $amount: 3%);
    }
  }

  &__bottom {
    background-color: $very-dark-blue;

    box-shadow: 0 0.5rem 1rem $very-dark-blue;

    &__text-bottom {
      transform: translateY(-50%);
    }
  }

  &__description {
    color: $grayish-blue;
    
    font-size: .375rem;;
  }
}

@keyframes card-flip {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(-180deg);
  }
}
</style>
<template>
  <div class="card">
    <div class="card__top">
      <div class="card__top__next-card--top card--part">
        <p class="card__text--top">
          {{ timeLeftNext }}
        </p>
      </div>
      <div class="card__top__next-card--bottom card--part">
        <p class="card__text__flip--bottom">
          {{ timeLeftNext }}
        </p>
      </div>
      <div class="card__top__top-card card--part">
        <p class="card__text__flip--top">
          {{ timeLeft }}
        </p>
      </div>
    </div>
    <div class="card__bottom card--part">
      <p class="card__text--bottom">
        {{ timeLeft }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['timeout', 'cycleEnd'],
  props: {
    cycles: {
      type: Number,
      required: true,
    },
    initialValue: {
      type: Number,
      required: false,
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
  mounted() {
    this.cyclesLeft = this.initialValue ? this.initialValue : this.cycles;
  },
  computed: {
    timeLeft() {
      const msgCycles = this.cyclesLeft.toString();
      const msgCyclesLen = this.cyclesLeft.toString().length;

      let msg = msgCycles;
      if (msgCyclesLen <= 1) {
        msg = '0'.concat(msgCycles);
      }

      if (this.cyclesLeft <= 0) {
        msg = '00';
      }

      return msg;
    },
    timeLeftNext() {
      const msgCycles = (this.cyclesLeft - 1).toString();

      let msg = msgCycles;

      if (this.cyclesLeft <= 1) {
        const maxCycles = this.cycles.toString();
        msg = maxCycles;
      }

      if (msg.length <= 1) {
        msg = '0'.concat(msg);
      }

      return msg;
    }
  },
  methods: {
    handleAnimationEnd(e: EventTarget | null) {
      this.cyclesLeft -= 1;

      
      if (this.cyclesLeft <= 0) {
        this.$emit('cycleEnd', this.cyclesLeft);
        this.cyclesLeft = 0;
        
        if (this.loop) {
          this.cyclesLeft = this.cycles;
        }
      }

      this.$emit('timeout', {
        cyclesLeft: this.cyclesLeft,
      });
      
      return e;
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;

  &__top {
    position: relative;

    transform-style: preserve-3d;
    perspective: 350px;

    &__next-card--top {
      background-color: darken($very-dark-blue, $amount: 3%);
      overflow: hidden;
    }

    &__next-card--bottom {
      position: absolute;
      transform-origin: bottom;
      overflow: hidden;
      visibility: hidden;
      top: 0;

      width: 100%;

      background-color: $very-dark-blue;
      animation: flip-back 5s linear infinite;
    }

    &__top-card {
      position: absolute;
      transform-origin: bottom;
      overflow: hidden;
      backface-visibility: hidden;
      top: 0;

      width: 100%;
    
      background-color: darken($very-dark-blue, $amount: 3%);
      animation: flip-front 5s linear infinite;
    }
  }

  &__bottom {
    overflow: hidden;
    background-color: $very-dark-blue;
  }

  &__text {
    &--top {
      transform: translateY(50%);
    }

    &--bottom {
      transform: translateY(-50%);
    }

    &__flip {
      &--top {
        transform: translateY(50%);
      }

      &--bottom {
        transform: rotateX(180deg) translateY(-50%);
      }
    }
  }

  &--part {
    border-radius: .25rem;

    color: $soft-red;

    font-family: $red-hat-text;
    font-size: 2rem;
    font-weight: 700;

    text-align: center;
  }
}

@keyframes flip-front {
  100% {
    transform: rotateX(-180deg);
  }
}

@keyframes flip-back {
  50% {
    visibility: hidden;
  }

  100% {
    visibility: visible;
    transform: rotateX(-180deg);
  }
}

// @media screen and (min-width: 768px) {
//   .flip-card {
//     grid-template: repeat(3, 3.4375rem [row-start]) / repeat(1, 6.875rem [col-start]);

//     font-size: 2.5938rem;

//     &--part {
//       border-radius: .3125rem;
//     }

//     &__description {
//       font-size: .7rem;
//       letter-spacing: .1875rem;
//     }
//   }
// }

// @media  screen and (min-width: 1440px) {
//   .flip-card {
//     grid-template: repeat(3, 4.375rem [row-start]) / repeat(1, 9.375rem [col-start]);

//     font-size: 3.3438rem;

//     &--part {
//       border-radius: .375rem;
//     }

//     &__description {
//       font-size: .8rem;
//       letter-spacing: .25rem;
//     }
//   }
// }
</style>
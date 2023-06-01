<template>
  <div class="card">
    <div class="card__next-card--top card--part">
      <p class="card__text--top">
        {{ timeLeftNext }}
      </p>
    </div>
    <div class="card__next-card--bottom card--part" :class="{ 'animate' : animate }">
      <p class="card__text__flip--bottom">
        {{ timeLeftNext }}
      </p>
    </div>
    <div class="card__top-card card--part" 
      :class="{ 'animate' : animate }" 
      @animationstart="handleAnimationStart($event.target)"
      @animationend="handleAnimationEnd($event.target)" >
      <p class="card__text__flip--top">{{ timeLeft }}</p>
    </div>
    <div class="card__bottom card--part">
      <p class="card__text--bottom">{{ timeLeft }}</p>
    </div>
    <p class="card__description">
        <slot>date</slot>
    </p>
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
    },
    animate: {
      type: Boolean,
      default: false,
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
        if (this.loop) {
          this.cyclesLeft = this.cycles;
        }
      }

      this.$emit('timeout', {
        cyclesLeft: this.cyclesLeft,
      });
      
      return e;
    },
    handleAnimationStart(e: EventTarget | null) {
      if (this.cyclesLeft <= 1) {
        this.$emit('cycleEnd', this.cyclesLeft);
      }

      return e;
    },
  },

}
</script>

<style scoped lang="scss">
$animation-lenght: .7s;

.card {
  display: flex;
  flex-direction: column;

  position: relative;

  transform-style: preserve-3d;
  perspective: 350px;

  &__next-card--top {
    background-color: darken($dark-dasaturated-blue, $amount: 5%);
    color: darken($soft-red, $amount: 3%);
  }

  &__next-card--bottom {
    position: absolute;
    transform-origin: bottom;
    visibility: hidden;
    top: 0;

    width: 100%;

    background-color: darken($dark-dasaturated-blue, $amount: 5%);
    
    &.animate {
      animation: flip-back $animation-lenght linear 1;
    }
  }

  &__top-card {
    position: absolute;
    transform-origin: bottom;
    backface-visibility: hidden;
    top: 0;

    width: 100%;
  
    background-color: darken($dark-dasaturated-blue, $amount: 5%);
    color: darken($soft-red, $amount: 3%);

    &.animate {
      animation: flip-front $animation-lenght linear 1;
    }
  }

  &__bottom {
    background-color: $dark-dasaturated-blue;

    box-shadow: 0rem .625rem 1.25rem $very-dark-blue2;
  }

  &__description {
    margin-top: .875rem;
    color: $grayish-blue;

    font-family: $red-hat-text;
    font-size: .375rem;
    text-transform: capitalize;
    text-align: center;
  }

  &__text {
    &--top {
      transform: translateY(31%);

      color: darken($soft-red, $amount: 3%);

    }

    &--bottom {
      transform: translateY(-50%);
    }

    &__flip {
      &--top {
        transform: translateY(31%);

        color: darken($soft-red, $amount: 3%);
      }

      &--bottom {
        transform: rotateX(180deg) translateY(-31%);
      }
    }
  }

  &--part {
    height: 2.1875rem;

    border-radius: .25rem;

    color: $soft-red;

    overflow: hidden;

    font-family: $red-hat-text;
    font-size: 2rem;
    font-weight: 700;

    text-align: center;
  }
}

@keyframes flip-front {
  50% {
    background-color: darken($dark-dasaturated-blue, $amount: 6%);
    color: darken($soft-red, $amount: 4%);
  }

  100% {
    background-color: darken($dark-dasaturated-blue, $amount: 8%);
    color: darken($soft-red, $amount: 6%);
    
    transform: rotateX(-180deg);
  }
}

@keyframes flip-back {
  50% {
    visibility: hidden;
  }

  100% {
    background-color: $dark-dasaturated-blue;

    visibility: visible;
    transform: rotateX(-180deg);
  }
}

@media screen and (min-width: 768px) {
  .card {
    &--part {
      height: 3.25rem;

      border-radius: .3125rem;

      font-size: 3rem;
    }

    &__description {
      font-size: .5rem;
    }

    &__text {
      &--top {
        transform: translateY(32%);
      }

      &--bottom {
        transform: translateY(-50%);
      }

      &__flip {
        &--top {
          transform: translateY(32%);
        }

        &--bottom {
          transform: rotateX(180deg) translateY(-32%);
        }
      }
    }
  }
}

@media screen and (min-width: 1440px) {
  .card {
    &--part {
      height: 4.375rem;

      border-radius: .375rem;

      font-size: 4rem;
    }

    &__description {
      font-size: .625rem;
    }

    &__text {
      &--top {
        transform: translateY(33%);
      }

      &--bottom {
        transform: translateY(-50%);
      }

      &__flip {
        &--top {
          transform: translateY(33%);
        }

        &--bottom {
          transform: rotateX(180deg) translateY(-33%);
        }
      }
    }
  }
}
</style>
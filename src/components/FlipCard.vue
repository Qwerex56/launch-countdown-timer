<template>
  <div class="flip-card" >
    <div class="flip-card__top">
      <div class="flip-card__top__back flip-card--part">
        <p class="flip-card__text-top">
          {{ timeLeftNext }}
        </p>
      </div>
      <div class="flip-card__top__front flip-card--part"
        @animationend="handleAnimationEnd($event.target)"
      >
        <p class="flip-card__text-top">
          {{ timeLeft }}
        </p>
      </div>
    </div>
    <div class="flip-card__bottom flip-card--part">
      <p class="flip-card__text-bottom">
        {{ timeLeft }}
      </p>
    </div>
    <p class="flip-card__description">
      <slot>

      </slot>
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
.flip-card {
  display: grid;
  grid-template: repeat(3, 2.1875rem [row-start]) / repeat(1, 4.375rem [col-start]);

  color: $soft-red;

  font-family: $red-hat-text;
  font-size: 1.6563rem;

  text-align: center;

  perspective: 15.625rem;
  transform-style: preserve-3d;

  &--part {
    border-radius: .25rem;

    overflow: hidden;
  }

  &__top {
    position: relative;
    transform-origin: bottom;

    width: 100%;
    height: 100%;

    &__front, &__back {
      position: absolute;
      transform-origin: bottom;
      width: 100%;

      background-color: darken($very-dark-blue, $amount: 3%);
    }

  }

  &__bottom {
    background-color: $very-dark-blue;

    box-shadow: 0 0.5rem 1rem $very-dark-blue;
  }

  &__text-top {
    transform: translateY(50%);

    color: darken($soft-red, $amount: 3%);
  }

  &__text-bottom {
    transform: translateY(-50%);

    color: $soft-red;
  }

  &__description {
    align-self: center;
    
    color: $grayish-blue;

    font-size: .5rem;
    letter-spacing: .125rem;
  }

  &.animate &__top__front{
    animation: flip-down .5s ease-in backwards 1;
  }
}

@keyframes flip-down {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(180deg);
    background-color: $very-dark-blue;
  }
}

@media screen and (min-width: 768px) {
  .flip-card {
    grid-template: repeat(3, 3.4375rem [row-start]) / repeat(1, 6.875rem [col-start]);

    font-size: 2.5938rem;

    &--part {
      border-radius: .3125rem;
    }

    &__description {
      font-size: .7rem;
      letter-spacing: .1875rem;
    }
  }
}

@media  screen and (min-width: 1440px) {
  .flip-card {
    grid-template: repeat(3, 4.375rem [row-start]) / repeat(1, 9.375rem [col-start]);

    font-size: 3.3438rem;

    &--part {
      border-radius: .375rem;
    }

    &__description {
      font-size: .8rem;
      letter-spacing: .25rem;
    }
  }
}
</style>
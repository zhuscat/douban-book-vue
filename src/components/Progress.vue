<template>
<div
  :class="isSuccess ? 'progress' : 'progress failed'"
  :style="{
    width: `${percent}%`,
    opacity: show ? 1 : 0,
  }"
>
</div>
</template>

<script>
export default {
  name: 'top-progress',
  data() {
    return {
      percent: 0,
      timer: null,
      show: false,
      duration: 3000,
      isSuccess: true,
    };
  },
  methods: {
    start() {
      this.show = true;
      this.isSuccess = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.percent = 0;
      }
      const increaseStep = Math.floor(10000 / this.duration);
      this.timer = setInterval(() => {
        let nextPercent = this.percent + increaseStep;
        if (nextPercent > 85) {
          nextPercent = 85;
          clearInterval(this.timer);
        }
        this.percent = nextPercent;
      }, 200);
    },
    finish() {
      clearInterval(this.timer);
      this.timer = null;
      this.percent = 100;
      setTimeout(() => {
        this.hide();
      }, 500);
    },
    fail() {
      clearInterval(this.timer);
      this.timer = null;
      this.isSuccess = false;
      this.percent = 100;
      setTimeout(() => {
        this.hide();
      }, 1000);
    },
    hide() {
      this.show = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.percent = 0;
        }, 200);
      });
    },
  },
};
</script>

<style lang="scss">
.progress {
  height: 2px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00b51d;
  transition: width 0.2s, opacity 0.4s;
}

.progress.failed {
  background-color: red;
}
</style>

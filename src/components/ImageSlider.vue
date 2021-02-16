<template>
  <div id="slider-base">
    <div id="image-slider" @click="onclick" ref="imageSliders">
      <template v-if="options">
        <img
          v-for="(src, idx) in images"
          :key="idx"
          :src="src"
          :style="{
            'object-fit': options.imageOptions.objectFit
              ? options.imageOptions.objectFit
              : 'contain',
          }"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { slideFrame } from "../keyframe";
export default {
  id: "image-slider",
  props: ["options", "srcArr", "rotationEnd", "animationEnd"],
  data() {
    return {
      images: [],
      srcIdx: 0,
      imgIdx: 0,
      myTimer: null,
      defaultMs: 5000,
      isStable: false,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      if (this.srcArr && this.srcArr.length > 1) {
        let currentImage = this.srcArr[this.srcIdx];
        this.images.push(currentImage);
        this.srcIdx++;
        this.checkAnimationType();
      } else if (this.srcArr && this.srcArr.length == 1) {
        this.isStable = true;
      }
    },
    checkAnimationType() {
      this.$nextTick(() => {
        let keyFrame;
        switch (this.options.type) {
          case "fade":
            break;

          default:
            keyFrame = slideFrame();
        }
        this.startAnimation(keyFrame);
      });
    },

    startAnimation(keyframe) {
      let sliders = this.$refs.imageSliders;
      let lastAnimation;

      if (sliders.childElementCount == 1) {
        lastAnimation = sliders.firstElementChild.animate(
          keyframe.last,
          this.options.animationOptions
        );
      } else {
        lastAnimation = sliders.firstElementChild.animate(
          keyframe.first,
          this.options.animationOptions
        );
        sliders.lastElementChild.animate(
          keyframe.last,
          this.options.animationOptions
        );
      }

      lastAnimation.onfinish = () => {
        if (this.images.length > 1) {
          lastAnimation.cancel();
          this.images.shift();
        }
        if (this.animationEnd) {
          this.animationEnd();
        }
        this.setTimer();
      };
    },

    startNextAnimation() {
      if (this.srcArr[this.srcIdx] == undefined && !this.options.loop) {
        if (this.rotationEnd) {
          this.rotationEnd();
        }
        return;
      }
      let src;

      if (this.options.loop && this.srcArr[this.srcIdx] == undefined) {
        this.srcIdx = 0;
      }
      src = this.srcArr[this.srcIdx];
      this.images.push(src);
      this.srcIdx++;
      this.checkAnimationType();
    },

    setTimer() {
      if (this.options.ms) {
        this.myTimer = setTimeout(() => {
          this.startNextAnimation();
        }, this.options.ms);
      } else {
        this.myTimer = this.setTimer(() => {
          this.startNextAnimation();
        }, this.defaultMs);
      }
    },

    onclick() {
      console.log("clicked");
    },
  },
  beforeDestroy() {},
};
</script>
<style scoped>
@import "../assets/base.css";
</style>

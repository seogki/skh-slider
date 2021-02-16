<template>
  <div id="slider-base" v-if="options">
    <div id="image-slider" @click="onclick" ref="imageSliders">
      <img
        v-for="(src, idx) in images"
        :key="idx"
        :src="src"
        @load="onload"
        :style="{
          'object-fit': options.imageOptions.objectFit
            ? options.imageOptions.objectFit
            : 'contain',
        }"
      />
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
    onload() {
      // this.setTimer();
      // console.log("onload called");
    },
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
          this.images.shift();
        }
        this.setTimer();
        if (this.animationEnd) {
          this.animationEnd();
        }
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
#slider-base {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#slider-base #image-slider {
  position: relative;
  width: 100%;
  height: 100%;
}

#image-slider img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

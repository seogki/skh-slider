<template>
  <div id="slider-base" v-if="myOptions">
    <div id="image-slider" ref="imageSliders">
      <img
        v-for="(src, idx) in images"
        :key="idx"
        :src="src"
        :style="{
          'object-fit': myOptions.imageOptions.objectFit,
        }"
      />
    </div>
  </div>
</template>

<script>
import { fadeFrame, slideFrame } from "../keyframe";
export default {
  id: "image-slider",
  props: {
    options: {
      type: Object,
      required: false,
    },
    srcArr: {
      type: Array,
      required: true,
    },
    rotationEnd: {
      type: Function,
      required: false,
    },
    animationEnd: {
      type: Function,
      required: false,
    },
    click: {
      type: Function,
      required: false,
    },
  },

  computed: {},

  data() {
    return {
      myOptions: {},
      defaultOptions: {
        ms: 5000,
        type: "slide",
        loop: true,
        appear: true,
        animationOptions: {
          duration: 1500,
          fill: "none",
          easing: "ease",
        },
        imageOptions: {
          objectFit: "contain",
        },
      },
      images: [],
      srcIdx: 0,
      imgIdx: 0,
      myTimer: null,
      lastAnimation: null,
      isStable: false,
    };
  },
  watch: {
    // To redraw page
    options: {
      handler(newObj, oldObj) {
        clearTimeout(this.myTimer);
        this.myTimer = null;
        this.lastAnimation?.cancel();
        this.lastAnimation = null;
        this.images = [];
        this.srcIdx = 0;
        setTimeout(() => {
          Object.assign(this.myOptions, newObj, oldObj);
          this.init();
        }, 2000);
      },
      deep: true,
    },
  },
  created() {
    Object.assign(this.myOptions, this.defaultOptions, this.options);
  },
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
        this.checkAnimationType(this.myOptions.appear);
      } else if (this.srcArr && this.srcArr.length == 1) {
        this.isStable = true;
      }
    },
    checkAnimationType(appear) {
      this.$nextTick(() => {
        let keyFrame;
        if (appear) {
          switch (this.myOptions.type) {
            case "slide": {
              keyFrame = slideFrame();
              break;
            }
            case "fade": {
              keyFrame = fadeFrame();
              break;
            }
          }

          this.startAnimation(keyFrame);
        } else {
          this.setTimer();
        }
      });
    },

    startAnimation(keyframe) {
      let sliders = this.$refs.imageSliders;
      if (!sliders || sliders.childElementCount < 1) {
        return;
      }

      if (sliders.childElementCount == 1) {
        this.lastAnimation = sliders.firstElementChild.animate(
          keyframe.last,
          this.myOptions.animationOptions
        );
      } else {
        this.lastAnimation = sliders.firstElementChild.animate(
          keyframe.first,
          this.myOptions.animationOptions
        );
        sliders.lastElementChild.animate(
          keyframe.last,
          this.myOptions.animationOptions
        );
      }

      this.lastAnimation.onfinish = () => {
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
      if (this.srcArr[this.srcIdx] == undefined && !this.myOptions.loop) {
        if (this.rotationEnd) {
          this.rotationEnd();
        }
        return;
      }
      let src;

      if (this.myOptions.loop && this.srcArr[this.srcIdx] == undefined) {
        this.srcIdx = 0;
      }
      src = this.srcArr[this.srcIdx];
      this.images.push(src);
      this.srcIdx++;
      this.checkAnimationType(true);
    },

    setTimer() {
      this.$nextTick(() => {
        this.myTimer = setTimeout(() => {
          this.startNextAnimation();
        }, this.myOptions.ms);
      });
    },

    onclick() {
      if (this.click) {
        this.click();
      }
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

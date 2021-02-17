<template>
  <div id="slider-base" v-if="myOptions">
    <div id="image-slider" @click="onclick" ref="imageSliders">
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
import { slideFrame } from "../keyframe";
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
        type: "default",
        loop: true,
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
      isStable: false,
    };
  },
  created() {
    Object.assign(this.myOptions, this.defaultOptions, this.myOptions);
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
        this.checkAnimationType();
      } else if (this.srcArr && this.srcArr.length == 1) {
        this.isStable = true;
      }
    },
    checkAnimationType() {
      this.$nextTick(() => {
        let keyFrame = slideFrame();
        this.startAnimation(keyFrame);
      });
    },

    startAnimation(keyframe) {
      let sliders = this.$refs.imageSliders;
      let lastAnimation;

      if (sliders.childElementCount == 1) {
        lastAnimation = sliders.firstElementChild.animate(
          keyframe.last,
          this.myOptions.animationOptions
        );
      } else {
        lastAnimation = sliders.firstElementChild.animate(
          keyframe.first,
          this.myOptions.animationOptions
        );
        sliders.lastElementChild.animate(
          keyframe.last,
          this.myOptions.animationOptions
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
      this.checkAnimationType();
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

<template>
  <div class="full-size" style="background-color: white; overflow : hidden;">
    <div class="flex-center full-size">
      <imageSlider
        :options="options"
        :srcArr="srcArr"
        :rotationEnd="rotationEnd"
        :animationEnd="animationEnd"
        style="width: 50%; height: 50%;"
      ></imageSlider>
    </div>
  </div>
</template>

<script>
import imageSlider from "./components/ImageSlider";
export default {
  components: {
    imageSlider,
  },
  data() {
    return {
      options: {
        ms: 3000,
        type: "default",
        loop: true,
        animationOptions: {
          duration: 1500,
          fill: "both",
          easing: "ease",
        },
        imageOptions: {
          objectFit: "contain",
        },
      },
      srcArr: [
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    rotationEnd() {
      console.log("rotationEnd");
    },
    animationEnd() {
      console.log("animationEnd");
    },
  },
};
</script>

<style>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.full-size {
  height: 100%;
  width: 100%;
}
</style>

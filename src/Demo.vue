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
      },
      srcArr: [
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
        "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
      ],
    };
  },
  created() {},
  mounted() {
    console.log(imageSlider);
  },
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
html,
body {
  margin: 0;
  height: 100%;
}
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

<template>
  <div class="full-size" style="background-color: white; overflow : hidden;">
    <div class="flex-horizontal full-size">
      <div id="option_wrapper">
        <div id="option_tag">
          Base Options
          <div class="flex-top-left" id="options_wrapper">
            <div>
              <div>
                ms
              </div>
              <input
                type="number"
                name="ms"
                :value="options.ms"
                @change="updateMs($event)"
                style="margin-bottom: 16px;"
              />
            </div>
            <div>
              <div>
                type
              </div>
              <input
                type="text"
                name="type"
                :value="options.type"
                @change="updateType($event)"
                style="margin-bottom: 16px;"
              />
            </div>
            <div>
              <div>
                appear
              </div>
              <input
                type="text"
                name="appear"
                :value="options.appear"
                @change="updateAppear($event)"
              />
            </div>
          </div>
        </div>
        <div id="option_tag">
          Animation Options
          <div class="flex-top-left" id="options_wrapper">
            <div>
              <div>
                duration
              </div>
              <input
                type="number"
                name="duration"
                :value="options.animationOptions.duration"
                @change="updateDuration($event)"
                style="margin-bottom: 16px;"
              />
            </div>
            <div>
              <div>
                easing
              </div>
              <input
                type="text"
                name="ease"
                :value="options.animationOptions.easing"
                @change="updateEasing($event)"
              />
            </div>
          </div>
        </div>
        <div id="option_tag">
          Image Options
          <div class="flex-top-left" id="options_wrapper">
            <div>
              <div>
                object-fit
              </div>
              <input
                type="text"
                name="objectFit"
                :value="options.imageOptions.objectFit"
                @change="updateObjectFit($event)"
              />
            </div>
          </div>
        </div>
        <div id="description_wrapper">
          <div id="option_tag">Description</div>
          <div>
            <div class="header">MS</div>
            <br />setTimeout
          </div>
          <div>
            <div class="header">Type</div>
            <br />slide, fade
          </div>
          <div>
            <div class="header">Appear</div>
            <br />start animation from beginning
          </div>
          <div>
            <div class="header">Duration</div>
            <br />Duration of Animation between when transition occurs
          </div>
          <div>
            <div class="header">Easing</div>
            <br />Flow of Animation<br />linear | ease-in | ease-out |
            ease-in-out
          </div>
          <div>
            <div class="header">Object-Fit</div>
            <br />different display options of image<br />fill | contain | cover
            | none | scale-down
          </div>
        </div>
      </div>
      <div id="img_wrapper" class="flex-center">
        <imageSlider
          :options="options"
          :srcArr="srcArr"
          :rotationEnd="rotationEnd"
          :animationEnd="animationEnd"
          style="width: 50%; height: 50%;"
        ></imageSlider>
      </div>
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
        ms: 5000,
        type: "slide",
        loop: true,
        appear: false,
        animationOptions: {
          duration: 1500,
          fill: "none",
          easing: "ease",
        },
        imageOptions: {
          objectFit: "contain",
        },
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
  mounted() {},
  methods: {
    rotationEnd() {
      console.log("rotationEnd");
    },
    animationEnd() {
      console.log("animationEnd");
    },
    updateMs(e) {
      this.options.ms = Number(e.target.value);
    },
    updateType(e) {
      this.options.type = e.target.value;
    },
    updateAppear(e) {
      this.options.appear = e.target.value;
    },
    updateDuration(e) {
      this.options.animationOptions.duration = Number(e.target.value);
    },
    updateEasing(e) {
      this.options.animationOptions.easing = e.target.value;
    },
    updateObjectFit(e) {
      this.options.imageOptions.objectFit = e.target.value;
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
.flex-horizontal {
  display: flex;
}
.full-size {
  height: 100%;
  width: 100%;
}
.flex-top-left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex-top-right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
.flex-top-center {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
#option_tag {
  font-weight: bold;
  margin-left: 12px;
}
#options_wrapper div > div {
  width: 20%;
  display: inline-block;
}
#options_wrapper div > input {
  width: 70%;
}
#options_wrapper > div {
  width: 100%;
}
#options_wrapper {
  border: 1px solid black;
  background-color: #cdcdcd;
  margin: 24px;
  flex-wrap: wrap;
  padding: 16px;
}
#option_wrapper {
  width: 40%;
  overflow: auto;
  padding-bottom: 2%;
  padding-top: 2%;
}
#img_wrapper {
  border-left: 2px solid grey;
  width: 60%;
  height: 100%;
}
#description_wrapper {
  width: 100%;
}

#description_wrapper > div {
  margin: 12px 24px 12px 24px;
}

#description_wrapper > div:first-of-type {
  margin: 12px;
}
.header {
  font-weight: bold;
}
</style>

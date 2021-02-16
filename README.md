# skh-slider

Vue Slider Made of Web Animation API

# Path

npm : https://www.npmjs.com/package/skh-slider\
github : https://github.com/seogki/skh-slider\

# Install

```js
npm i skh-slider
```

# How to Use

```js

<imageSlider
        :options="options"
        :srcArr="srcArr"
        :rotationEnd="rotationEnd"
        :animationEnd="animationEnd"
        style="width: 100%; height: 100%;"
      ></imageSlider>

import { imageSlider } from "skh-slider";
export default {
  components: {
    imageSlider
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
          easing: "ease"
        },
        imageOptions: {
          objectFit: "contain"
        }
      },
      srcArr: [
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
        "https://homepages.cae.wisc.edu/~ece533/images/mountain.png",
        "https://homepages.cae.wisc.edu/~ece533/images/boat.png"
      ]
    };
  },
}
```

# Options

options : determine base options

ms : setTimout Milliseconds\
type : "default" (current only available default)\
loop : repeat Animation endless (animationEnd callback not fire)\

animationOptions : determine Animation Options in web animation api\
duration : slide duration between two element\

imageOptions : determine Image options (currently support objectFit)\

objectFit : contain | fill | cover | none | scale-down\

# License

MIT

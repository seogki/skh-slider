# skh-slider

Vue Slider Made of Web Animation API

# DEMO PAGE

[Image Slider](https://seogki.github.io/skh-slider/)

# Path

[NPM](https://www.npmjs.com/package/skh-slider) <br />
[Github](https://github.com/seogki/skh-slider)<br />

# Install

```console
$ npm i skh-slider
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
          fill: "none",
          easing: "ease"
        },
        imageOptions: {
          objectFit: "contain"
        }
      },
      srcArr: [
        "https://your_source_url1.png",
        "https://your_source_url2.png",
        "https://your_source_url3.png",
        "https://your_source_url4.png"
      ]
    };
  },
}
```

# Options

options : determine base options

ms : setTimout Milliseconds<br />
type : "default" (current support default)<br />
loop : repeat Animation endless (animationEnd callback not fire)<br />

animationOptions : determine Animation Options in web animation api<br />
duration : slide duration between two element<br />

imageOptions : determine Image options (currently support objectFit)<br />

objectFit : contain | fill | cover | none | scale-down<br />

# Warning

Make Sure to Enable Cache in Browser!

# License

MIT

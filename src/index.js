import imageSlider from "./components/ImageSlider";

const components = [imageSlider];

export { imageSlider };

export const Plugin = {
  install: function(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};

export default {
  Plugin,
  imageSlider,
};

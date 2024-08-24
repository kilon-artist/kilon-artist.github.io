import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';
import PhotoSwipeDynamicCaption from './photoswipe-dynamic-caption-plugin.esm.js';
import PhotoSwipe from './photoswipe.esm.js';
import PhotoSwipeDeepZoom from './photoswipe-deep-zoom-plugin.esm.js';

const smallScreenPadding = {
  top: 0, bottom: 0, left: 0, right: 0
};
const largeScreenPadding = {
  top: 30, bottom: 30, left: 0, right: 0
};
const lightbox = new PhotoSwipeLightbox({
  gallerySelector: '#gallery',
  childSelector: '.pswp-gallery__item',
  pswpModule: PhotoSwipe,
  
  // optionaly adjust viewport  
  paddingFn: (viewportSize) => {
    return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
  },

  // Recommended PhotoSwipe options for this plugin
  allowPanToNext: false, // prevent swiping to the next slide when image is zoomed
  allowMouseDrag: true, // display dragging cursor at max zoom level
  wheelToZoom: true, // enable wheel-based zoom
  zoom: false // disable default zoom button
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  mobileLayoutBreakpoint: 700,
  type: 'auto',
  mobileCaptionOverlapRatio: 1
});

const deepZoomPlugin = new PhotoSwipeDeepZoom(lightbox, {
  // deep zoom plugin options, for example:
  tileSize: 256
});

lightbox.init();
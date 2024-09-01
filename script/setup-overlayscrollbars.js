// Create a <script> tag
var script = document.createElement('script');

// Set the src attribute to the CDN URL for the library
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/overlayscrollbars/2.10.0/browser/overlayscrollbars.browser.es6.min.js';

// Optionally set async loading
script.async = true;

// Define what to do after the script has loaded
script.onload = function() {
  const { OverlayScrollbars, ClickScrollPlugin } = OverlayScrollbarsGlobal;

  // Enable the ClickScrollPlugin to make "scrollbars.clickScroll: true" available
  OverlayScrollbars.plugin(ClickScrollPlugin);

  // Apply OverlayScrollbars to the entire page
  OverlayScrollbars(document.body, {
    className: "os-theme-light", // Change theme class if using a theme
    sizeAutoCapable: true,
    scrollbars: {
      autoHide: "scroll",
      autoHideDelay: 1000,
      theme: 'os-theme-light'
    }
  });
  

  // Apply OverlayScrollbars to a specific element
  OverlayScrollbars(document.getElementById('target'), {});
};

// Add the <script> tag to the document's <head> to start loading the script
document.head.appendChild(script);

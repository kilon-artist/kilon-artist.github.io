if ('loading' in HTMLImageElement.prototype) {
    //Native Lazy Loading Supported!

    console.log('yay!')

    const images = document.querySelectorAll('img[loading="lazy"]')
    images.forEach(img => {
        img.src = img.dataset.src;
    })
}

else {
  // Not Supported!

  console.log('boo!')

  const script = document.createElement('script')
  script.src = 'script/lazysizes.min.js'
  document.body.appendChild(script);
}
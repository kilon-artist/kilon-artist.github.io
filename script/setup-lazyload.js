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

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.pswp-gallery__item');

  items.forEach(item => {
      const img = item.querySelector('.thumbnail');
      const overlay = item.querySelector('.loading-overlay');

      if (img.complete) {
          // 图片已经加载完成
          overlay.style.display = 'none';
          img.classList.add('loaded');
      } else {
          // 图片正在加载中
          img.addEventListener('load', () => {
              overlay.style.display = 'none';
              img.classList.add('loaded');
          });

          img.addEventListener('error', () => {
              // 图片加载出错的处理
              overlay.textContent = 'Failed'; // 或者其他提示
          });
      }
  });
});
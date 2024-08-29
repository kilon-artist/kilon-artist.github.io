//#region filter
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-group .button');
    const items = document.querySelectorAll('.pswp-gallery__item');

    // 初始隐藏所有图片
    items.forEach(item => {
      item.style.opacity = '0';
    });

    // 处理按钮点击事件
    const filterItems = (filterValue) => {
      buttons.forEach(button => {
        button.classList.remove('is-checked');
      });

      items.forEach(item => {
        if (item.matches(filterValue)) {
          item.classList.add('zoom-in');
          item.style.display = ''; // 显示匹配的项
          item.style.opacity = '1'; // 逐渐显示匹配的项
        } else {
          item.classList.remove('zoom-in');
          item.style.display = 'none'; // 隐藏不匹配的项
        }
      });

      // 选中对应的按钮
      const activeButton = document.querySelector(`.button-group .button[data-filter='${filterValue}']`);
      if (activeButton) {
        activeButton.classList.add('is-checked');
      }
    };

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        filterItems(filterValue);
      });
    });



    buttons.forEach(button => {
      button.addEventListener('click', function() {
          // 移除所有按钮的 active 类
          document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));

          // 为当前点击的按钮添加 active 类
          this.classList.add('active');
      });
    });

    // 自动触发 KWCo 按钮的点击事件
    const defaultButton = document.querySelector(".button-group .button[data-filter=\"[data-category='KWCo']\"]");
    if (defaultButton) {
        defaultButton.click();
    }
  });

  // Attach event listeners to buttons
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async () => {
      // Perform filtering and wait for it to complete
      await performFiltering();

      // Recalculate line heights after filtering
      await recalculateLineHeights();
    });
  });

  // Recalculate on page load
  window.addEventListener('load', recalculateLineHeights);
//#endregion

//#region Function to recalculate and set height
  function recalculateLineHeights() {
    // Create a promise to handle image load completion
    const promises = [];

    document.querySelectorAll('.pswp-gallery__item').forEach(item => {
      const thumbnail = item.querySelector('.thumbnail');
      const lineLeft = item.querySelector('.line.left');
      const lineRight = item.querySelector('.line.right');

      if (thumbnail && lineLeft && lineRight) {
        // Create a promise for each image to ensure it's loaded
        const imageLoadPromise = new Promise((resolve) => {
          if (thumbnail.complete) {
            // Image already loaded
            resolve();
          } else {
            // Wait for image to load
            thumbnail.addEventListener('load', resolve);
            thumbnail.addEventListener('error', resolve); // Handle image load errors
          }
        });

        promises.push(imageLoadPromise);

        // Once the image is loaded, calculate the height
        imageLoadPromise.then(() => {
          const itemTop = item.getBoundingClientRect().top;
          const thumbnailTop = thumbnail.getBoundingClientRect().top;
          const newHeight = thumbnailTop - itemTop - 5;

          lineLeft.style.height = `${newHeight}px`;
          lineRight.style.height = `${newHeight}px`;
        });
      }
    });

    // Wait for all image load promises to complete
    return Promise.all(promises);
  }

  // Simulate Isotope filtering
  function performFiltering() {
    return new Promise(resolve => {
      // Simulate filtering delay
      setTimeout(() => {
        // Your Isotope filtering code here
        resolve();
      }, 500); // Adjust delay as needed
    });
  }
//#endregion Function to recalculate and set height



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
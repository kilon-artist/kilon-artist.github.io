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
        if (filterValue === '*' || item.matches(filterValue)) {
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
  
    // 默认选择 KWCo 分组
    filterItems("[data-category='KWCo']");
  });

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        // 移除所有按钮的 active 类
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
        
        // 为当前点击的按钮添加 active 类
        this.classList.add('active');
    });
});
  
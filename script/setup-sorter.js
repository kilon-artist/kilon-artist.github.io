document.addEventListener('DOMContentLoaded', () => {
const sorterButton = document.querySelector('.button.sorter');
const galleryItems = Array.from(document.querySelectorAll('.pswp-gallery__item'));

let isAscending = true;

function sortItems(ascending) {
    const sortedItems = galleryItems.sort((a, b) => {
    const orderA = parseInt(a.getAttribute('data-order'), 10);
    const orderB = parseInt(b.getAttribute('data-order'), 10);
    return ascending ? orderA - orderB : orderB - orderA;
    });

    const gallery = document.querySelector('.pswp-gallery');
    sortedItems.forEach(item => gallery.appendChild(item));
}

sorterButton.addEventListener('click', () => {
    isAscending = !isAscending;
    sortItems(isAscending);
});
});

document.querySelector('.button.sorter').addEventListener('click', function() {
    this.classList.toggle('active');
    // Add your sorting logic here and switch icons accordingly
  });
  
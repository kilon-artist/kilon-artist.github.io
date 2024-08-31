//#region Filter function
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".button.filter");
  const sortButton = document.querySelector(".button.sorter");
  const galleryItems = document.querySelectorAll(".pswp-gallery__item");

  // Track the current sort direction
  let isAscending = true;

  // Function to filter images
  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach(item => {
        const matchesFilter = item.matches(filterValue);
        item.style.display = matchesFilter ? "grid" : "none";
        if (matchesFilter) {
          item.classList.add("zoom-in"); // Add zoom animation when filtering
        }
      });

        // Handle active state of buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Automatically trigger KWCo button's click event
    const defaultButton = document.querySelector(".button-group .button[data-filter=\"[data-category='KWCo']\"]");
    if (defaultButton) {
      defaultButton.click();
    }
});
//#endregion Filter Function

//#region Function to recalculate and set height
function recalculateLineHeights() {
  const promises = [];

  document.querySelectorAll('.pswp-gallery__item').forEach(item => {
    const thumbnail = item.querySelector('.thumbnail');
    const lineLeft = item.querySelector('.line.left');
    const lineRight = item.querySelector('.line.right');

    if (thumbnail && lineLeft && lineRight) {
      const imageLoadPromise = new Promise((resolve) => {
        if (thumbnail.complete) {
          resolve();
        } else {
          thumbnail.addEventListener('load', resolve);
          thumbnail.addEventListener('error', resolve);
        }
      });

      promises.push(imageLoadPromise);

      imageLoadPromise.then(() => {
        const itemTop = item.getBoundingClientRect().top;
        const thumbnailTop = thumbnail.getBoundingClientRect().top;
        const newHeight = thumbnailTop - itemTop - 5;

        lineLeft.style.height = `${newHeight}px`;
        lineRight.style.height = `${newHeight}px`;
      });
    }
  });

  return Promise.all(promises);
}

// Simulate Isotope filtering
function performFiltering() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

// Attach event listeners to buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', async () => {
    await performFiltering();
    await recalculateLineHeights();
  });
});

// Recalculate on page load
window.addEventListener('load', recalculateLineHeights);
//#endregion Function to recalculate and set height
document.addEventListener('DOMContentLoaded', function() {
    const scrollingBar = document.querySelector('.scrolling-bar');
    let scrollPosition = 0;
    
    function scrollBar() {
        scrollPosition += 1;
        if (scrollPosition >= scrollingBar.scrollWidth) {
            scrollPosition = 0;
        }
        scrollingBar.scrollLeft = scrollPosition;
        requestAnimationFrame(scrollBar);
    }
    
    scrollBar();
});

document.addEventListener('DOMContentLoaded', function() {
    OpenSeadragon({
        id: "openseadragon1",
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        tileSources: "https://ia800400.us.archive.org/12/items/kwc_kilon_works_catalog/KWC%20%28Kilon%20Works%20Catalogue%29/KWCo/KWCo1.jpg"
    });
});
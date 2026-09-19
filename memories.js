/* =========================================
   MEMORY GALLERY
========================================= */

const memoryItems = [...document.querySelectorAll(".memory-item")];
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCount = document.getElementById("photoCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDate = document.getElementById("lightboxDate");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;

/* =========================================
   COUNTER
========================================= */

function updateCounter() {
    const count = memoryItems.length;
    photoCount.textContent = count < 10 ? `0${count}` : count;
}

/* =========================================
   FILTER
========================================= */

function getVisibleItems() {
    // Navigation should only ever move through items currently shown by the filter
    return memoryItems.filter(item => !item.classList.contains("hidden"));
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        memoryItems.forEach(item => {
            const category = item.dataset.category;
            const matches = filter === "all" || category === filter;
            item.classList.toggle("hidden", !matches);
        });
    });
});

/* =========================================
   LIGHTBOX
========================================= */

function openLightbox(index) {
    const visibleItems = getVisibleItems();
    const item = visibleItems[index];

    if (!item) return;

    currentIndex = index;

    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.title;
    lightboxTitle.textContent = item.dataset.title;
    lightboxDate.textContent = item.dataset.date;
    lightboxCategory.textContent = item.dataset.category.toUpperCase();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextMemory() {
    const visibleItems = getVisibleItems();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
}

function previousMemory() {
    const visibleItems = getVisibleItems();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
}

/* =========================================
   EVENT BINDINGS
========================================= */

memoryItems.forEach(item => {
    item.addEventListener("click", () => {
        // Index must be recalculated against currently visible items,
        // not the original full-array index
        const visibleItems = getVisibleItems();
        const index = visibleItems.indexOf(item);
        openLightbox(index);
    });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextMemory);
lightboxPrev.addEventListener("click", previousMemory);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextMemory();
    if (event.key === "ArrowLeft") previousMemory();
});

/* =========================================
   INIT
========================================= */

updateCounter();
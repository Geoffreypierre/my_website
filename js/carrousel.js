let currentRotation = 0;
let isRotating = false;
let startX = 0;
let currentX = 0;
let isDragging = false;

const carousel = document.getElementById('carousel3d');
const items = carousel.querySelectorAll('.carousel-item');
const totalItems = items.length;
const angleStep = 360 / totalItems;

function initCarousel() {
    items.forEach((item, index) => {
        const rotateY = index * angleStep;
        const translateZ = 500;
        item.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    });
}

function rotateCarousel(direction) {
    if (isRotating) return;

    isRotating = true;
    currentRotation += direction * angleStep;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;

    setTimeout(() => {
        isRotating = false;
    }, 800);
}

carousel.addEventListener('mousedown', (e) => {
    if (isRotating) return;
    isDragging = true;
    startX = e.clientX;
    carousel.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || isRotating) return;

    currentX = e.clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? -1 : 1;
        rotateCarousel(direction);
        isDragging = false;
        carousel.style.cursor = 'grab';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('touchstart', (e) => {
    if (isRotating) return;
    isDragging = true;
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging || isRotating) return;

    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? -1 : 1;
        rotateCarousel(direction);
        isDragging = false;
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});

initCarousel();

setInterval(() => {
    if (!isDragging && !isRotating) {
        rotateCarousel(1);
    }
}, 4000);
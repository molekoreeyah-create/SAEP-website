const lightbox = document.getElementById('lightbox');
const bigImage = lightbox.querySelector('img');
let lastButton = null;

document.getElementById('gallery-grid').addEventListener('click', function (event){
    const item = event.target.closest('.gallery-item');
    if (!item) return;
    lastButton = item;
    bigImage.src = item.getAttribute('data-full');
    bigImage.alt = item.querySelector('img').alt;
    lightbox.classList.add('is-open');
    lightbox.querySelector('.lightbox-close').focus();
});

function closeLightbox() {
    if (lastButton) lastButton.focus();
}

lightbox.addEventListener('click', function (event){
    if (event.target === lightbox || event.target.closest('lightbox-close')) closeLightbox();
});

document.addEventListener('keydown', function (event) {
    if(event.key === 'Escape'&& lightbox.classList.contains('is-open')) closeLightbox();
});
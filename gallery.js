const links = Array.from(document.querySelectorAll('.gallery a'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let current = 0;

function show(index) {
    current = (index + links.length) % links.length; // Wraps around at both ends
    const link = links[current];
    lbImg.src = link.href;
    lbImg.alt = link.querySelector('img').alt;
    const caption = link.closest('figure').querySelector('figcaption');
    lbCaption.textContent = caption ? caption.textContent : '';
}

links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        show(i);
        lightbox.showModal()
    });
});

lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => show(current + 1));

// Click on the dark area to close (not photo or buttons)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
});

// Arrow keys (Esc is handled by <dialog>)
document.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
});

// Hide prev/next if there is only one photo
if (links.length < 2) {
    lightbox.querySelectorAll('.lb-prev, .lb-next').forEach((b) => (b.hidden = true));
}
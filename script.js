const photoGrid = document.getElementById('photo-grid');
const curtain = document.getElementById('landing-curtain');
const exploreBtn = document.getElementById('explore-btn');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('full-image');
const closeBtn = document.querySelector('.close-modal');

// Reveal animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

// Genre pool for high-quality variety
const genres = ['nature', 'architecture', 'cityscape', 'ocean', 'forest', 'aesthetic', 'mountain', 'stars'];

const modalLoader = document.getElementById('modal-loader');

// ... existing observer and variables ...

async function initGallery() {
    photoGrid.innerHTML = '';
    
    // Increased to 1000 photos
    const TOTAL_PHOTOS = 1000;
    
    for (let i = 0; i < TOTAL_PHOTOS; i++) {
        // We use i + 1 to ensure a unique seed for all 1000 images
        const imageSeed = i + 1; 
        const card = document.createElement('div');
        card.classList.add('img-card');
        
        const img = document.createElement('img');
        // Lowering resolution slightly for the grid helps performance with 1000 items
        const gridUrl = `https://picsum.photos/seed/${imageSeed}/500/700`;
        const highResUrl = `https://picsum.photos/seed/${imageSeed}/1600/2000`;

        img.src = gridUrl;
        img.loading = "lazy"; // Vital for 1000 images

        card.addEventListener('click', () => {
            modal.style.display = "flex";
            modalLoader.style.display = "block";
            modalImg.src = img.src; 
            modalImg.style.display = "block";
            modalImg.style.filter = "blur(10px)";

            const tempImage = new Image();
            tempImage.src = highResUrl;
            tempImage.onload = () => {
                modalImg.src = highResUrl;
                modalImg.style.filter = "blur(0px)";
                modalLoader.style.display = "none";
            };
        });

        card.appendChild(img);
        photoGrid.appendChild(card);
        observer.observe(card);
    }
}
// ... rest of the code ...
// Curtain Trigger
exploreBtn.addEventListener('click', () => {
    curtain.classList.add('lifted');
    document.body.style.overflow = "auto"; // Enable scrolling
    initGallery();
});

// Modal Close
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Initial State
document.body.style.overflow = "hidden"; // Disable scroll until explored
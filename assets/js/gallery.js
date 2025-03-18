document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.gallery-container');
    const items = document.querySelectorAll('.scroll-gallery .gallery-item');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');
    
    let currentIndex = 0;
    
    function updateGallery() {
        const itemWidth = items[0].offsetWidth + 20; // Width + gap
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    function nextSlide() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateGallery();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
    
    // Update gallery on window resize
    window.addEventListener('resize', updateGallery);
}); 
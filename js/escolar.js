document.addEventListener("DOMContentLoaded", () => {
    
    // --- SECCIÓN 1: MENÚ HAMBURGUESA ---
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.toggle("hidden");
            // Cambia el icono de ☰ a ✕
            hamburger.textContent = isHidden ? "☰" : "✕";
        });
    }

    // --- SECCIÓN 2: CARRUSEL ESCOLAR ---
    const slideStrip = document.getElementById("slide-strip");
    if (!slideStrip) return; // Si no hay carrusel, no ejecuta lo de abajo

    const slides = slideStrip.querySelectorAll(".slide");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");
    const thumbnails = document.querySelectorAll(".thumbnail");
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    const goToSlide = (index) => {
        if (index < 0 || index >= totalSlides) return;
        
        currentSlideIndex = index;
        const translateXValue = -(currentSlideIndex * 100);
        slideStrip.style.transform = `translateX(${translateXValue}%)`;
        
        resetAnimations(index);
        updateThumbnails(index);
        scrollThumbnailIntoView(index);
    };

    const resetAnimations = (index) => {
        const currentSlide = slides[index];
        const title = currentSlide.querySelector("h3");
        const text = currentSlide.querySelector("p");
        const img = currentSlide.querySelector("img");

        [title, text, img].forEach(el => {
            if(!el) return;
            el.style.animation = 'none';
            el.offsetHeight; // Reflow
            el.style.animation = '';
        });
    };

    const updateThumbnails = (index) => {
        thumbnails.forEach(thumb => thumb.classList.remove("active"));
        if(thumbnails[index]) thumbnails[index].classList.add("active");
    };

    const scrollThumbnailIntoView = (index) => {
        const activeThumb = thumbnails[index];
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };

    // Eventos de Navegación
    if (nextBtn) nextBtn.addEventListener("click", () => goToSlide((currentSlideIndex + 1) % totalSlides));
    if (prevBtn) prevBtn.addEventListener("click", () => goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides));

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const slideIndex = parseInt(thumb.getAttribute("data-slide"));
            goToSlide(slideIndex);
        });
    });

    // Auto-play
    let autoPlay = setInterval(() => goToSlide((currentSlideIndex + 1) % totalSlides), 8000);

    const resetAutoPlay = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => goToSlide((currentSlideIndex + 1) % totalSlides), 10000);
    };

    if(nextBtn) nextBtn.addEventListener("click", resetAutoPlay);
    if(prevBtn) prevBtn.addEventListener("click", resetAutoPlay);
    thumbnails.forEach(t => t.addEventListener("click", resetAutoPlay));
});
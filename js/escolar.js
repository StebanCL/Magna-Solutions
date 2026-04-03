document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MENÚ HAMBURGUESA ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            hamburger.textContent = isHidden ? '☰' : '✕';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburger.textContent = '☰';
            });
        });
    }

    // --- 2. LÓGICA SLIDER (Sección Inicio / Hero) ---
    const stageContainer = document.getElementById('inicio');
    // Verificamos que exista el contenedor y que la variable 'slides' (array de imágenes) esté definida
    if (stageContainer && typeof slides !== 'undefined') {
        let currentIdx = 0;
        const titleElement = document.getElementById('stage-title');
        const descElement = document.getElementById('stage-desc');
        const dotsContainer = document.getElementById('dots-container');

        if (dotsContainer && dotsContainer.innerHTML === "") {
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('stage-dot');
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });
        }

        function updateStage() {
            const slide = slides[currentIdx];
            const dots = document.querySelectorAll('.stage-dot');

            stageContainer.style.backgroundImage = `url('${slide.img}')`;
            if(titleElement) titleElement.textContent = slide.title;
            if(descElement) descElement.textContent = slide.desc;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIdx);
            });

            currentIdx = (currentIdx + 1) % slides.length;
        }

        updateStage();
        setInterval(updateStage, 8000);
    }

    // --- 3. CARRUSEL ESCOLAR (Galería de fotos) ---
    const slideStrip = document.getElementById("slide-strip");
    
    if (slideStrip) {
        const carouselSlides = slideStrip.querySelectorAll(".slide");
        const nextBtn = document.getElementById("next-slide");
        const prevBtn = document.getElementById("prev-slide");
        const thumbnails = document.querySelectorAll(".thumbnail");
        
        let currentSlideIndex = 0;
        const totalSlides = carouselSlides.length;

        const goToSlide = (index) => {
            if (index < 0 || index >= totalSlides) return;
            
            currentSlideIndex = index;
            const translateXValue = -(currentSlideIndex * 100);
            slideStrip.style.transform = `translateX(${translateXValue}%)`;
            
            // Reiniciar animaciones de texto
            const currentSlide = carouselSlides[index];
            const itemsToAnimate = currentSlide.querySelectorAll("h3, p, img");
            itemsToAnimate.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; 
                el.style.animation = '';
            });

            // Actualizar miniaturas
            thumbnails.forEach(thumb => thumb.classList.remove("active"));
            if(thumbnails[index]) {
                thumbnails[index].classList.add("active");
                thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        };

        if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide((currentSlideIndex + 1) % totalSlides); resetAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides); resetAutoPlay(); });

        thumbnails.forEach(thumb => {
            thumb.addEventListener("click", () => {
                const slideIndex = parseInt(thumb.getAttribute("data-slide"));
                goToSlide(slideIndex);
                resetAutoPlay();
            });
        });

        let autoPlay = setInterval(() => goToSlide((currentSlideIndex + 1) % totalSlides), 8000);
        const resetAutoPlay = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => goToSlide((currentSlideIndex + 1) % totalSlides), 10000);
        };
    }
});
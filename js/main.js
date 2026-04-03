document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA HAMBURGUESA (Funciona en todas las páginas) ---
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

    // --- 2. DATOS DEL SLIDER (Solo para el Index) ---
    const slides = [
        { title: "Seguridad y Bienestar", desc: "Líderes en implementación SG-SST.", img: "./assets/img/stages1.jpg" },
        { title: "Soluciones de Mantenimiento", desc: "Infraestructura en óptimas condiciones.", img: "./assets/img/stages2.jpg" },
        { title: "Logística Profesional", desc: "Eventos que fortalecen el talento.", img: "./assets/img/stages3.jpg" },
        { title: "Outsourcing Estratégico", desc: "Apoyo administrativo y contable.", img: "./assets/img/stages4.jpg" },
        { title: "Dotación Integral", desc: "Mobiliario y uniformes de alta calidad.", img: "./assets/img/stages5.jpg" }
    ];

    // --- 3. LÓGICA DEL SLIDER (Solo se ejecuta si existe #inicio) ---
    const stageContainer = document.getElementById('inicio');
    if (stageContainer) {
        let currentIdx = 0;
        const titleElement = document.getElementById('stage-title');
        const descElement = document.getElementById('stage-desc');
        const dotsContainer = document.getElementById('dots-container');

        // Inicializar puntos
        if (dotsContainer) {
            dotsContainer.innerHTML = ""; // Limpiar por si acaso
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

            // Cambio de imagen y texto
            stageContainer.style.backgroundImage = `url('${slide.img}')`;
            if (titleElement) titleElement.textContent = slide.title;
            if (descElement) descElement.textContent = slide.desc;

            // Actualizar puntos
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIdx);
            });

            currentIdx = (currentIdx + 1) % slides.length;
        }

        // Iniciar ciclo
        updateStage();
        setInterval(updateStage, 8000);
    }
});
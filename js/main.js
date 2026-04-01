const slides = [
    {
        title: "Seguridad y Bienestar",
        desc: "Líderes en implementación SG-SST y cultura saludable.",
        img: "./assets/img/stages1.jpg"
    },
    {
        title: "Soluciones de Mantenimiento",
        desc: "Infraestructura corporativa siempre en óptimas condiciones.",
        img: "./assets/img/stages2.jpg"
    },
    {
        title: "Logística Profesional",
        desc: "Eventos y olimpiadas que fortalecen el talento humano.",
        img: "./assets/img/stages3.jpg"
    },
    {
        title: "Outsourcing Estratégico",
        desc: "Apoyo administrativo y contable para su crecimiento.",
        img: "./assets/img/stages4.jpg"
    },
    {
        title: "Dotación Integral",
        desc: "Mobiliario y uniformes con los más altos estándares.",
        img: "./assets/img/stages5.jpg"
    }
];

let currentIdx = 0;
const stageContainer = document.getElementById('inicio');
const titleElement = document.getElementById('stage-title');
const descElement = document.getElementById('stage-desc');
const dotsContainer = document.getElementById('dots-container');

function initDots() {
    // Usamos 'slides' que es el nombre correcto del array
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('stage-dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

function updateStage() {
    const slide = slides[currentIdx]; // Cambiado de stages[currentIdx] a slides[currentIdx]
    const dots = document.querySelectorAll('.stage-dot');

    // Aplicamos el fondo y el texto
    stageContainer.style.backgroundImage = `url('${slide.img}')`;
    titleElement.textContent = slide.title;
    descElement.textContent = slide.desc;

    // Actualizamos los puntos indicadores
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });

    // Incrementamos el índice
    currentIdx = (currentIdx + 1) % slides.length;
}

// Ejecución inicial
initDots();
updateStage();

// Cambio automático cada 8 segundos
setInterval(updateStage, 8000);

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    // Alternamos entre mostrar y ocultar el menú
    mobileMenu.classList.toggle('hidden');
    
    // Cambiamos el icono de hamburguesa a X y viceversa
    if (mobileMenu.classList.contains('hidden')) {
        hamburger.innerHTML = '☰';
    } else {
        hamburger.innerHTML = '&times;'; // Esto pone la X
    }
});

// Cerrar al hacer clic en un link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.innerHTML = '☰';
    });
});
// animations.js - Animaciones al hacer scroll ABOUT US
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Animaciones cargadas');
    
    // Configuración
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Se activa cuando el 20% del elemento es visible
    };
    
    // Observador para las cards
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase 'visible' con retraso según posición
                const card = entry.target;
                const index = Array.from(card.parentNode.children).indexOf(card);
                
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200); // Retraso escalonado
            }
        });
    }, observerOptions);
    
    // Observar todas las cards
    const cards = document.querySelectorAll('.feature');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Efecto adicional: animar el título
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.style.animation = 'titleFadeIn 1s ease forwards';
            }
        });
    }, { threshold: 0.3 });
    
    // Observar el título de la sección
    const sectionTitle = document.querySelector('#aboutus h2');
    if (sectionTitle) {
        titleObserver.observe(sectionTitle);
    }
    
    // Agregar animación CSS para el título
    const style = document.createElement('style');
    style.textContent = `
        @keyframes titleFadeIn {
            0% {
                opacity: 0;
                transform: translateY(-30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        #aboutus h2 {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Función para reiniciar animaciones al actualizar
    window.addEventListener('beforeunload', function() {
        cards.forEach(card => {
            card.classList.remove('visible');
        });
        if (sectionTitle) {
            sectionTitle.style.animation = '';
        }
    });
});
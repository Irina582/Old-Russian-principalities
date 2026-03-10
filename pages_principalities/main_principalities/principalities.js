import { CarouselComponentPrincipalities } from "../../components_principalities/carousel_principalities/principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
    }
    
    render() {
        this.parent.innerHTML = '';
        
        const html = `
            <div class="container mt-5">
                <h1 class="text-center mb-4">Правители Московского княжества</h1>
                <div id="carousel-container"></div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Находим контейнер для карусели и рендерим её
        const carouselContainer = document.getElementById('carousel-container');
        const carousel = new CarouselComponentPrincipalities(carouselContainer);
        carousel.render();
    }
}
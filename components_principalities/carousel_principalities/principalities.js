import { SlideComponentPrincipalities } from "../slide_principalities/principalities.js";

export class CarouselComponentPrincipalities {
    constructor(parent, rulersData) {
        this.parent = parent;
        this.rulers = [...rulersData]; // копируем полученные данные
    }

    // Добавление князя (копия первого)
    addRuler() {
        const firstRuler = { ...this.rulers[0] };
        firstRuler.name = firstRuler.name + " (копия)";
        firstRuler.description = "Копия " + firstRuler.description;
        firstRuler.fullDescription = "Копия " + firstRuler.fullDescription;
        this.rulers.push(firstRuler);
        this.refreshCarousel();
    }

    // Удаление князя
    deleteRuler(index) {
        this.rulers.splice(index, 1);
        this.refreshCarousel();
    }

    // Перерисовка карусели
    refreshCarousel() {
        this.parent.innerHTML = '';
        this.render();
    }

    // Метод для создания индикаторов (точечки внизу)
    getIndicators(rulers) {
        let indicators = '';
        rulers.forEach((_, index) => {
            indicators += `
                <button type="button" data-bs-target="#rulersCarousel" 
                    data-bs-slide-to="${index}" 
                    ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                    aria-label="Slide ${index + 1}">
                </button>
            `;
        });
        return indicators;
    }

    // Метод для создания слайдов (использует компонент слайда)
    getSlides(rulers) {
        const slideComponent = new SlideComponentPrincipalities();
        let slides = '';
        
        rulers.forEach((ruler, index) => {
            slides += slideComponent.getHTML(ruler, index);
        });
        
        return slides;
    }

    // Главный метод, который собирает всю карусель
    getHTML() {
        const rulers = this.rulers;
        const indicators = this.getIndicators(rulers);
        const slides = this.getSlides(rulers);

        return `
            <div id="rulersCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#rulersCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#rulersCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Обработчики на кнопки удаления
        const deleteButtons = document.querySelectorAll('.delete-ruler-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const index = button.getAttribute('data-index');
                this.deleteRuler(parseInt(index));
            });
        });
        
        // Обработчики на кнопки подробнее
        this.rulers.forEach((_, index) => {
            const btn = document.getElementById(`ruler-detail-${index}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    const event = new CustomEvent('ruler-click', { 
                        detail: { rulerIndex: index } 
                    });
                    document.dispatchEvent(event);
                });
            }
        });
    }
}
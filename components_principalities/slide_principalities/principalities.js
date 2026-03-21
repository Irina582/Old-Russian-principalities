export class SlideComponentPrincipalities {
    constructor() {
    }

    getHTML(ruler, index) {
        return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${ruler.image}" class="d-block w-100" style="height: 650px; object-fit: cover;" alt="${ruler.name}">
                <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px; bottom: 50px;">
                    <h3>${ruler.name}</h3>
                    <h5>Период правления: ${ruler.period}</h5>
                    <p>${ruler.description}</p>

                    <div class="mt-3">
                        <button class="btn btn-danger delete-ruler-btn" data-index="${index}">
                            Удалить
                        </button>
                        <button class="btn btn-primary" id="ruler-detail-${index}">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
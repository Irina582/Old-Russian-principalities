import { CarouselComponentPrincipalities } from "../../components_principalities/carousel_principalities/principalities.js";
import { rulersData } from "../../data_principalities/principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
        this.fullRulersData = [...rulersData];
        this.filteredData = [...rulersData];
    }

    // Добавление княжества (копия первого)
    addRuler() {
        const firstRuler = this.fullRulersData[0];
        const newRuler = {
            ...firstRuler,
            name: firstRuler.name + " (копия)",
            description: "Копия " + firstRuler.description,
            start: firstRuler.start,
            end: firstRuler.end,
            image: firstRuler.image
        };
        
        this.fullRulersData.push(newRuler);
        this.filteredData = [...this.fullRulersData];
        this.renderCards(this.filteredData);
    }

    // Удаление княжества
    deleteRuler(index) {
        const actualIndex = this.fullRulersData.findIndex(r => 
            r.name === this.filteredData[index].name && 
            r.start === this.filteredData[index].start
        );
        
        if (actualIndex !== -1) {
            this.fullRulersData.splice(actualIndex, 1);
            this.filteredData = [...this.fullRulersData];
            this.renderCards(this.filteredData);
        }
    }

    render() {
        this.parent.innerHTML = '';
        
        const style = document.createElement('style');
        style.textContent = `
            .btn-custom {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 16px !important;
                padding: 8px 16px !important;
            }
            .btn-custom:hover {
                background-color: #4a4c51 !important;
                border-color: #4a4c51 !important;
            }
            .btn-outline-custom {
                border-color: #38393d !important;
                color: #38393d !important;
                font-size: 16px !important;
                padding: 8px 16px !important;
            }
            .btn-outline-custom:hover {
                background-color: #38393d !important;
                color: white !important;
            }
            .btn-card {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-card:hover {
                background-color: #4a4c51 !important;
            }
            .btn-delete {
                background-color: #dc3545 !important;
                border-color: #dc3545 !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-delete:hover {
                background-color: #c82333 !important;
            }
            .cards-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: flex-start;
            }
            .card-item {
                width: calc(33.333% - 14px);
                min-width: 280px;
                margin-bottom: 20px;
            }
        `;
        this.parent.appendChild(style);
        
        const html = `
            <div class="container-fluid mt-4">
                <h1 class="text-center mb-4">Древнерусские княжества</h1>
                
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-custom" id="add-ruler-btn_principalities">
                            + Добавить княжество
                        </button>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="text" class="form-control w-50 mx-auto" id="filter-input_principalities" placeholder="Введите название княжества">
                        <div class="mt-2">
                            <button class="btn btn-custom" id="filter-btn_principalities">Применить фильтр</button>
                            <button class="btn btn-outline-custom" id="reset-filter-btn_principalities">Сбросить фильтр</button>
                        </div>
                    </div>
                </div>

                <div id="cards-container" class="cards-grid"></div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.renderCards(this.filteredData);
        
        document.getElementById('add-ruler-btn_principalities').addEventListener('click', () => {
            this.addRuler();
        });
        
        document.getElementById('filter-btn_principalities').addEventListener('click', () => {
            const filterText = document.getElementById('filter-input_principalities').value.toLowerCase().trim();
            if (filterText === '') return;
            
            const filtered = this.fullRulersData.filter(principality => 
                principality.name.toLowerCase().includes(filterText)
            );
            this.filteredData = filtered;
            this.renderCards(this.filteredData);
        });
        
        document.getElementById('reset-filter-btn_principalities').addEventListener('click', () => {
            document.getElementById('filter-input_principalities').value = '';
            this.filteredData = [...this.fullRulersData];
            this.renderCards(this.filteredData);
        });
    }

    renderCards(data) {
        const container = document.getElementById('cards-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((principality, index) => {
            const card = document.createElement('div');
            card.className = 'card-item';
            
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${principality.image || 'https://via.placeholder.com/400x200?text=Net+izobrazheniya'}" 
                         class="card-img-top" alt="${principality.name}" 
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${principality.name}</h5>
                        <p class="card-text">
                            <strong>Период:</strong> ${principality.start} - ${principality.end}<br>
                            <small class="text-muted">${principality.description}</small>
                        </p>
                        
                        <div class="text-center mb-3">
                            <button class="btn btn-delete delete-card-btn" data-index="${index}">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <button class="btn btn-custom view-details" data-index="${index}">
                            Подробнее
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
            
            const deleteBtn = card.querySelector('.delete-card-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.deleteRuler(index);
            });
            
            const detailsBtn = card.querySelector('.view-details');
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const actualIndex = this.fullRulersData.findIndex(r => 
                    r.name === principality.name && r.start === principality.start
                );
                this.openRulerPage(actualIndex);
            });
        });
    }

    openRulerPage(index) {
        import('../../pages_principalities/product_principalities/principalities.js').then(module => {
            const ProductPagePrincipalities = module.ProductPagePrincipalities;
            const productPage = new ProductPagePrincipalities(this.parent, index);
            productPage.render();
        }).catch(error => {
            console.error('Ошибка загрузки страницы:', error);
            alert('Не удалось открыть страницу с подробностями');
        });
    }
}
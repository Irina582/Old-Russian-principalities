import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { urls } from "../../modules_principalities/urls_principalities.js";
import { HeaderComponentPrincipalities } from "../../components_principalities/header_principalities/principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
        this.allStocks = [];
        this.filteredStocks = [];
    }

    loadStocks(title = '') {
        let url = stockUrls.getStocks();
        if (title) {
            url += `?title=${encodeURIComponent(title)}`;
        }

        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.allStocks = data;
                this.filteredStocks = [...data];
                this.renderCards(this.filteredStocks);
            } else {
                console.error('Ошибка загрузки карточек');
                this.allStocks = [];
                this.filteredStocks = [];
                this.renderCards([]);
            }
        });
    }

    addRuler() {
        this.openCreatePage();
    }

    openCreatePage() {
        import('../../pages_principalities/edit_principalities/principalities.js').then(module => {
            const EditPagePrincipalities = module.EditPagePrincipalities;
            const editPage = new EditPagePrincipalities(this.parent, null, true);
            editPage.render();
        });
    }

    deleteRuler(id) {
        ajax.delete(stockUrls.removeStockById(id), (data, status) => {
            if (status === 204) {
                this.loadStocks();
            } else {
                console.error('Ошибка удаления');
            }
        });
    }

    filterByTitle() {
        const filterText = document.getElementById('filter-input_principalities').value.trim();
        this.loadStocks(filterText);
    }

    resetFilter() {
        document.getElementById('filter-input_principalities').value = '';
        this.loadStocks('');
    }

    render() {
        this.parent.innerHTML = '';

        // Добавляем хедер
        const header = new HeaderComponentPrincipalities(this.parent, () => {
            // Обработчик клика - перерисовываем главную (очищаем всё и рендерим заново)
            this.render();
        });
        header.render();

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
            .btn-edit {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-edit:hover {
                background-color: #4a4c51 !important;
            }
            .cards-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: flex-start;
                margin-top: 20px;
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
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-custom" id="add-ruler-btn_principalities">
                            + Добавить княжество
                        </button>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="text" class="form-control w-50 mx-auto" id="filter-input_principalities" placeholder="Фильтр по названию">
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

        document.getElementById('add-ruler-btn_principalities').addEventListener('click', () => this.addRuler());
        document.getElementById('filter-btn_principalities').addEventListener('click', () => this.filterByTitle());
        document.getElementById('reset-filter-btn_principalities').addEventListener('click', () => this.resetFilter());

        this.loadStocks();
    }

    renderCards(stocks) {
        const container = document.getElementById('cards-container');
        if (!container) return;
        container.innerHTML = '';

        stocks.forEach((stock) => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${stock.src || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${stock.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${stock.title}</h5>
                        <p class="card-text">${stock.text}</p>
                        <div class="text-center mb-3">
                            <button class="btn btn-edit edit-card-btn" data-id="${stock.id}">
                                Редактировать
                            </button>
                            <button class="btn btn-delete delete-card-btn" data-id="${stock.id}">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <button class="btn btn-custom view-details" data-id="${stock.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);

            const editBtn = card.querySelector('.edit-card-btn');
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openEditPage(stock.id);
            });

            const deleteBtn = card.querySelector('.delete-card-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.deleteRuler(stock.id);
            });

            const detailsBtn = card.querySelector('.view-details');
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openRulerPage(stock.id);
            });
        });
    }

    openRulerPage(id) {
        import('../../pages_principalities/product_principalities/principalities.js').then(module => {
            const ProductPagePrincipalities = module.ProductPagePrincipalities;
            const productPage = new ProductPagePrincipalities(this.parent, id);
            productPage.render();
        });
    }

    openEditPage(id) {
        import('../../pages_principalities/edit_principalities/principalities.js').then(module => {
            const EditPagePrincipalities = module.EditPagePrincipalities;
            const editPage = new EditPagePrincipalities(this.parent, id, false);
            editPage.render();
        });
    }
}
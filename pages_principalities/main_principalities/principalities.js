import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { stockUrls } from "../../modules_principalities/stockUrls_principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
        this.allStocks = [];     // все карточки с сервера
        this.filteredStocks = []; // отфильтрованные
        this.limit = 0;          // 0 = все, иначе сколько показать
    }

    // Загрузка карточек с сервера
    loadStocks(title = '') {
        let url = stockUrls.getStocks();
        if (title) {
            url += `?title=${encodeURIComponent(title)}`;
        }

        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.allStocks = data;
                this.filteredStocks = [...data];
                this.applyLimit(); // применяем лимит после загрузки
            } else {
                console.error('Ошибка загрузки карточек');
                this.allStocks = [];
                this.filteredStocks = [];
                this.renderCards([]);
            }
        });
    }

    // Применить лимит (пагинация на клиенте)
    applyLimit() {
        let limited = [...this.filteredStocks];
        if (this.limit > 0 && this.limit < limited.length) {
            limited = limited.slice(0, this.limit);
        }
        this.renderCards(limited);
    }

    // Обновить лимит из поля ввода
    updateLimit() {
        const limitInput = document.getElementById('limit-input_principalities');
        let newLimit = parseInt(limitInput.value);
        if (isNaN(newLimit) || newLimit < 0) newLimit = 0;
        this.limit = newLimit;
        this.applyLimit();
    }

    // Фильтр по названию (через API)
    filterByTitle() {
        const filterText = document.getElementById('filter-input_principalities').value.trim();
        this.loadStocks(filterText);
    }

    // Сбросить фильтр
    resetFilter() {
        document.getElementById('filter-input_principalities').value = '';
        this.loadStocks('');
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
                <h1 class="text-center mb-4">Древнерусские княжества</h1>

                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="text" class="form-control w-50 mx-auto mb-2" id="filter-input_principalities" placeholder="Фильтр по названию">
                        <div class="mt-2">
                            <button class="btn btn-custom" id="filter-btn_principalities">Применить фильтр</button>
                            <button class="btn btn-outline-custom" id="reset-filter-btn_principalities">Сбросить фильтр</button>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="number" class="form-control w-25 mx-auto" id="limit-input_principalities" placeholder="Лимит карточек" value="0" min="0">
                        <button class="btn btn-custom mt-2" id="apply-limit-btn_principalities">Применить лимит</button>
                    </div>
                </div>

                <div id="cards-container" class="cards-grid"></div>
            </div>
        `;

        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('filter-btn_principalities').addEventListener('click', () => this.filterByTitle());
        document.getElementById('reset-filter-btn_principalities').addEventListener('click', () => this.resetFilter());
        document.getElementById('apply-limit-btn_principalities').addEventListener('click', () => this.updateLimit());

        this.loadStocks();
    }

    renderCards(stocks) {
        const container = document.getElementById('cards-container');
        if (!container) return;
        container.innerHTML = '';

        stocks.forEach((stock, index) => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${stock.src || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${stock.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${stock.title}</h5>
                        <p class="card-text">${stock.text.substring(0, 100)}...</p>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <button class="btn btn-custom view-details" data-id="${stock.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);

            const detailsBtn = card.querySelector('.view-details');
            detailsBtn.addEventListener('click', () => {
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
}
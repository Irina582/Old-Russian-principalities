import { BackButtonComponentPrincipalities } from "../../components_principalities/back-button_principalities/principalities.js";
import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { stockUrls } from "../../modules_principalities/stockUrls_principalities.js";

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    async loadStock() {
        const url = stockUrls.getStockById(this.id);
        const { data, status } = await ajax.get(url);
        if (status === 200 && data) {
            this.data = data;
            this.renderData();
        } else {
            console.error('Ошибка загрузки карточки');
            this.data = null;
            this.renderError();
        }
    }

    renderData() {
        if (!this.data) return;
        const textContainer = document.getElementById('text-content');
        const stock = new ProductComponentPrincipalities(textContainer);
        
        const extendedData = {
            ...this.data,
            text: this.data.fullText || this.data.text
        };
        
        stock.render(extendedData);
    }

    renderError() {
        const textContainer = document.getElementById('text-content');
        textContainer.innerHTML = `<div class="alert alert-danger">Карточка не найдена</div>`;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page">
                <div id="back-button-container"></div>
                <div id="text-content" class="mt-3"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPagePrincipalities(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponentPrincipalities(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        this.loadStock();
    }
}
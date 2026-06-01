import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { urls } from "../../modules_principalities/urls_principalities.js";
import { HeaderComponentPrincipalities } from "../../components_principalities/header_principalities/principalities.js";

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    loadStock() {
        const url = urls.getItemById(this.id);
        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.data = data;
                this.renderData();
            } else {
                console.error('Ошибка загрузки карточки');
                this.data = null;
                this.renderError();
            }
        });
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
        
        const header = new HeaderComponentPrincipalities(this.parent, () => {
            const mainPage = new MainPagePrincipalities(this.parent);
            mainPage.render();
        });
        header.render();
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.loadStock();
    }
}
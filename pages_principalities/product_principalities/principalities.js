import { BackButtonComponentPrincipalities } from "../../components_principalities/back-button_principalities/principalities.js";
import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { rulersData } from "../../data_principalities/principalities.js";

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const principality = rulersData[this.id];
        
        if (!principality) {
            return {
                id: this.id,
                src: "",
                title: "Княжество не найдено",
                text: "Извините, информация о данном княжестве отсутствует"
            };
        }
        
        return {
            id: this.id,
            src: principality.image,
            title: principality.name,
            text: `${principality.description}\n\nПериод существования: ${principality.start} - ${principality.end}`
        };
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

        const data = this.getData();
        
        const textContainer = document.getElementById('text-content');
        const stock = new ProductComponentPrincipalities(textContainer);
        stock.render(data);
    }
}
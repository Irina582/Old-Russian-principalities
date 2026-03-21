// pages_principalities/product_principalities/principalities.js

import { BackButtonComponentPrincipalities } from "../../components_principalities/back-button_principalities/principalities.js";
import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { rulersData } from "../../data_principalities/principalities.js";

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; // индекс князя
    }

    getData() {
        const ruler = rulersData[this.id];
        
        if (!ruler) {
            return {
                id: this.id,
                src: "",
                title: "Князь не найден",
                text: "Извините, информация о данном князе отсутствует"
            };
        }
        
        return {
            id: this.id,
            src: ruler.image,
            title: ruler.name,
            text: `${ruler.fullDescription}\n\nПериод правления: ${ruler.period}`
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPagePrincipalities(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponentPrincipalities(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const stock = new ProductComponentPrincipalities(this.pageRoot);
        stock.render(data);
    }
}
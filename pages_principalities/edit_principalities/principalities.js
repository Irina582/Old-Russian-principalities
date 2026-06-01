import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { urls } from "../../modules_principalities/urls_principalities.js";
import { HeaderComponentPrincipalities } from "../../components_principalities/header_principalities/principalities.js";

export class EditPagePrincipalities {
    constructor(parent, id, isCreateMode = false) {
        this.parent = parent;
        this.id = id;
        this.isCreateMode = isCreateMode;
        this.data = null;
    }

    loadStock() {
        if (this.isCreateMode) {
            this.data = {
                title: '',
                text: '',
                fullText: '',
                src: ''
            };
            this.renderForm();
        } else {
            const url = stockUrls.getStockById(this.id);
            ajax.get(url, (data, status) => {
                if (status === 200 && data) {
                    this.data = data;
                    this.renderForm();
                } else {
                    this.renderError();
                }
            });
        }
    }

    renderForm() {
        const container = document.getElementById('edit-form-container');
        const titleText = this.isCreateMode ? 'Создание новой карточки' : 'Редактирование карточки';
        
        container.innerHTML = `
            <div class="card p-4">
                <h3>${titleText}</h3>
                <div class="mb-3">
                    <label class="form-label">Заголовок</label>
                    <input type="text" class="form-control" id="edit-title" value="${this.escapeHtml(this.data.title)}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Краткое описание (на карточке)</label>
                    <textarea class="form-control" id="edit-text" rows="3">${this.escapeHtml(this.data.text)}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Полное описание (на странице подробнее)</label>
                    <textarea class="form-control" id="edit-fullText" rows="6">${this.escapeHtml(this.data.fullText || '')}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL картинки</label>
                    <input type="text" class="form-control" id="edit-src" value="${this.escapeHtml(this.data.src)}">
                </div>
            </div>
        `;
    }

    renderError() {
        const container = document.getElementById('edit-form-container');
        container.innerHTML = `<div class="alert alert-danger">Карточка не найдена</div>`;
    }

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    getHTML() {
        return `
            <div id="edit-page">
                <div id="edit-form-container" class="container mt-4"></div>
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
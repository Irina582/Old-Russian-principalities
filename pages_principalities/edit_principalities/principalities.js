import { ajax } from "../../modules_principalities/ajax_principalities.js";
import { urls } from "../../modules_principalities/urls_principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { HeaderComponentPrincipalities } from "../../components_principalities/header_principalities/principalities.js";

export class EditPagePrincipalities {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.data = null;
        this.isNew = (id === null);
    }

    async loadStock() {
        if (this.isNew) {
            this.renderEmptyForm();
            return;
        }
        
        const url = urls.getItemById(this.id);
        const { data, status } = await ajax.get(url);
        if (status === 200 && data) {
            this.data = data;
            this.renderForm();
        } else {
            this.renderError();
        }
    }

    renderEmptyForm() {
        const container = document.getElementById('edit-form-container');
        container.innerHTML = `
            <div class="card p-4">
                <h3>Создание новой карточки</h3>
                <div class="mb-3">
                    <label class="form-label">Заголовок</label>
                    <input type="text" class="form-control" id="edit-title" value="">
                </div>
                <div class="mb-3">
                    <label class="form-label">Краткое описание (на карточке)</label>
                    <textarea class="form-control" id="edit-text" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Полное описание (на странице подробнее)</label>
                    <textarea class="form-control" id="edit-fullText" rows="6"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL картинки</label>
                    <input type="text" class="form-control" id="edit-src" value="https://via.placeholder.com/400x200">
                </div>
                <button class="btn btn-success" id="save-changes-btn">Создать карточку</button>
            </div>
        `;

        document.getElementById('save-changes-btn').addEventListener('click', () => {
            this.createNew();
        });
    }

    renderForm() {
        const container = document.getElementById('edit-form-container');
        container.innerHTML = `
            <div class="card p-4">
                <h3>Редактирование карточки</h3>
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
                <button class="btn btn-success" id="save-changes-btn">Сохранить изменения</button>
            </div>
        `;

        document.getElementById('save-changes-btn').addEventListener('click', () => {
            this.saveChanges();
        });
    }

    async createNew() {
        const newData = {
            title: document.getElementById('edit-title').value,
            text: document.getElementById('edit-text').value,
            fullText: document.getElementById('edit-fullText').value,
            src: document.getElementById('edit-src').value
        };

        if (!newData.title.trim()) {
            alert('Пожалуйста, заполните заголовок');
            return;
        }

        const url = urls.createItem();
        const { status } = await ajax.post(url, newData);
        if (status === 201 || status === 200) {
            const mainPage = new MainPagePrincipalities(this.parent);
            mainPage.render();
        } else {
            alert('Ошибка при создании карточки');
        }
    }

    async saveChanges() {
        const updatedData = {
            title: document.getElementById('edit-title').value,
            text: document.getElementById('edit-text').value,
            fullText: document.getElementById('edit-fullText').value,
            src: document.getElementById('edit-src').value
        };

        const url = urls.updateItemById(this.id);
        const { status } = await ajax.patch(url, updatedData);
        if (status === 200) {
            const mainPage = new MainPagePrincipalities(this.parent);
            mainPage.render();
        } else {
            alert('Ошибка при обновлении');
        }
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
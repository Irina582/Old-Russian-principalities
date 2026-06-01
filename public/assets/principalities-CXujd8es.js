import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./principalities-CWcgLGng.js";var l;c((()=>{t(),e(),r(),n(),l=class{constructor(e,t=null){this.parent=e,this.id=t,this.data=null,this.isNew=t===null}async loadStock(){if(this.isNew){this.renderEmptyForm();return}let e=i.getItemById(this.id),{data:t,status:n}=await o.get(e);n===200&&t?(this.data=t,this.renderForm()):this.renderError()}renderEmptyForm(){let e=document.getElementById(`edit-form-container`);e.innerHTML=`
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
        `,document.getElementById(`save-changes-btn`).addEventListener(`click`,()=>{this.createNew()})}renderForm(){let e=document.getElementById(`edit-form-container`);e.innerHTML=`
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
                    <textarea class="form-control" id="edit-fullText" rows="6">${this.escapeHtml(this.data.fullText||``)}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">URL картинки</label>
                    <input type="text" class="form-control" id="edit-src" value="${this.escapeHtml(this.data.src)}">
                </div>
                <button class="btn btn-success" id="save-changes-btn">Сохранить изменения</button>
            </div>
        `,document.getElementById(`save-changes-btn`).addEventListener(`click`,()=>{this.saveChanges()})}async createNew(){let e={title:document.getElementById(`edit-title`).value,text:document.getElementById(`edit-text`).value,fullText:document.getElementById(`edit-fullText`).value,src:document.getElementById(`edit-src`).value};if(!e.title.trim()){alert(`Пожалуйста, заполните заголовок`);return}let t=i.createItem(),{status:n}=await o.post(t,e);n===201||n===200?new s(this.parent).render():alert(`Ошибка при создании карточки`)}async saveChanges(){let e={title:document.getElementById(`edit-title`).value,text:document.getElementById(`edit-text`).value,fullText:document.getElementById(`edit-fullText`).value,src:document.getElementById(`edit-src`).value},t=i.updateItemById(this.id),{status:n}=await o.patch(t,e);n===200?new s(this.parent).render():alert(`Ошибка при обновлении`)}renderError(){let e=document.getElementById(`edit-form-container`);e.innerHTML=`<div class="alert alert-danger">Карточка не найдена</div>`}escapeHtml(e){return e?e.replace(/[&<>]/g,function(e){return e===`&`?`&amp;`:e===`<`?`&lt;`:e===`>`?`&gt;`:e}):``}getHTML(){return`
            <div id="edit-page">
                <div id="edit-form-container" class="container mt-4"></div>
            </div>
        `}clickBack(){new s(this.parent).render()}render(){this.parent.innerHTML=``,new a(this.parent,()=>{new s(this.parent).render()}).render();let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),this.loadStock()}}}))();export{l as EditPagePrincipalities};
import{a as e,c as t,i as n,n as r,o as i,r as a,t as o}from"./principalities-BJaky090.js";import{n as s,t as c}from"./principalities-n_ON8M3-.js";var l;t((()=>{s(),i(),a(),r(),l=class{constructor(e,t){this.parent=e,this.id=t,this.data=null}async loadStock(){let t=n.getStockById(this.id),{data:r,status:i}=await e.get(t);i===200&&r?(this.data=r,this.renderForm()):this.renderError()}renderForm(){let e=document.getElementById(`edit-form-container`);e.innerHTML=`
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
        `,document.getElementById(`save-changes-btn`).addEventListener(`click`,()=>{this.saveChanges()})}async saveChanges(){let t={title:document.getElementById(`edit-title`).value,text:document.getElementById(`edit-text`).value,fullText:document.getElementById(`edit-fullText`).value,src:document.getElementById(`edit-src`).value},r=n.updateStockById(this.id),{status:i}=await e.patch(r,t);i===200?new o(this.parent).render():alert(`Ошибка при обновлении`)}renderError(){let e=document.getElementById(`edit-form-container`);e.innerHTML=`<div class="alert alert-danger">Карточка не найдена</div>`}escapeHtml(e){return e?e.replace(/[&<>]/g,function(e){return e===`&`?`&amp;`:e===`<`?`&lt;`:e===`>`?`&gt;`:e}):``}getHTML(){return`
            <div id="edit-page">
                <div id="back-button-container"></div>
                <div id="edit-form-container" class="container mt-4"></div>
            </div>
        `}clickBack(){new o(this.parent).render()}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),new c(document.getElementById(`back-button-container`)).render(this.clickBack.bind(this)),this.loadStock()}}}))();export{l as EditPagePrincipalities};
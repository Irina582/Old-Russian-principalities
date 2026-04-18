import{i as e,n as t,o as n,r,t as i}from"./principalities-ucld3CsK.js";var a,o=n((()=>{a=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`).addEventListener(`click`,e)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.addListeners(e)}}})),s,c=n((()=>{s=class{constructor(e){this.parent=e}getHTML(e){return`
                <div class="card mb-3" style="width: 1000px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${e.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${e.title}</h5>
                                <p class="card-text">${e.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),l;n((()=>{o(),c(),t(),r(),l=class{constructor(e,t){this.parent=e,this.id=t}getData(){let t=e[this.id];return t?{id:this.id,src:t.image,title:t.name,text:`${t.description}\n\nПериод существования: ${t.start} - ${t.end}`}:{id:this.id,src:``,title:`Княжество не найдено`,text:`Извините, информация о данном княжестве отсутствует`}}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
            <div id="product-page">
                <div id="back-button-container"></div>
                <div id="text-content" class="mt-3"></div>
            </div>
        `}clickBack(){new i(this.parent).render()}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),new a(document.getElementById(`back-button-container`)).render(this.clickBack.bind(this));let t=this.getData();new s(document.getElementById(`text-content`)).render(t)}}}))();export{l as ProductPagePrincipalities};
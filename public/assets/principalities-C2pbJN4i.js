import{a as e,c as t,i as n,n as r,o as i,r as a,t as o}from"./principalities-BJaky090.js";import{n as s,t as c}from"./principalities-n_ON8M3-.js";var l,u=t((()=>{l=class{constructor(e){this.parent=e}getHTML(e){return`
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
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),d;t((()=>{s(),u(),r(),i(),a(),d=class{constructor(e,t){this.parent=e,this.id=t,this.data=null}async loadStock(){let t=n.getStockById(this.id),{data:r,status:i}=await e.get(t);i===200&&r?(this.data=r,this.renderData()):(console.error(`Ошибка загрузки карточки`),this.data=null,this.renderError())}renderData(){if(!this.data)return;let e=new l(document.getElementById(`text-content`)),t={...this.data,text:this.data.fullText||this.data.text};e.render(t)}renderError(){let e=document.getElementById(`text-content`);e.innerHTML=`<div class="alert alert-danger">Карточка не найдена</div>`}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
            <div id="product-page">
                <div id="back-button-container"></div>
                <div id="text-content" class="mt-3"></div>
            </div>
        `}clickBack(){new o(this.parent).render()}render(){this.parent.innerHTML=``;let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),new c(document.getElementById(`back-button-container`)).render(this.clickBack.bind(this)),this.loadStock()}}}))();export{d as ProductPagePrincipalities};
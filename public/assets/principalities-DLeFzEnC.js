import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./principalities-CWcgLGng.js";var l,u=c((()=>{l=class{constructor(e){this.parent=e}getHTML(e){return`
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
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),d;c((()=>{u(),r(),t(),e(),n(),d=class{constructor(e,t){this.parent=e,this.id=t,this.data=null}async loadStock(){let e=i.getItemById(this.id),{data:t,status:n}=await o.get(e);n===200&&t?(this.data=t,this.renderData()):(console.error(`Ошибка загрузки карточки`),this.data=null,this.renderError())}renderData(){if(!this.data)return;let e=new l(document.getElementById(`text-content`)),t={...this.data,text:this.data.fullText||this.data.text};e.render(t)}renderError(){let e=document.getElementById(`text-content`);e.innerHTML=`<div class="alert alert-danger">Карточка не найдена</div>`}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
            <div id="product-page">
                <div id="text-content" class="mt-3"></div>
            </div>
        `}clickBack(){new s(this.parent).render()}render(){this.parent.innerHTML=``,new a(this.parent,()=>{new s(this.parent).render()}).render();let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),this.loadStock()}}}))();export{d as ProductPagePrincipalities};
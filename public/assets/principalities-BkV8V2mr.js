var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),n,r,i=e((()=>{n=class{async get(e){try{let t=await fetch(e);if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return{data:await t.json(),status:t.status}}catch(e){return console.error(`GET ошибка:`,e),{data:null,status:0}}}async post(e,t){try{let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=null,i=n.headers.get(`content-type`);return i&&i.includes(`application/json`)&&(r=await n.json()),{data:r,status:n.status}}catch(e){return console.error(`POST ошибка:`,e),{data:null,status:0}}}async patch(e,t){try{let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),r=null,i=n.headers.get(`content-type`);return i&&i.includes(`application/json`)&&(r=await n.json()),{data:r,status:n.status}}catch(e){return console.error(`PATCH ошибка:`,e),{data:null,status:0}}}async delete(e){try{return{data:null,status:(await fetch(e,{method:`DELETE`})).status}}catch(e){return console.error(`DELETE ошибка:`,e),{data:null,status:0}}}},r=new n})),a,o,s=e((()=>{a=class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/stocks_principalities`}getStockById(e){return`${this.baseUrl}/stocks_principalities/${e}`}createStock(){return`${this.baseUrl}/stocks_principalities`}removeStockById(e){return`${this.baseUrl}/stocks_principalities/${e}`}updateStockById(e){return`${this.baseUrl}/stocks_principalities/${e}`}},o=new a})),c,l=e((()=>{c=class{constructor(e,t){this.parent=e,this.onHomeClick=t}getHTML(){return`
            <header style="background-color: #38393d; padding: 12px 24px; margin-bottom: 20px;">
                <button id="home-button-header" style="background: none; border: none; color: white; font-size: 1.5rem; font-weight: 500; cursor: pointer;">
                    Древнерусские княжества
                </button>
            </header>
        `}render(){this.parent.insertAdjacentHTML(`afterbegin`,this.getHTML());let e=document.getElementById(`home-button-header`);e&&this.onHomeClick&&e.addEventListener(`click`,this.onHomeClick)}}})),u,d,f,p,m=e((()=>{u=`modulepreload`,d=function(e){return`/`+e},f={},p=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=d(t,n),t in f)return;f[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:u,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})}})),h,g=e((()=>{i(),s(),l(),m(),h=class{constructor(e){this.parent=e,this.allStocks=[],this.filteredStocks=[]}async loadStocks(e=``){let t=o.getStocks();e&&(t+=`?title=${encodeURIComponent(e)}`);let{data:n,status:i}=await r.get(t);i===200&&n?(this.allStocks=n,this.filteredStocks=[...n],this.renderCards(this.filteredStocks)):(console.error(`Ошибка загрузки карточек`),this.allStocks=[],this.filteredStocks=[],this.renderCards([]))}async addRuler(){this.openEditPage(null)}async deleteRuler(e){let{status:t}=await r.delete(o.removeStockById(e));t===204?this.loadStocks():console.error(`Ошибка удаления`)}filterByTitle(){let e=document.getElementById(`filter-input_principalities`).value.trim();this.loadStocks(e)}resetFilter(){document.getElementById(`filter-input_principalities`).value=``,this.loadStocks(``)}render(){this.parent.innerHTML=``,new c(this.parent,()=>{this.render()}).render();let e=document.createElement(`style`);e.textContent=`
            .btn-custom {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 16px !important;
                padding: 8px 16px !important;
            }
            .btn-custom:hover {
                background-color: #4a4c51 !important;
            }
            .btn-outline-custom {
                border-color: #38393d !important;
                color: #38393d !important;
                font-size: 16px !important;
                padding: 8px 16px !important;
            }
            .btn-outline-custom:hover {
                background-color: #38393d !important;
                color: white !important;
            }
            .btn-delete {
                background-color: #dc3545 !important;
                border-color: #dc3545 !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-delete:hover {
                background-color: #c82333 !important;
            }
            .btn-edit {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-edit:hover {
                background-color: #4a4c51 !important;
            }
            .cards-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: flex-start;
                margin-top: 20px;
            }
            .card-item {
                width: calc(33.333% - 14px);
                min-width: 280px;
                margin-bottom: 20px;
            }
        `,this.parent.appendChild(e),this.parent.insertAdjacentHTML(`beforeend`,`
            <div class="container-fluid mt-4">
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-custom" id="add-ruler-btn_principalities">
                            + Добавить княжество
                        </button>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="text" class="form-control w-50 mx-auto" id="filter-input_principalities" placeholder="Фильтр по названию">
                        <div class="mt-2">
                            <button class="btn btn-custom" id="filter-btn_principalities">Применить фильтр</button>
                            <button class="btn btn-outline-custom" id="reset-filter-btn_principalities">Сбросить фильтр</button>
                        </div>
                    </div>
                </div>

                <div id="cards-container" class="cards-grid"></div>
            </div>
        `),document.getElementById(`add-ruler-btn_principalities`).addEventListener(`click`,()=>this.addRuler()),document.getElementById(`filter-btn_principalities`).addEventListener(`click`,()=>this.filterByTitle()),document.getElementById(`reset-filter-btn_principalities`).addEventListener(`click`,()=>this.resetFilter()),this.loadStocks()}renderCards(e){let t=document.getElementById(`cards-container`);t&&(t.innerHTML=``,e.forEach(e=>{let n=document.createElement(`div`);n.className=`card-item`,n.innerHTML=`
                <div class="card h-100 shadow-sm">
                    <img src="${e.src||`https://via.placeholder.com/400x200`}" class="card-img-top" alt="${e.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${e.title}</h5>
                        <p class="card-text">${e.text}</p>
                        <div class="text-center mb-3">
                            <button class="btn btn-edit edit-card-btn" data-id="${e.id}">
                                Редактировать
                            </button>
                            <button class="btn btn-delete delete-card-btn" data-id="${e.id}">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <button class="btn btn-custom view-details" data-id="${e.id}">
                            Подробнее
                        </button>
                    </div>
                </div>
            `,t.appendChild(n),n.querySelector(`.edit-card-btn`).addEventListener(`click`,t=>{t.preventDefault(),this.openEditPage(e.id)}),n.querySelector(`.delete-card-btn`).addEventListener(`click`,t=>{t.preventDefault(),this.deleteRuler(e.id)}),n.querySelector(`.view-details`).addEventListener(`click`,t=>{t.preventDefault(),this.openRulerPage(e.id)})}))}openRulerPage(e){p(()=>import(`./principalities-BAjqrvoQ.js`).then(t=>{let n=t.ProductPagePrincipalities;new n(this.parent,e).render()}),[])}openEditPage(e){p(()=>import(`./principalities-CO_ytjCJ.js`).then(t=>{let n=t.EditPagePrincipalities;new n(this.parent,e).render()}),[])}}}));export{s as a,i as c,l as i,t as l,g as n,o,c as r,r as s,h as t,e as u};
var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),n,r=e((()=>{n=[{name:`Великое княжество Владимирское`,start:1221,end:1389,description:`Крупнейшее княжество Северо-Восточной Руси`,fullDescription:`Великое княжество Владимирское образовалось в 1125 году после смерти Владимира Мономаха. Было центром объединения русских земель. В 1389 году вошло в состав Московского княжества.`,image:`https://ir.ozone.ru/s3/multimedia-1-y/7960146334.jpg`,model3d:`models_principalities/Log Cabin.glb`},{name:`Новгородское княжество`,start:1136,end:1478,description:`Феодальная республика с развитой демократией`,fullDescription:`Новгородская республика существовала с 1136 по 1478 год. Управлялась вечем (народным собранием). Присоединена Иваном III к Московскому государству.`,image:`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Novgorod_torg.JPG/960px-Novgorod_torg.JPG`,model3d:`models_principalities/Crown.glb`},{name:`Смоленское княжество`,start:1054,end:1404,description:`Важное торговое княжество на западе Руси`,fullDescription:`Выделилось в 1054 году. Контролировало важные торговые пути. В 1404 году вошло в состав Великого княжества Литовского.`,image:`https://images-cdn.onlinetestpad.net/fb/a7/86fd8d4a45ba9331af0bc3a67c43.jpg`,model3d:`models_principalities/Log Cabin.glb`},{name:`Рязанское княжество`,start:1129,end:1521,description:`Пограничное княжество на юго-востоке`,fullDescription:`Образовалось в 1129 году. Долго противостояло набегам кочевников. В 1521 году окончательно присоединено к Московскому государству.`,image:`https://cdn.culture.ru/images/5883b651-4d87-5b56-85da-290bea55be6a`,model3d:`models_principalities/Crown.glb`},{name:`Киевское княжество`,start:1132,end:1441,description:`Мать городов русских, утратившее влияние`,fullDescription:`После распада Киевской Руси в 1132 году Киев стал отдельным княжеством. Постепенно утратило значение. В 1470 году вошло в состав Литвы.`,image:`https://cont.ws/uploads/pic/2020/7/553800.jpg`,model3d:`models_principalities/Palace.glb`}]})),i,a,o,s,c=e((()=>{i=`modulepreload`,a=function(e){return`/`+e},o={},s=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=l(t.map(t=>{if(t=a(t,n),t in o)return;o[t]=!0;let r=t.endsWith(`.css`),s=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=r?`stylesheet`:i,r||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),r)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})}})),l,u=e((()=>{r(),c(),l=class{constructor(e){this.parent=e,this.fullRulersData=[...n],this.filteredData=[...n]}addRuler(){let e=this.fullRulersData[0],t={...e,name:e.name+` (копия)`,description:`Копия `+e.description,start:e.start,end:e.end,image:e.image};this.fullRulersData.push(t),this.filteredData=[...this.fullRulersData],this.renderCards(this.filteredData)}deleteRuler(e){let t=this.fullRulersData.findIndex(t=>t.name===this.filteredData[e].name&&t.start===this.filteredData[e].start);t!==-1&&(this.fullRulersData.splice(t,1),this.filteredData=[...this.fullRulersData],this.renderCards(this.filteredData))}render(){this.parent.innerHTML=``;let e=document.createElement(`style`);e.textContent=`
            .btn-custom {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 16px !important;
                padding: 8px 16px !important;
            }
            .btn-custom:hover {
                background-color: #4a4c51 !important;
                border-color: #4a4c51 !important;
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
            .btn-card {
                background-color: #38393d !important;
                border-color: #38393d !important;
                color: white !important;
                font-size: 14px !important;
                padding: 6px 12px !important;
                margin: 3px;
            }
            .btn-card:hover {
                background-color: #4a4c51 !important;
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
            .cards-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: flex-start;
            }
            .card-item {
                width: calc(33.333% - 14px);
                min-width: 280px;
                margin-bottom: 20px;
            }
        `,this.parent.appendChild(e),this.parent.insertAdjacentHTML(`beforeend`,`
            <div class="container-fluid mt-4">
                <h1 class="text-center mb-4">Древнерусские княжества</h1>
                
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-custom" id="add-ruler-btn_principalities">
                            + Добавить княжество
                        </button>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <input type="text" class="form-control w-50 mx-auto" id="filter-input_principalities" placeholder="Введите название княжества">
                        <div class="mt-2">
                            <button class="btn btn-custom" id="filter-btn_principalities">Применить фильтр</button>
                            <button class="btn btn-outline-custom" id="reset-filter-btn_principalities">Сбросить фильтр</button>
                        </div>
                    </div>
                </div>

                <div id="cards-container" class="cards-grid"></div>
            </div>
        `),this.renderCards(this.filteredData),document.getElementById(`add-ruler-btn_principalities`).addEventListener(`click`,()=>{this.addRuler()}),document.getElementById(`filter-btn_principalities`).addEventListener(`click`,()=>{let e=document.getElementById(`filter-input_principalities`).value.toLowerCase().trim();e!==``&&(this.filteredData=this.fullRulersData.filter(t=>t.name.toLowerCase().includes(e)),this.renderCards(this.filteredData))}),document.getElementById(`reset-filter-btn_principalities`).addEventListener(`click`,()=>{document.getElementById(`filter-input_principalities`).value=``,this.filteredData=[...this.fullRulersData],this.renderCards(this.filteredData)})}renderCards(e){let t=document.getElementById(`cards-container`);t&&(t.innerHTML=``,e.forEach((e,n)=>{let r=document.createElement(`div`);r.className=`card-item`,r.innerHTML=`
                <div class="card h-100 shadow-sm">
                    <img src="${e.image||`https://via.placeholder.com/400x200?text=Net+izobrazheniya`}" 
                         class="card-img-top" alt="${e.name}" 
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <p class="card-text">
                            <strong>Период:</strong> ${e.start} - ${e.end}<br>
                            <small class="text-muted">${e.description}</small>
                        </p>
                        
                        <div class="text-center mb-3">
                            <button class="btn btn-delete delete-card-btn" data-index="${n}">
                                Удалить
                            </button>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent text-center">
                        <button class="btn btn-custom view-details" data-index="${n}">
                            Подробнее
                        </button>
                    </div>
                </div>
            `,t.appendChild(r),r.querySelector(`.delete-card-btn`).addEventListener(`click`,e=>{e.preventDefault(),this.deleteRuler(n)}),r.querySelector(`.view-details`).addEventListener(`click`,t=>{t.preventDefault();let n=this.fullRulersData.findIndex(t=>t.name===e.name&&t.start===e.start);this.openRulerPage(n)})}))}openRulerPage(e){s(()=>import(`./principalities-CGt0babY.js`).then(t=>{let n=t.ProductPagePrincipalities;new n(this.parent,e).render()}),[]).catch(e=>{console.error(`Ошибка загрузки страницы:`,e),alert(`Не удалось открыть страницу с подробностями`)})}}}));export{t as a,n as i,u as n,e as o,r,l as t};
// pages_principalities/main_principalities/principalities.js

import { CarouselComponentPrincipalities } from "../../components_principalities/carousel_principalities/principalities.js";
import { Qualitative_difference_principalities, Polindrom_principalities } from "../../functions_principalities/functions_principalities.js";
import { rulersData } from "../../data_principalities/principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
        this.fullRulersData = rulersData; // полные данные
    }

    // Метод для функций анализа - возвращает только имена и годы
    getRulersData() {
        return this.fullRulersData.map(ruler => ({
            name: ruler.name,
            start: ruler.start,
            end: ruler.end
        }));
    }

    // Первая функция - качественная разница
    useFirstFunction() { 
        const rulers = this.getRulersData();
        const allYears = [];
        
        rulers.forEach(ruler => {
            allYears.push(ruler.start);
            allYears.push(ruler.end);
        });
        
        const result = Qualitative_difference_principalities(allYears);
        
        const sortedYears = [...allYears].sort((a, b) => a - b);
        const min1 = sortedYears[0];
        const min2 = sortedYears[1];
        const max1 = sortedYears[sortedYears.length - 1];
        const max2 = sortedYears[sortedYears.length - 2];
        
        const outputDiv = document.getElementById('first-function-output_principalities');
        outputDiv.innerHTML = ` 
            <div class="p-3 bg-light">
                <p>Всего годов: ${allYears.length}</p>
                <p>Самые маленькие годы: ${min1} и ${min2}</p>
                <p>Самые большие годы: ${max1} и ${max2}</p>
                <p>Результат: (${max1} * ${max2}) - (${min1} * ${min2}) = ${result}</p>
            </div>
        `;
    }

    // Вторая функция - проверка конкретного года
    useSecondFunction() {
        const yearInput = document.getElementById('year-input_principalities').value;
        
        if (!yearInput) {
            alert('Введите год');
            return;
        }
        
        const isPalindrom = Polindrom_principalities(yearInput);
        
        const rulers = this.getRulersData();
        const foundRuler = rulers.find(r => 
            r.start.toString() === yearInput || r.end.toString() === yearInput
        );
        
        const outputDiv = document.getElementById('second-function-output_principalities');
        
        let message = `<div class="p-3 bg-light">`;
        message += `<p>Год ${yearInput} - ${isPalindrom ? 'является' : 'не является'} палиндромом</p>`;
        
        if (foundRuler) {
            const yearType = foundRuler.start === parseInt(yearInput) ? 'начала' : 'окончания';
            message += `<p>Этот год ${yearType} правления у ${foundRuler.name}</p>`;
        }
        
        message += `</div>`;
        outputDiv.innerHTML = message;
    }

    // Третья функция - поиск князей с годами-палиндромами
    useThirdFunction() {
        const rulers = this.getRulersData();
        
        const rulersWithPalindrom = rulers.filter(ruler => 
            Polindrom_principalities(ruler.start.toString()) || 
            Polindrom_principalities(ruler.end.toString())
        );
        
        const outputDiv = document.getElementById('third-function-output_principalities');
        
        if (rulersWithPalindrom.length === 0) {
            outputDiv.innerHTML = `<div class="p-3 bg-light">Князья с годами-палиндромами не найдены</div>`;
            return;
        }
        
        let html = `<div class="p-3 bg-light">`;
        
        rulersWithPalindrom.forEach(ruler => {
            const startIsPal = Polindrom_principalities(ruler.start.toString());
            const endIsPal = Polindrom_principalities(ruler.end.toString());
            
            html += `<div class="mb-3 p-2 border">`;
            html += `<p><b>${ruler.name}</b> (${ruler.start}-${ruler.end})</p>`;
            
            if (startIsPal) {
                html += `<p>Год начала ${ruler.start} - палиндром</p>`;
            }
            if (endIsPal) {
                html += `<p>Год окончания ${ruler.end} - палиндром</p>`;
            }
            
            html += `</div>`;
        });
        
        html += `</div>`;
        outputDiv.innerHTML = html;
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Правители Московского княжества</h1>
                
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-success" id="add-ruler-btn_principalities">
                            + Добавить князя
                        </button>
                    </div>
                </div>

                <div id="carousel-container"></div>
                
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-danger text-white">
                                <h3>Исторический анализ периодов правления</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="border p-3">
                                            <h5>Качественная разница</h5>
                                            <p class="text-muted small">Анализ всех годов правления</p>
                                            <button class="btn btn-danger mb-3" id="first-function-btn_principalities">
                                                Применить
                                            </button>
                                            <div id="first-function-output_principalities"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-4">
                                        <div class="border p-3">
                                            <h5>Проверка года</h5>
                                            <p class="text-muted small">Введите год для проверки на палиндром</p>
                                            <input type="text" class="form-control mb-2" id="year-input_principalities" placeholder="например 1221">
                                            <button class="btn btn-danger mb-3" id="second-function-btn_principalities">
                                                Проверить
                                            </button>
                                            <div id="second-function-output_principalities"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-4">
                                        <div class="border p-3">
                                            <h5>Поиск по палиндромам</h5>
                                            <p class="text-muted small">Найти князей с годами-палиндромами</p>
                                            <button class="btn btn-danger mb-3" id="third-function-btn_principalities">
                                                Найти
                                            </button>
                                            <div id="third-function-output_principalities"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const carouselContainer = document.getElementById('carousel-container');
        const carousel = new CarouselComponentPrincipalities(carouselContainer, this.fullRulersData);
        carousel.render();
        
        // Кнопка добавления
        document.getElementById('add-ruler-btn_principalities').addEventListener('click', () => {
            carousel.addRuler();
        });

        document.addEventListener('ruler-click', (event) => {
            const rulerIndex = event.detail.rulerIndex;
            this.openRulerPage(rulerIndex);
        });
        
        // обработчики на кнопки
        document.getElementById('first-function-btn_principalities').addEventListener('click', () => this.useFirstFunction());
        document.getElementById('second-function-btn_principalities').addEventListener('click', () => this.useSecondFunction());
        document.getElementById('third-function-btn_principalities').addEventListener('click', () => this.useThirdFunction());
    }

    // Метод для открытия страницы с князем
    openRulerPage(index) {
        import('../../pages_principalities/product_principalities/principalities.js').then(module => {
            const ProductPagePrincipalities = module.ProductPagePrincipalities;
            const productPage = new ProductPagePrincipalities(this.parent, index);
            productPage.render();
        });
    }
}
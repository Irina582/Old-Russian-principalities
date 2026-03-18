import { CarouselComponentPrincipalities } from "../../components_principalities/carousel_principalities/principalities.js";
import { Qualitative_difference_principalities, Polindrom_principalities } from "../../functions_principalities/functions_principalities.js";

export class MainPagePrincipalities {
    constructor(parent) {
        this.parent = parent;
    }

    getRulersData() { // метод, вернёт мне массив с датами
        return [
            { name: "Даниил Александрович", start: 1221, end: 1303 },
            { name: "Юрий Данилович", start: 1303, end: 1325 },
            { name: "Иван I Данилович Калита", start: 1325, end: 1340 },
            { name: "Семён Иванович Гордый", start: 1340, end: 1353 },
            { name: "Иван II Иванович Красный", start: 1353, end: 1359 },
            { name: "Дмитрий Иванович Донской", start: 1359, end: 1389 },
            { name: "Василий I Дмитриевич", start: 1389, end: 1425 },
            { name: "Василий II Васильевич Тёмный", start: 1425, end: 1433 },
            { name: "Юрий Дмитриевич", start: 1433, end: 1433 },
            { name: "Дмитрий Юрьевич Шемяка", start: 1441, end: 1447 }
        ];
    }

    // Первая функция - качественная разница
    useFirstFunction() { 
        const rulers = this.getRulersData(); // массив князей с началами и окончаниями
        const allYears = []; // массив годов
        
        rulers.forEach(ruler => { // проходим по каждому князю,добавляем его год начала и окончания в массив годов
            allYears.push(ruler.start);
            allYears.push(ruler.end);
        });
        
        const result = Qualitative_difference_principalities(allYears);
        
        const sortedYears = [...allYears].sort((a, b) => a - b);
        const min1 = sortedYears[0];
        const min2 = sortedYears[1];
        const max1 = sortedYears[sortedYears.length - 1];
        const max2 = sortedYears[sortedYears.length - 2];
        
        const outputDiv = document.getElementById('first-function-output_principalities'); // ищу div куда выводить результат
        outputDiv.innerHTML = ` 
            <div class="p-3 bg-light">
                <p>Всего годов: ${allYears.length}</p>
                <p>Самые маленькие годы: ${min1} и ${min2}</p>
                <p>Самые большие годы: ${max1} и ${max2}</p>
                <p>Результат: (${max1} * ${max2}) - (${min1} * ${min2}) = ${result}</p>
            </div>
        `; // вставила html с результатами
    }

    // Вторая функция - проверка конкретного года
    useSecondFunction() {
        const yearInput = document.getElementById('year-input_principalities').value;
        
        if (!yearInput) { // если год не ввели
            alert('Введите год');
            return;
        }
        
        const isPalindrom = Polindrom_principalities(yearInput);
        
        const rulers = this.getRulersData(); // получаю список князей с началами и окончаниями
        const foundRuler = rulers.find(r => 
            r.start.toString() === yearInput || r.end.toString() === yearInput
        ); // ищу князя, у которого такой либо год начала либо год окончания
        
        const outputDiv = document.getElementById('second-function-output_principalities'); // div для вывода
        
        // формирую сообщение
        let message = `<div class="p-3 bg-light">`;
        message += `<p>Год ${yearInput} - ${isPalindrom ? 'является' : 'не является'} палиндромом</p>`;
        
        if (foundRuler) {
            const yearType = foundRuler.start === parseInt(yearInput) ? 'начала' : 'окончания';
            message += `<p>Этот год ${yearType} правления у ${foundRuler.name}</p>`;
        }
        
        message += `</div>`;
        outputDiv.innerHTML = message; // вывожу сообщение
    }

    // Третья функция - поиск князей с годами-палиндромами
    useThirdFunction() { // метод вызывается при нажатии на 3-ю кнопку "Найти"
        const rulers = this.getRulersData(); // опять массив с князьями и годами
        
        const rulersWithPalindrom = rulers.filter(ruler => 
            Polindrom_principalities(ruler.start.toString()) || 
            Polindrom_principalities(ruler.end.toString())
        ); // находим князей у которых какой-либо год полиндром
        
        const outputDiv = document.getElementById('third-function-output_principalities'); // div для вывода
        
        if (rulersWithPalindrom.length === 0) {
            outputDiv.innerHTML = `<div class="p-3 bg-light">Князья с годами-палиндромами не найдены</div>`;
            return;
        }
        
        let html = `<div class="p-3 bg-light">`; // создаём переменную html в которую будем собирать текст
        
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
        this.parent.innerHTML = ''; // очищаю родительский элемент
        
        const html = `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Правители Московского княжества</h1>
                
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
        
        this.parent.insertAdjacentHTML('beforeend', html); // вставляю этот элемент на страницу
        
        const carouselContainer = document.getElementById('carousel-container');
        const carousel = new CarouselComponentPrincipalities(carouselContainer);
        carousel.render(); // создаю карусель
        
        // Навешиваю обработчики на кнопки
        document.getElementById('first-function-btn_principalities').addEventListener('click', () => this.useFirstFunction());
        document.getElementById('second-function-btn_principalities').addEventListener('click', () => this.useSecondFunction());
        document.getElementById('third-function-btn_principalities').addEventListener('click', () => this.useThirdFunction());
    }
}
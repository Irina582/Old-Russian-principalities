window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let aPrincipalities = ''           // Первое число
    let bPrincipalities = ''           // Второе число
    let expressionResultPrincipalities = ''  // Результат вычисления
    let selectedOperationPrincipalities = null  // Выбранная операция

        // Получаем доступ к экрану калькулятора в поле вывода
    const outputElementPrincipalities = document.getElementById("result-principalities")

        // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtonsPrincipalities = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClickedPrincipalities(digitPrincipalities) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperationPrincipalities) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digitPrincipalities != '.') || (digitPrincipalities == '.' && !aPrincipalities.includes(digitPrincipalities))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                aPrincipalities += digitPrincipalities;
            }
            outputElementPrincipalities.innerHTML = aPrincipalities;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digitPrincipalities != '.') || (digitPrincipalities == '.' && !bPrincipalities.includes(digitPrincipalities))) { 
                bPrincipalities += digitPrincipalities;
                outputElementPrincipalities.innerHTML = bPrincipalities;        
            }
        }
    }
        // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtonsPrincipalities.forEach(buttonPrincipalities => {
        buttonPrincipalities.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValuePrincipalities = buttonPrincipalities.innerHTML;
            onDigitButtonClickedPrincipalities(digitValuePrincipalities);
        }
    });

        // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult-principalities").onclick = function() { 
        if (aPrincipalities === '') return;
        selectedOperationPrincipalities = 'x';
    }
    document.getElementById("btn_op_plus-principalities").onclick = function() { 
    if (aPrincipalities === '') return;
    if (selectedOperationPrincipalities !== null && bPrincipalities !== '') {
        let tempResultPrincipalities;
        // Считаем в зависимости от того, какая операция была выбрана раньше
        if (selectedOperationPrincipalities === '+') {
            tempResultPrincipalities = (+aPrincipalities) + (+bPrincipalities);
        } else if (selectedOperationPrincipalities === '-') {
            tempResultPrincipalities = (+aPrincipalities) - (+bPrincipalities);
        } else if (selectedOperationPrincipalities === 'x') {
            tempResultPrincipalities = (+aPrincipalities) * (+bPrincipalities);
        } else if (selectedOperationPrincipalities === '/') {
            tempResultPrincipalities = (+aPrincipalities) / (+bPrincipalities);
        }
        
        // Результат становится первым числом
        aPrincipalities = tempResultPrincipalities.toString();
        bPrincipalities = '';
        outputElementPrincipalities.innerHTML = aPrincipalities;
    }
    
    // Запоминаем, что теперь выбрано сложение
    selectedOperationPrincipalities = '+';
}
    document.getElementById("btn_op_minus-principalities").onclick = function() { 
        if (aPrincipalities === '') return;
        selectedOperationPrincipalities = '-';
    }
    document.getElementById("btn_op_div-principalities").onclick = function() { 
        if (aPrincipalities === '') return;
        selectedOperationPrincipalities = '/';
    }

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear-principalities").onclick = function() { 
        aPrincipalities = ''
        bPrincipalities = ''
        selectedOperationPrincipalities = null
        expressionResultPrincipalities = ''
        outputElementPrincipalities.innerHTML = 0
    }

        // Кнопка смены знака 
    document.getElementById("btn_op_sign-principalities").onclick = function(){
        if (selectedOperationPrincipalities === null) {
            aPrincipalities = -aPrincipalities;
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            if (bPrincipalities!==''){
                bPrincipalities = -bPrincipalities;
                outputElementPrincipalities.innerHTML = bPrincipalities;
            }
        }
    }

        // Кнопка вычисления процента
    document.getElementById("btn_op_percent-principalities").onclick = function(){
        if (selectedOperationPrincipalities === null){
            aPrincipalities = aPrincipalities/100;
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            bPrincipalities = bPrincipalities/100;
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Кнопка backspace

        document.getElementById("btn_op_backspace-principalities").onclick = function(){
        if (selectedOperationPrincipalities === null){
            aPrincipalities = outputElementPrincipalities.innerHTML
            if (aPrincipalities.length === 2 && aPrincipalities[0] === '-'){
                aPrincipalities = ''
                outputElementPrincipalities.innerHTML = 0
            }
            if(aPrincipalities.length > 1 && aPrincipalities !== ''){
                aPrincipalities = aPrincipalities.slice(0, aPrincipalities.length-1)
                outputElementPrincipalities.innerHTML = aPrincipalities
            }
            else{
                aPrincipalities = ''
                outputElementPrincipalities.innerHTML = 0
            }
        }
        else{
            bPrincipalities = outputElementPrincipalities.innerHTML
            if (bPrincipalities.length === 2 && bPrincipalities[0] === '-'){
                bPrincipalities = ''
                outputElementPrincipalities.innerHTML = 0
            }
            if (bPrincipalities.length > 1 && bPrincipalities !== ''){
                bPrincipalities = bPrincipalities.slice(0, bPrincipalities.length-1)
                outputElementPrincipalities.innerHTML = bPrincipalities
            }
            else{
                bPrincipalities = ''
                outputElementPrincipalities.innerHTML = 0
            }
        }
    }

        // Кнопка смены фона страницы
    document.getElementById("btn_op_color-principalities").onclick = function() {
        if (document.body.style.backgroundColor === 'white' || document.body.style.backgroundColor === '') {
            document.body.style.backgroundColor = 'lightgreen';
        } 
        else {
            document.body.style.backgroundColor = 'white';
        }
    }

       // Кнопка смены цвета поля с результатом
    document.getElementById("btn_op_rescolor-principalities").onclick = function() {
        if (document.getElementById("result-principalities").style.backgroundColor === 'rgb(56, 57, 61)' || document.getElementById("result-principalities").style.backgroundColor === '') {
            document.getElementById("result-principalities").style.backgroundColor = 'rgb(237, 35, 36)';
        } 
        else {
            document.getElementById("result-principalities").style.backgroundColor = 'rgb(56, 57, 61)';
        }
    }
    
        // Кнопка смены темы
    document.getElementById("btn_op_theme-principalities").onclick = function() {
        if (document.getElementsByClassName("main-principalities")[0].style.backgroundColor === 'white' ||
         document.getElementsByClassName("main-principalities")[0].style.backgroundColor === '') {
            document.getElementsByClassName("main-principalities")[0].style.backgroundColor = 'rgb(18, 18, 18)';
        } 
        else {
            document.getElementsByClassName("main-principalities")[0].style.backgroundColor = 'white';
        }
    }

        // Кнопка вычисления квадратного корня
    document.getElementById("btn_op_sqrt-principalities").onclick = function() {
        if (selectedOperationPrincipalities === null){
            aPrincipalities = aPrincipalities**0.5;
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            bPrincipalities = bPrincipalities**0.5;
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Кнопка для возведения в квадрат
    document.getElementById("btn_op_square-principalities").onclick = function() {
        if (selectedOperationPrincipalities === null){
            aPrincipalities = aPrincipalities**2;
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            bPrincipalities = bPrincipalities**2;
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Кнопка для вычисления факториала
     document.getElementById("btn_op_factorial-principalities").onclick = function() {
        let summaPrincipalities = 1;
        if (selectedOperationPrincipalities === null){
            for (let i=1; i<=+aPrincipalities; i++){
                summaPrincipalities *= i;
            }
            aPrincipalities = summaPrincipalities;
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            for (let i=1; i<=bPrincipalities;i++){
                summaPrincipalities*=i;
            }
            bPrincipalities = summaPrincipalities;
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Кнопка для добавления 000
    document.getElementById("btn_digit_000-principalities").onclick = function() {
        if (selectedOperationPrincipalities === null){
            aPrincipalities = aPrincipalities+='000';
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            bPrincipalities = bPrincipalities+='000';
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Модуль числа
    document.getElementById("btn_op_modul-principalities").onclick = function() {
        if (selectedOperationPrincipalities === null){
            if (aPrincipalities<0){
                aPrincipalities = aPrincipalities*(-1);
            }
            else{
                aPrincipalities = aPrincipalities;
            }
            outputElementPrincipalities.innerHTML = aPrincipalities;
        }
        else{
            if (bPrincipalities<0){
                bPrincipalities = bPrincipalities*(-1);
            }
            else{
                bPrincipalities = bPrincipalities;
            }
            outputElementPrincipalities.innerHTML = bPrincipalities;
        }
    }

        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal-principalities").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (aPrincipalities === '' || bPrincipalities === '' || !selectedOperationPrincipalities)
            return
            
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperationPrincipalities) { 
            case 'x':
                expressionResultPrincipalities = (+aPrincipalities) * (+bPrincipalities)
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                expressionResultPrincipalities = (+aPrincipalities) + (+bPrincipalities)
                break;
            case '-':
                expressionResultPrincipalities = (+aPrincipalities) - (+bPrincipalities)
                break;
            case '/':
                expressionResultPrincipalities = (+aPrincipalities) / (+bPrincipalities)
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        aPrincipalities = expressionResultPrincipalities.toString()
        bPrincipalities = ''
        selectedOperationPrincipalities = null

        // Показываем результат на экране
        outputElementPrincipalities.innerHTML = aPrincipalities
    }
    
    // Перевод даты из григорианского календаря в юлианский
    document.getElementById("btn_date_convert-principalities").onclick = function() {
        let inputDate = outputElementPrincipalities.innerHTML;
        
        // в формате 8 цифр
        if (inputDate.length === 8 && !isNaN(inputDate)) {
            let day = parseInt(inputDate.substring(0, 2));
            let month = parseInt(inputDate.substring(2, 4));
            let year = parseInt(inputDate.substring(4, 8));
            
            if (year <= 1600) {
                outputElementPrincipalities.innerHTML = "Год должен быть > 1600";
                return;
            }
            if (month > 12 || month === 0){
                outputElementPrincipalities.innerHTML = "Месяц должен быть <= 12 и больше 0";
                return;
            }
            if (day === 0 || day > 31) {
                outputElementPrincipalities.innerHTML = "Введите корректную дату";
                return;
            }
            
            // Разница для 1900> годов
            let difference = 13;
            
            // Разница для всех периодов
            if (year < 1700) difference = 10;
            else if (year < 1800) difference = 11;
            else if (year < 1900) difference = 12;
            else if (year < 2100) difference = 13;
            
            // Рассчитываем юлианскую дату
            let julianDay = day - difference;
            let julianMonth = month;
            let julianYear = year;
            
            // Если день стал <= 0, переходим на предыдущий месяц
            if (julianDay <= 0) {
                julianMonth--;
                if (julianMonth < 1) {
                    julianMonth = 12;
                    julianYear--;
                }
                
                // Получаем последний день предыдущего месяца
                let lastDayPrevMonth = new Date(julianYear, julianMonth, 0).getDate();
                julianDay = lastDayPrevMonth + julianDay;
            }
            
            let resultDay = julianDay.toString().padStart(2, '0');
            let resultMonth = julianMonth.toString().padStart(2, '0');
            let resultYear = julianYear.toString();
            
            outputElementPrincipalities.innerHTML = `${resultDay}${resultMonth}${resultYear}`;
        } 
        else {
            outputElementPrincipalities.innerHTML = "ДДММГГГГ";
        }
    }
};
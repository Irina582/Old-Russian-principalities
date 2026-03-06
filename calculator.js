window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция

        // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

        // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }
        // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

        // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return;
    if (selectedOperation !== null && b !== '') {
        let tempResult;
        // Считаем в зависимости от того, какая операция была выбрана раньше
        if (selectedOperation === '+') {
            tempResult = (+a) + (+b);
        } else if (selectedOperation === '-') {
            tempResult = (+a) - (+b);
        } else if (selectedOperation === 'x') {
            tempResult = (+a) * (+b);
        } else if (selectedOperation === '/') {
            tempResult = (+a) / (+b);
        }
        
        // Результат становится первым числом
        a = tempResult.toString();
        b = '';
        outputElement.innerHTML = a;
    }
    
    // Запоминаем, что теперь выбрано сложение
    selectedOperation = '+';
}
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

        // Кнопка смены знака 
    document.getElementById("btn_op_sign").onclick = function(){
        if (selectedOperation === null) {
            a = -a;
            outputElement.innerHTML = a;
        }
        else{
            if (b!==''){
                b = -b;
                outputElement.innerHTML = b;
            }
        }
    }

        // Кнопка вычисления процента
    document.getElementById("btn_op_percent").onclick = function(){
        if (selectedOperation === null){
            a = a/100;
            outputElement.innerHTML = a;
        }
        else{
            b = b/100;
            outputElement.innerHTML = b;
        }
    }

        // Кнопка backspace

        document.getElementById("btn_op_backspace").onclick = function(){
        if (selectedOperation === null){
            a = outputElement.innerHTML
            if (a.length === 2 && a[0] === '-'){
                a = ''
                outputElement.innerHTML = 0
            }
            if(a.length > 1 && a !== ''){
                a = a.slice(0, a.length-1)
                outputElement.innerHTML = a
            }
            else{
                a = ''
                outputElement.innerHTML = 0
            }
        }
        else{
            b = outputElement.innerHTML
            if (b.length === 2 && b[0] === '-'){
                b = ''
                outputElement.innerHTML = 0
            }
            if (b.length > 1 && b !== ''){
                b = b.slice(0, b.length-1)
                outputElement.innerHTML = b
            }
            else{
                b = ''
                outputElement.innerHTML = 0
            }
        }
    }

        // Кнопка смены фона страницы
    document.getElementById("btn_op_color").onclick = function() {
        if (document.body.style.backgroundColor === 'white' || document.body.style.backgroundColor === '') {
            document.body.style.backgroundColor = 'lightgreen';
        } 
        else {
            document.body.style.backgroundColor = 'white';
        }
    }

       // Кнопка смены цвета поля с результатом
    document.getElementById("btn_op_rescolor").onclick = function() {
        if (document.getElementById("result").style.backgroundColor === 'rgb(56, 57, 61)' || document.getElementById("result").style.backgroundColor === '') {
            document.getElementById("result").style.backgroundColor = 'rgb(237, 35, 36)';
        } 
        else {
            document.getElementById("result").style.backgroundColor = 'rgb(56, 57, 61)';
        }
    }
    
        // Кнопка смены темы
    document.getElementById("btn_op_theme").onclick = function() {
        if (document.getElementsByClassName("main")[0].style.backgroundColor === 'white' ||
         document.getElementsByClassName("main")[0].style.backgroundColor === '') {
            document.getElementsByClassName("main")[0].style.backgroundColor = 'rgb(18, 18, 18)';
        } 
        else {
            document.getElementsByClassName("main")[0].style.backgroundColor = 'white';
        }
    }

        // Кнопка вычисления квадратного корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (selectedOperation === null){
            a = a**0.5;
            outputElement.innerHTML = a;
        }
        else{
            b = b**0.5;
            outputElement.innerHTML = b;
        }
    }

        // Кнопка для возведения в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (selectedOperation === null){
            a = a**2;
            outputElement.innerHTML = a;
        }
        else{
            b = b**2;
            outputElement.innerHTML = b;
        }
    }

        // Кнопка для вычисления факториала
     document.getElementById("btn_op_factorial").onclick = function() {
        let summa = 1;
        if (selectedOperation === null){
            for (let i=1; i<=+a; i++){
                summa *= i;
            }
            a = summa;
            outputElement.innerHTML = a;
        }
        else{
            for (let i=1; i<=b;i++){
                summa*=i;
            }
            b = summa;
            outputElement.innerHTML = b;
        }
    }

        // Кнопка для добавления 000
    document.getElementById("btn_digit_000").onclick = function() {
        if (selectedOperation === null){
            a = a+='000';
            outputElement.innerHTML = a;
        }
        else{
            b = b+='000';
            outputElement.innerHTML = b;
        }
    }

        // Модуль числа
    document.getElementById("btn_op_modul").onclick = function() {
        if (selectedOperation === null){
            if (a<0){
                a = a*(-1);
            }
            else{
                a = a;
            }
            outputElement.innerHTML = a;
        }
        else{
            if (b<0){
                b = b*(-1);
            }
            else{
                b = b;
            }
            outputElement.innerHTML = b;
        }
    }

        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return
            
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        // Показываем результат на экране
        outputElement.innerHTML = a
    }
};
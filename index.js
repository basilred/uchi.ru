/**
 * Возвращает объект двух чисел a и b
 * @returns {Object} объект с двумя слагаемыми
 */
var getAddends = function() {
    var a = Math.floor(Math.random() * 4) + 6;
    var b;
    do {
        b = Math.floor(Math.random() * 6) + 2;
    } while (((a + b) < 11) || ((a + b) > 14));

    return { a: a, b: b };
}

/**
 * Переменная хранит текущий объект слагаемых
 * @type {Object}
 */
var globalAddends;


var setAddendsToPage = function() {
    var addend1 = document.getElementsByClassName('addend1')[0];
    var addend2 = document.getElementsByClassName('addend2')[0];

    addend1.innerHTML = globalAddends.a;
    addend2.innerHTML = globalAddends.b;
}

var checkInput = function(event) {
    // console.log(arguments);
    console.dir(Number(event.key));
    if (Number(event.key) !== globalAddends.a) {
        // 4. Если ввод неправильный, то устанавливаем первому слагаемому красный фон
        console.log('Не то число!');
    } else {
        // 5. Правильный ввод — рисуем вторую стрелку
        console.log('Угадал');
        showSecondArrow();
    }
}

var setupArrows = function() {
    document.removeEventListener('keyup', checkInput);
    // 1. Вычисляем ширину стрелки
    var firstArrowWidth = globalAddends.a * 39;
    var secondArrowWidth = globalAddends.b * 39;

    // 2. Устанавливаем ширину для блока стрелки в соотношении с линейкой
    var arrows = document.getElementsByClassName('arrow');
    arrows[0].style.width = firstArrowWidth + 'px';
    arrows[1].style.width = secondArrowWidth + 'px';
    arrows[1].style.left = firstArrowWidth + 35 + 'px';

    // input = document.querySelector('.number1');
    // input.focus();

    // 3. Слушаем ввод числа для инпута над стрелкой
    document.addEventListener('keyup', checkInput);
}

var setNewAddends = function() {
    globalAddends = getAddends();
    setAddendsToPage();
    setupArrows();
}

var wideArrow = function() {
    var arrow = document.getElementsByClassName('arrow')[0];
    arrow.classList.toggle('wider');
}

setNewAddends();

var app = document.getElementById('app');
app.addEventListener('click', function() {
    console.log('app click');
});

var newBtn = document.getElementsByClassName('btn-add')[0];
newBtn.addEventListener('click', setNewAddends);

var wider = document.getElementsByClassName('btn-wide')[0];
wider.addEventListener('click', wideArrow);

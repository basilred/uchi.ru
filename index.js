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

/**
 * Добавляет на страницу слагаемые
 */
var setAddendsToPage = function() {
    var addend1 = document.getElementsByClassName('addend1')[0];
    var addend2 = document.getElementsByClassName('addend2')[0];

    addend1.innerHTML = globalAddends.a;
    addend2.innerHTML = globalAddends.b;
}


var stages, currentStage;

/**
 * Возвращает объект, в котором хранятся объекты с необходимым для каждой стадии
 * выполнения проверки вводимых згачений.
 * @returns {Object} объект с описанием каждой стадии
 */
var getStages = function() {
    return {
        0: {
            value: globalAddends.a,
            arrow: document.querySelector('.arrow1'),
            input: document.querySelector('.input1'),
            ref: document.querySelector('.addend1'),
        },
        1: {
            value: globalAddends.b,
            arrow: document.querySelector('.arrow2'),
            input: document.querySelector('.input2'),
            ref: document.querySelector('.addend2'),
        },
        2: {
            value: globalAddends.a,
            arrow: document.getElementsByClassName('arrow')[0]
        },
        3: {
            value: globalAddends.b,
            arrow: document.getElementsByClassName('arrow')[1]
        },
    };
}

/**
 * Основной цикл проверки вводимых значений и перехода между этапами
 * @param   {[type]} event [description]
 * @returns {[type]}       [description]
 */
var checkInput = function(event) {
    var inputKey = Number(event.key);
    inputKey && (stages[currentStage].input.value = inputKey);
    stages[currentStage].ref.classList.remove('invalid');

    if (inputKey !== stages[currentStage].value) {
        // 4. Если ввод неправильный, то устанавливаем первому слагаемому красный фон
        console.log('Не то число!');
        stages[currentStage].ref.classList.add('invalid');
    } else {
        // 5. Правильный ввод — рисуем вторую стрелку
        console.log('Угадал');
        // showSecondArrow();
        currentStage += 1;
        if (currentStage === 1) showSecondArrow();
    }
}

var showSecondArrow = function() {
    stages[1].arrow.classList.remove('invisible');
}

var hideSecondArrow = function() {
    stages[1].arrow.classList.add('invisible');
}

/**
 * Настройка размеров стрелок
 */
var setupArrows = function() {
    // document.removeEventListener('keyup', checkInput);
    // 1. Вычисляем ширину стрелки
    var firstArrowWidth = globalAddends.a * 39;
    var secondArrowWidth = globalAddends.b * 39;

    // 2. Устанавливаем ширину для блока стрелки в соотношении с линейкой
    var arrows = document.getElementsByClassName('arrow');
    arrows[0].style.width = firstArrowWidth + 'px';
    arrows[1].style.width = secondArrowWidth + 'px';
    arrows[1].style.left = firstArrowWidth + 35 + 'px';

    stages[0].input.value = '';
    stages[1].input.value = '';

    hideSecondArrow();

    // input = document.querySelector('.number1');
    // input.focus();

    // 3. Слушаем ввод числа для инпута над стрелкой
    // document.addEventListener('keyup', checkInput);
    // stage1();
}

var setNewAddends = function() {
    globalAddends = getAddends();
    stages = getStages();
    currentStage = 0;
    setAddendsToPage();
    setupArrows();
}

setNewAddends();

var app = document.getElementById('app');
app.addEventListener('click', function() {
    console.log('app click');
});

var newBtn = document.getElementsByClassName('btn-add')[0];
newBtn.addEventListener('click', setNewAddends);

document.addEventListener('keyup', checkInput);

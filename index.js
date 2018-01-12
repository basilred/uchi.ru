/**
 * Переменная хранит текущий объект слагаемых
 * @type {Object}
 */
var globalAddends;
var stages, currentStage;

/**
 * Генерирует два слагаемых a и b по следующим правилам:
 * a ∈ [6, 9], a + b ∈ [11, 14]
 *
 * @returns {Object} объект с двумя слагаемыми
 */
function getAddends() {
    var a = Math.floor(Math.random() * 4) + 6;
    var b;

    do {
        b = Math.floor(Math.random() * 6) + 2;
    } while (((a + b) < 11) || ((a + b) > 14));

    return { a: a, b: b };
}

/**
 * Добавляет на страницу слагаемые
 */
function setAddendsToPage() {
    var addend1 = document.getElementsByClassName('addend1')[0];
    var addend2 = document.getElementsByClassName('addend2')[0];

    addend1.innerHTML = globalAddends.a;
    addend2.innerHTML = globalAddends.b;
}

/**
 * Генерирует объект стадий выполнения программы, в каждой стадии хранится
 * значение для сравнения, стрелка, инпут и ref — ссылка на слагаемое,
 *
 * @returns {Object} объект с описанием каждой стадии
 */
function getStages() {
    var combinedValue = String(globalAddends.a + globalAddends.b);
    var answer = document.querySelector('.answer');

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
            value: combinedValue[0],
            input: answer,
            ref: answer,
        },
        3: {
            value: combinedValue[1],
            input: answer,
            ref: answer,
        },
    };
}

/**
 * Основной цикл проверки вводимых значений и перехода между этапами
 */
function checkInput(event) {
    var inputKey = Number(event.key);
    var stage = stages[currentStage];

    if (currentStage >= 2) {
        correctInput(inputKey, stage);
    } else {
        inputKey && (stage.input.value = inputKey);
    }

    stage.ref && stage.ref.classList.remove('invalid');
    stage.input && stage.input.classList.remove('makered');

    if (inputKey != stage.value) {
        // если ввод неправильный, то устанавливаем первому слагаемому
        // желтый фон и красный цвет шрифта для инпутов
        stage.ref.classList.add('invalid');
        stage.input.classList.add('makered');
    } else {
        // правильный ввод
        if (currentStage !== 2) {
            stage.input.classList.add('correct');
            stage.input.disabled = true;
        }
        currentStage += 1;

        if (currentStage === 1) showSecondArrow();
        if (currentStage === 2) showAnswerInput();
    }
}

/**
 * Корректирует вводимое значение в инпут суммы слагаемых
 * @param   {Number} inputKey введенное с клавиатуры значение
 * @param   {Object} stage    объект текущей стадии выполнения программы
 */
function correctInput(inputKey, stage) {
    var inputLength = stage.input.value.length;

    if (inputKey === NaN) return;

    // в инпуте пусто, можно ввдить допустимое значение
    if (inputLength === 0) {
        stage.input.value = inputKey;
        return;
    }

    // в инпуте одна цифра, неверная, нужно заменить текущей
    if (inputLength === 1) {
        if (stage.input.classList.contains('makered')) {
            stage.input.value = inputKey;
            return;
        } else {
            // в инпуте одна цифра, верная, можно вводить следующее значение
            stage.input.value += inputKey;
            return;
        }
    }

    // в инпуте две цифры, вторая неверная, нужно заменить текущей
    if (inputLength === 2) {
        if (stage.input.classList.contains('makered')) {
            stage.input.value = stage.input.value[0] + inputKey;
            return;
        }
    }
}

function showAnswerInput() {
    document.querySelector('.expression').classList.add('show');
}

function showSecondArrow() {
    stages[1].arrow.classList.remove('invisible');
}

function hideSecondArrow() {
    stages[1].arrow.classList.add('invisible');
}

/**
 * Настройка размеров стрелок
 */
function setupArrows() {
    // Вычисляем ширину стрелки
    var firstArrowWidth = globalAddends.a * 39;
    var secondArrowWidth = globalAddends.b * 39;

    // Устанавливаем ширину для блока стрелки в соотношении с линейкой
    var arrows = document.getElementsByClassName('arrow');
    arrows[0].style.width = firstArrowWidth + 'px';
    arrows[1].style.width = secondArrowWidth + 'px';
    arrows[1].style.left = firstArrowWidth + 35 + 'px';

    // Очищаем значения в инпутах
    stages[0].input.value = '';
    stages[1].input.value = '';

    hideSecondArrow();
}

function setNewAddends() {
    globalAddends = getAddends();
    stages = getStages();
    currentStage = 0;
    setAddendsToPage();
    setupArrows();
}

setNewAddends();

document.addEventListener('keyup', checkInput);

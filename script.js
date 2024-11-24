const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentOperation = '';
let firstOperand = null;
let waitingForSecondOperand = false;
let decimal = false;

function clear() {
    display.textContent = '0';
    currentOperation = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    decimal = false;
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        display.textContent = digit;
        waitingForSecondOperand = false;
    } else {
        display.textContent = display.textContent === '0' ? digit : display.textContent + digit;
    }
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        display.textContent = '0.';
        waitingForSecondOperand = false;
        decimal = true;
        return;
    }

    if (!decimal) {
        display.textContent += '.';
        decimal = true;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.textContent);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (currentOperation) {
        const result = calculate(firstOperand, inputValue, currentOperation);
        display.textContent = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperation = nextOperator;
    decimal = false;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '×':
            return firstOperand * secondOperand;
        case '÷':
            return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        default:
            return secondOperand;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        } else if (button.classList.contains('equals')) {
            if (currentOperation && firstOperand !== null) {
                const result = calculate(firstOperand, parseFloat(display.textContent), currentOperation);
                display.textContent = String(result);
                firstOperand = null;
                currentOperation = '';
                waitingForSecondOperand = false;
                decimal = result % 1 !== 0;
            }
        } else if (button.textContent === '.') {
            inputDecimal();
        } else {
            inputDigit(button.textContent);
        }
    });
});
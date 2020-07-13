const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calculatorScreen = document.querySelector('.calculator-screen');
const history = document.querySelector('.history');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.all-clear');
const decimal = document.querySelector('.decimal');

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let hapus = 0;
let angka = '';
let hapus2 = 0;
let operasi = 0;
let operasi2 = 0;

const updateScreen = (number) => {
  calculatorScreen.value = number;
}
const updatehistory = (number) => {
  if (hapus === 0) {
    history.value += ' ' + number;
  } else {
    history.value = '';
    hapus = 0;
    hapus2 = 1;
    operasi= 0;
  }

}

const inputNumber = (number) => {
  if (currentNumber === '0') {
    currentNumber = number;
    angka = number;
    operasi = 1;
    hapus2= 0;
  }
  else if (operasi2 === 1 && hapus2 === 0) {
    currentNumber = number;
    angka = number;
    operasi = 1;
    operasi2 = 0;
  } else {
    angka += number;
    currentNumber += number;
    operasi = 1;
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

const calculate = () => {
  let result = '';
  switch (calculationOperator) {
    case '+':
    result = parseFloat(prevNumber) + parseFloat(currentNumber);
    break;
    case '-':
    result = prevNumber - currentNumber;
    break;
    case '*':
    result = prevNumber * currentNumber;
    break;
    case '/':
    result = prevNumber / currentNumber;
    break;
    default: return;
  }
  currentNumber = result;
  calculationOperator = '';
}

const inputOperator = (operator) => {
  if (calculationOperator === '') {
    prevNumber = currentNumber;
  } if (hapus2 === 1) {
    updatehistory(currentNumber);
    updatehistory(operator);
    hapus2 = 0;
    operasi2 = 1;
  } if (operasi === 0) {
    calculationOperator = operator;
    return;
  } if (operasi === 1) {
    updatehistory(angka);
    updatehistory(operator);
    operasi = 0;
  }
  calculate();
  updateScreen(currentNumber);
  prevNumber = currentNumber;
  calculationOperator = operator;
  currentNumber = '0';
}

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
});

equalSign.addEventListener('click', () => {
  calculate();
  updateScreen(currentNumber);
  hapus = 1;
  updatehistory(currentNumber);
});

const clearAll = () => {
  prevNumber = '';
  calculationOperator = '';
  currentNumber = '0';
}

clearBtn.addEventListener('click', () => {
  clearAll();
  updateScreen(currentNumber);
  hapus = 1;
  updatehistory(currentNumber);
});

inputDecimal = (dot) => {
  if (currentNumber.includes('.')) {
    return;
  } else {
    currentNumber += dot;
    angka = currentNumber;
  }
}

decimal.addEventListener('click', (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const numButtons = document.querySelectorAll('.number');
const clearButton = document.getElementById('clear');
const negativeButton = document.getElementById('negative');
const percentButton = document.getElementById('percent');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const operatorButtons = document.querySelectorAll('.operator')

let total = 0;
let currentNum = 0;
let op = '';
let key = ''
display.textContent = currentNum;

buttons.forEach(button => button.addEventListener('mouseenter', () => {
    button.style.border = '2px #d3d3d3 solid'
}));

buttons.forEach(button => button.addEventListener('mouseleave', () => {
    button.style.border = null
}));

buttons.forEach(button => button.addEventListener('click', () => {
    button.style.filter = 'brightness(150%)'
    setTimeout(() => {
        button.style.filter = null
    }, 100);
}));

//click the display to delete last number
display.addEventListener('click', () => {
    currentNum = currentNum.substring(0, currentNum.length - 1)
    if (currentNum === '') {
        currentNum = '0'
    } if (currentNum.length > 10) {
        display.textContent = parseFloat(currentNum).toExponential(4)
    } else
    display.textContent = currentNum
});

numButtons.forEach(numButton => numButton.addEventListener('click', (e) => {
    currentNum === 0 ? currentNum = e.target.id : currentNum += e.target.id;
    if (currentNum.length > 10) {
        display.textContent = parseFloat(currentNum).toExponential(4)
    }else {
        display.textContent = currentNum
    }
}));

document.addEventListener('keydown', (e) => {
   key = e.key
   if (!isNaN(e.key)) {
    currentNum === 0 ? currentNum = e.key : currentNum += e.key;
    if (currentNum.length > 10) {
        display.textContent = parseFloat(currentNum).toExponential(4)
    } else
    display.textContent = currentNum
   } else if (e.key === 'Backspace') {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    if (currentNum.length > 10) {
        display.textContent = parseFloat(currentNum).toExponential(4)
    } else
    display.textContent = currentNum
   } else if (e.key === '+') {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    operate(op, total, currentNum);
    op = 'plus';
   } else if (e.key === '-') {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    operate(op, total, currentNum);
    op = 'minus';
   } else if (e.key === '/') {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    operate(op, total, currentNum);
    op = 'divide';
   } else if (e.key === '*') {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    operate(op, total, currentNum);
    op = 'multiply';
   } else if (e.key === '=' || e.key === 'Enter') {
    operate(op, total, currentNum);
    op = 'equals';
   } else if (e.key === '.') {
    if (!/\./.test(currentNum)) {
        currentNum += "."
   } else if (/\./.test(currentNum)) {
       return
    }
    display.textContent = currentNum;
   }
});

clearButton.addEventListener('click', (e) => {
    total = 0
    currentNum = 0
    op = ''
    display.textContent = currentNum
});

negativeButton.addEventListener('click', (e) => {
    let temp = parseFloat(currentNum)
    parseFloat(currentNum) > 0 ? currentNum = Math.abs(temp) * -1 : currentNum = Math.abs(temp);
    return display.textContent = currentNum
});

percentButton.addEventListener('click', (e) => {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    op = e.target.id
    operate(op, total, currentNum);
    op = ''
});

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', (e) => {
    if (total == 0) {
        total = parseFloat(currentNum)
    };
    operate(op, total, currentNum);
    op = e.target.id;
}));


equalsButton.addEventListener('click', (e) => {
    operate(op, total, currentNum)
    op = ''
});

decimalButton.addEventListener('click', (e) => {
    if (!/\./.test(currentNum)) {
        currentNum += "."
   } else if (/\./.test(currentNum)) {
       return
    }
    display.textContent = currentNum;
});


function add(currentNum, nextNum) {
    total =  (currentNum + parseFloat(nextNum));
    display.textContent = total;
};

function subtract(currentNum, nextNum) {
    total =  parseFloat(currentNum) - parseFloat(nextNum);
    display.textContent = total;
};

function divide(currentNum, nextNum) {
    if (nextNum == 0  || currentNum == 0) {
        return total =  'No Way';
    } else {
        total =  parseFloat(currentNum) / parseFloat(nextNum);
        display.textContent = total;
    }};

function multiply(currentNum, nextNum) {
    total = (parseFloat(currentNum) * parseFloat(nextNum));
    display.textContent = total;
}

function percent(num) {
    total = parseFloat(num) / 100;
    display.textContent = total
};

function operate(operator, total, num) {
    switch(operator) {
        case 'plus':
             add(total, num); 
             break;
        case 'minus':
             subtract(total, num);
             break;
        case 'multiply':
             multiply(total, num);
             break;
        case 'divide':
             divide(total, num);
             break;
        case 'percent':
            percent(total);
            break;
    };
    currentNum = 0
    smallerNumbers();
};

function smallerNumbers() {
    let splitNum = total.toString().split('.')
    if (splitNum[0].length > 10 || (splitNum[0].length > 9 && splitNum[1].length > 0) ) {
        display.textContent =  total.toExponential(4)
    } else if (total.toString().length > 10 && splitNum[0].length < 9) {
        let decimalPoints = 10 - splitNum[0].length
        let rounding = 10 ** decimalPoints
        total = roundDecimals(rounding, total)
        display.textContent = total
    }

    else {
        display.textContent = total
    };
}

function roundDecimals(math, sum) {
    return Math.round((sum + Number.EPSILON) * math)  / math
}
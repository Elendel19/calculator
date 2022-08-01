const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let total = 0;
let currentNum = 0;
let op = '';
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

display.addEventListener('click', () => {
    currentNum = currentNum.substring(0, currentNum.length - 1)
     return display.textContent = currentNum;
})

buttons.forEach(button => button.addEventListener('click', (e) => {
    
    if (isNaN(parseFloat(e.target.id))) {
        if (e.target.id == 'decimal' && !/\./.test(currentNum)) {
         currentNum += "."
    } else if (e.target.id == 'decimal' && /\./.test(currentNum)) {
        return
    } else if (e.target.id == 'clear') {
        total = 0
        currentNum = 0
        display.textContent = currentNum
    } else if (e.target.id == 'negative') {
        let temp = parseFloat(currentNum)
        parseFloat(currentNum) > 0 ? currentNum = Math.abs(temp) * -1 : currentNum = Math.abs(temp);
        return display.textContent = currentNum
    } else {
        if (total == 0) {
        total = parseFloat(currentNum)
        };
        if (currentNum == 0) {
            currentNum = total
         };

        operate(op, total, currentNum);
        currentNum = 0
        op = e.target.id;
        if (total.toString().length > 10) {
            display.textContent =  total.toExponential(4)
        } else {
            display.textContent = total
        }};
        
    } else {
    currentNum === 0 ? currentNum = e.target.id : currentNum += e.target.id;
    
    if (currentNum.length > 10) {
        display.textContent = parseFloat(currentNum).toExponential(4)
    }else {
        display.textContent = currentNum
    }}}));

function add(currentNum, nextNum) {
    total =  (currentNum + parseFloat(nextNum));
    display.textContent = total;
};

function subtract(currentNum, nextNum) {
    total =  parseFloat(currentNum) - parseFloat(nextNum);
    display.textContent = total;
};

function multiply(currentNum, nextNum) {
    total =  parseFloat(currentNum) * parseFloat(nextNum);
    display.textContent = total;
};

function divide(currentNum, nextNum) {
    if (nextNum == 0  || currentNum == 0) {
        return total =  'No Way';
    } else {
        total =  parseFloat(currentNum) / parseFloat(nextNum);
        display.textContent = total;
    }
    
    
};

function percent(num) {
    total = num / 100
}


function operate(operator, total, num) {
    switch(operator) {
        case 'plus':
            add(total, num); 
            break;
        case 'minus':
            return subtract(total, num);
        case 'multiply':
            return multiply(total, num);
        case 'divide':
            return divide(total, num);
        case 'percent':
            return percent(total)
    }
};


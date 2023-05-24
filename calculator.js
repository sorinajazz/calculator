class Calculator {
    constructor(previousResult, currentResult) {
        this.previousResult = previousResult;
        this.currentResult = currentResult;
        this.clear();
    }

    clear(){
        this.currentValue = ' ';
        this.previousValue = ' ';
        this.operation = undefined;

    }

    delete(){
        this.currentValue = this.currentValue.toString().slice(0, -1);

    }

    appendNumber(number) {
        if(number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();

    }

    chooseOperation(operation){
        if(this.currentValue === '') return;
        if(this.previousValue !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';

    }

    compute(){
        let computation;
        const previous = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if(isNaN(previous) || isNaN(current)) return;

        switch(this.operation) {
            case '+': 
                computation = previous + current;
                break;
            case '-': 
                computation = previous - current;
                break;
            case '*': 
                computation = previous * current;
                break;
            case '/': 
                computation = previous / current;
                break;
            default:
                return;
        }

        this.currentValue = computation;
        this.operation = undefined;
        this.previousValue = '';
        

    }


    updateDisplay(){
        this.currentResult.innerText = 
            this.currentValue;
        if(this.operation != null) {
            this.previousResult.innerText =
                 `${this.previousValue} ${this.operation}`;
        }
        else {
            this.previousResult.innerText = '';
        }

    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');

const currentResult = document.querySelector('[currentResult]');
const previousResult = document.querySelector('[previousResult]');

const calculator = new Calculator(previousResult, currentResult);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationsBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener('keydown', (event) => {
    if(event.key >=0 && event.key <=9 && 
            event.key != " " ||
            event.key === '.') {
        calculator.appendNumber(event.key);
    }
    else if(event.key === '+' || 
                event.key === '-' ||
                event.key === '/' ||
                event.key === '*') {
        calculator.chooseOperation(event.key);
    }
    else if(event.key === '=' || event.key === 'Enter') {
        calculator.compute();
    }
    else if(event.key === 'Backspace') {
        calculator.delete();
    }
    calculator.updateDisplay();

})

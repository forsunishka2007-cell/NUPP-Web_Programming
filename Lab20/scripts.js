 const inputDisplay = document.getElementById('input');
    const historyDisplay = document.getElementById('history');
    let isCalculated = false;

function append(value) {
    if (isCalculated && !isNaN(value)) {
        inputDisplay.innerText = value;
        isCalculated = false;
    } else {
        if (inputDisplay.innerText === '0' && value !== '.' && isNaN(inputDisplay.innerText)) {
            inputDisplay.innerText = value;
        } else if (inputDisplay.innerText === '0' && !isNaN(value)) {
            inputDisplay.innerText = value;
        } else {
            inputDisplay.innerText += value;
        }
        isCalculated = false;
    }
    autoScroll();
}

function clearAll() {
    inputDisplay.innerText = '0';
    historyDisplay.innerText = '';
}

function backspace() {
    if (inputDisplay.innerText.length > 1) {
        inputDisplay.innerText = inputDisplay.innerText.slice(0, -1);
    } else {
        inputDisplay.innerText = '0';
    }
}

function calculate() {
    let expression = inputDisplay.innerText;
    historyDisplay.innerText = expression;

    try {
        let formattedExpression = expression.replace(/\^/g, '**');
        
        formattedExpression = formattedExpression.replace(/(\d+(\.\d+)?)(%)/g, '($1/100)');

        let result = new Function(`return ${formattedExpression}`)();

        if (result !== undefined && !isNaN(result)) {
            inputDisplay.innerText = Number(result.toFixed(8)).toString();
        } else {
            inputDisplay.innerText = 'Error';
        }
        isCalculated = true;
    } catch (error) {
        inputDisplay.innerText = 'Error';
        isCalculated = true;
    }
    autoScroll();
}

function autoScroll() {
    inputDisplay.scrollLeft = inputDisplay.scrollWidth;
}

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '%', '^'].includes(key)) {
        append(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearAll();
    }
});
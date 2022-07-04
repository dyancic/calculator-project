//declaration for the input on the calculator
let input = 0;
let output = 0;
let formulaArray = [];
let decimalActive = false;
let operatorActive = false;
let decimalIncrement = 1;
const inputArea = document.getElementById("calcInput");
const outputArea = document.getElementById("calcOutput");
const allButtons = document.querySelectorAll(".calc__button");
const allNumbers = document.querySelectorAll(".calc__number");
const equalId = document.getElementById("buttonEqual");
//turns the calculator on and off
function onOff() {}
//Adds number to the input area
//!!Need to add if equalActive to clear the input
function onNumberClick(num) {
    operatorActive = false;
    if (input.toString().length > 8) {
        return;
    }
    if (decimalActive === true) {
        input = input + num / 10 ** decimalIncrement;
        inputArea.innerHTML = input.toFixed(decimalIncrement);
        decimalIncrement++;
    } else {
        input = input * 10 + num;
        inputArea.innerHTML = input;
    }
}

const decimalClick = () => (decimalActive = true);

//clears the input, takes in an argument to change the input also
function clearInput() {
    if (input === 0) {
        output = "";
        formulaArray = [];
        outputArea.innerHTML = "";
    }
    input = 0;
    decimalIncrement = 1;
    decimalActive = false;
    inputArea.innerHTML = "";
}

//if input is zero make input a negative number
function operatorClick(oper) {
    operatorActive = true;
    if (input === 0 && oper === " - ") {
        allNumbers.forEach((element) =>
            element.addEventListener("click", () => {
                input *= -1;
            }),
        );
    }
    arrayPush(input, oper);
    manageOutput(oper);
    clearInput();
    console.log(formulaArray);
}

//Function for the output
function manageOutput(oper) {
    if (outputArea.innerText.length > 70 || input === 0) errorMessage();
    output = "";
    formulaArray.map((term) => (output += term.toString()));
    oper === " = "
        ? (outputArea.innerHTML = `${output}${oper}`)
        : (outputArea.innerHTML = output);
}

function errorMessage() {
    input = 0;
    clearInput();
    inputArea.innerHTML = "ERROR";
}

function solveEquation() {
    console.log(operatorActive, formulaArray);
    if (formulaArray.length === 1) {
        input = formulaArray[0];
        return;
    }
    //NOT WORKING -- trying to use this to pop off unused operators
    if (operatorActive) {
        formulaArray.pop();
        operatorActive = false;
    }
    console.log(operatorActive, formulaArray);
    arrayPush(input, 0);
    formulaArray.pop();
    manageOutput(" = ");

    formulaArray.map((term, index) => {
        if (term === " ÷ ") {
            const equals = formulaArray[index - 1] / formulaArray[index + 1];
            formulaArray.splice(index - 1, 3, equals);
        }
        if (term === " x ") {
            const equals = formulaArray[index - 1] * formulaArray[index + 1];
            formulaArray.splice(index - 1, 3, equals);
        }
    });
    //maybe switch this to a reduce, then don't have to delete formulaArray
    formulaArray.map((term, index) => {
        if (term === " + ") {
            const equals = formulaArray[index - 1] + formulaArray[index + 1];
            formulaArray.splice(index - 1, 3, equals);
        }
        if (term === " - ") {
            const equals = formulaArray[index - 1] - formulaArray[index + 1];
            formulaArray.splice(index - 1, 3, equals);
        }
        console.log(formulaArray);
    });
    input = Math.round((formulaArray[0] + Number.EPSILON) * 1000000) / 1000000;
    if (input > 100000) input = input.toExponential(3);
    //add if statements to change decimal places depending on how many digits there are in the number
    inputArea.innerHTML = input;
    formulaArray = [];
}

const arrayPush = (input, oper) =>
    decimalActive
        ? formulaArray.push(input.toFixed(decimalIncrement - 1), oper)
        : formulaArray.push(input, oper);

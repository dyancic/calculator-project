let input = 0;
let output = 0;
let formulaArray = [];
let decimalActive = false;
let operatorActive = false;
let negativeActive = false;
let power = true;
let decimalIncrement = 1;
const inputArea = document.getElementById("calcInput");
const outputArea = document.getElementById("calcOutput");
const allButtons = document.querySelectorAll(".calc__button");
const allNumbers = document.querySelectorAll(".calc__number");
const equalId = document.getElementById("buttonEqual");
//turns the calculator on and off
function onOff(button) {
    if (button === "on") {
        power = true;
        inputArea.innerHTML = "HELLO";
    }
    console.log(power);
    if (button === "off") {
        power = false;
        clearInput(true);
        inputArea.innerHTML = "GOODBYE";
    }
}
//Adds number to the input area
//!!Need to add if equalActive to clear the input
function onNumberClick(num) {
    let number = num;
    if (!power) return;
    if (input.toString().length > 7) return;
    if (negativeActive) (number *= -1), (negativeActive = false);
    operatorActive = false;
    if (decimalActive && input < 0) {
        input =
            Math.round(
                (input - number / 10 ** decimalIncrement) *
                    10 ** decimalIncrement,
            ) /
            10 ** decimalIncrement;
        inputArea.innerHTML = input.toFixed(decimalIncrement);
        decimalIncrement++;
    } else if (decimalActive && input > 0) {
        input =
            Math.round(
                (input + number / 10 ** decimalIncrement) *
                    10 ** decimalIncrement,
            ) /
            10 ** decimalIncrement;
        inputArea.innerHTML = input.toFixed(decimalIncrement);
        decimalIncrement++;
    } else if (input < 0) {
        input = input * 10 - num;
        inputArea.innerHTML = input;
    } else {
        input = input * 10 + number;
        inputArea.innerHTML = input;
    }
}

const decimalClick = () => {
    if (power) decimalActive = true;
};
//clears the input, on second click clears the output
//needs to clear the equals sign on first click
//if equals is active needs to full clear
function clearInput(bool) {
    if (input === 0 || bool) {
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
    if (!power) return;
    operatorActive = true;
    if (input === 0 && oper === " - ") negativeActive = true;
    formulaArray.push(input, oper);
    manageOutput(oper);
    clearInput(false);
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
    if (!power) return;
    if (formulaArray.length === 1) {
        input = formulaArray[0];
        return;
    }
    //NOT WORKING -- trying to use this to pop off unused operators
    formulaArray.push(input);
    if (operatorActive) {
        formulaArray.pop();
        operatorActive = false;
    }
    manageOutput(" = ");

    for (i = 0; i < formulaArray.length; i++) {
        if (formulaArray[i + 1] === " ÷ ") {
            formulaArray.splice(i, 3, formulaArray[i] / formulaArray[i + 2]);
            i--;
        }
        if (formulaArray[i + 1] === " x ") {
            formulaArray.splice(i, 3, formulaArray[i] * formulaArray[i + 2]);
            i--;
        }
    }

    for (i = 0; i < 2; i++) {
        if (formulaArray[i + 1] === " + ") {
            formulaArray.splice(i, 3, formulaArray[i] + formulaArray[i + 2]);
            i--;
        }
        if (formulaArray[i + 1] === " - ") {
            formulaArray.splice(i, 3, formulaArray[i] - formulaArray[i + 2]);
            i--;
        }
    }

    input = formulaArray[0];
    //rounds the answer to specific decimal points to keep it within the 8 char range for the calculator
    //exponential returns a string to the input which can break the calc
    if (input >= 100000 || input <= -10000) {
        input = input.toExponential(2);
    } else if (input >= 10000 || input <= -1000) {
        input = Math.round((formulaArray[0] + Number.EPSILON) * 100) / 100;
    } else if (input >= 1000 || input <= -100) {
        input = Math.round((formulaArray[0] + Number.EPSILON) * 1000) / 1000;
    } else if (input >= 100 || input <= -10) {
        input = Math.round((formulaArray[0] + Number.EPSILON) * 10000) / 10000;
    } else if (input >= 10 || input <= -1) {
        input =
            Math.round((formulaArray[0] + Number.EPSILON) * 100000) / 100000;
    } else {
        input =
            Math.round((formulaArray[0] + Number.EPSILON) * 1000000) / 1000000;
    }

    //input = Math.round((formulaArray[0] + Number.EPSILON) * 1000000) / 1000000;

    inputArea.innerHTML = input;
    formulaArray = [];
}

//TODO
//Modular code

let input = 0;
let output = 0;
let formulaArray = [];
let decimalActive = false;
let operatorActive = false;
let negativeActive = false;
let equalActive = false;
let power = true;
let decimalIncrement = 1;
const inputArea = document.getElementById("calcInput");
const outputArea = document.getElementById("calcOutput");

//keyboard
window.addEventListener("keydown", (event) => {
    if (Number(event.key) > -1) onNumberClick(Number(event.key));
    if (event.key === "/") operatorClick(" ÷ ");
    if (event.key === "*") operatorClick(" x ");
    if (event.key === "+" || event.key === "-") operatorClick(` ${event.key} `);
    if (event.key === ".") decimalClick();
    if (event.key === "Enter") solveEquation();
    if (event.key === "Backspace") clearInput(false);
    console.log(event.key);
});

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
function onNumberClick(num) {
    let number = num;
    if (equalActive) clearInput(true), (equalActive = false);
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

//on operator click pushes input and the operator to the storage array
function operatorClick(oper) {
    if (!power) return;
    operatorActive = true;
    if (input === 0 && oper === " - ") negativeActive = true;
    formulaArray.push(input, oper);
    manageOutput(oper);
    clearInput(false);
    console.log(formulaArray);
}

//Function for what appears above the input area
function manageOutput(oper) {
    if (outputArea.innerText.length > 70 || input === 0) errorMessage();
    output = "";
    formulaArray.map((term) => (output += term.toString()));
    oper === " = "
        ? (outputArea.innerHTML = `${output}${oper}`)
        : (outputArea.innerHTML = output);
}

//could remove this and just solve equation if the array is getting too long to fit the calculator
function errorMessage() {
    input = 0;
    clearInput();
    inputArea.innerHTML = "ERROR";
}

//on equals
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
    equalActive = true;

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
    if (input >= 100000 || input <= -10000) {
        inputArea.innerHTML = input.toExponential(2);
        formulaArray = [];
        return;
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

    inputArea.innerHTML = input;
    formulaArray = [];
}

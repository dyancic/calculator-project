// if character length in output is exc eeding 70 hit a solve
let input = "";
let output = 0;
let formulaArray = [];
let operatorActive = false;
let equalActive = false;
let power = false;
const inputArea = document.getElementById("calcInput");
const outputArea = document.getElementById("calcOutput");
const numberButton = document.querySelectorAll(".calc__number");
const operatorButton = document.querySelectorAll(".calc__operator");
const equalButton = document.getElementById("buttonEqual");
const clearButton = document.getElementById("buttonClear");
const screen = document.querySelector("#screen");

//keyboard
document.addEventListener("keypress", (event) => {
    if (Number(event.key) > -1) onNumberClick(event.key);
    if (event.key === "/") operatorClick(" ÷ ");
    if (event.key === "*" || event.key === "x") operatorClick(" x ");
    if (event.key === "+" || event.key === "-") operatorClick(` ${event.key} `);
    if (event.key === ".") decimalClick();
    if (event.key === "Enter") solveEquation();
    if (event.key === "Backspace" || event.key === "c") clearInput(false);
    event.stopImmediatePropagation;
    console.log(event.key);
});

// buttons
Array.from(numberButton).forEach((button) => {
    button.addEventListener("click", () => onNumberClick(button.value));
});

//operators
Array.from(operatorButton).forEach((button) => {
    button.addEventListener("click", () => operatorClick(button.value));
});

//Equal
equalButton.addEventListener("click", () => solveEquation());

//Clear
clearButton.addEventListener("click", () => clearInput(false));

//onOff
document.getElementById("on").addEventListener("click", () => {
    if (!power) {
        inputArea.innerHTML = "hello";
        screen.classList.remove("calc__screen--off");
        setTimeout(() => ((inputArea.innerHTML = ""), (power = true)), 2000);
    }
});

document.getElementById("off").addEventListener("click", () => {
    if (power) {
        power = false;
        clearInput(true);
        inputArea.innerHTML = "GOODBYE";
        screen.classList.add("calc__screen--off");
        setTimeout(() => (inputArea.innerHTML = ""), 2000);
    }
});

//Adds number to the input area
function onNumberClick(num) {
    if (!power || input.toString().length > 7) return;
    if (equalActive) clearInput(true), (equalActive = false);
    operatorActive = false;
    num === "." && input === "" ? (input = "0.") : (input += num);
    inputArea.innerHTML = input;
}

//clears the input, on second click clears the output
function clearInput(bool) {
    if (input === "" || bool) {
        output = "";
        formulaArray = [];
        outputArea.innerHTML = "";
    }
    input = "";
    inputArea.innerHTML = "";
}

//on operator click pushes input and the operator to the storage array
function operatorClick(oper) {
    if (input === "" && oper === " - ") {
        input = "-";
        inputArea.innerHTML = input;
        return;
    }
    if (!power || operatorActive) return;
    equalActive = false;
    operatorActive = true;
    if (outputArea.innerText.length > 70) solveEquation();
    formulaArray.push(parseFloat(input), oper);
    manageOutput(oper);
    clearInput(false);
    console.log(formulaArray);
    inputArea.innerHTML = input;
}

//Function for what appears above the input area
function manageOutput(oper) {
    output = "";
    formulaArray.map((term) => (output += term.toString()));
    oper === " = "
        ? (outputArea.innerHTML = `${output}${oper}`)
        : (outputArea.innerHTML = output);
}

//on equals
function solveEquation() {
    if (!power) return;
    if (formulaArray.length === 1) {
        input = formulaArray[0];
        return;
    }
    formulaArray.push(parseFloat(input));
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

    input = formulaArray[0].toString();
    // rounds the answer to specific decimal points to keep it within the 8 char range for the calculator
    if (formulaArray[0] >= 100000 || formulaArray[0] <= -10000) {
        inputArea.innerHTML = formulaArray[0].toExponential(3);
        formulaArray = [];
        return;
    }
    const splitStr = input.split(".");
    console.log(splitStr);
    if (splitStr[0].length > 4 && splitStr[1].length > 1)
        input = formulaArray[0].toFixed(2);
    else if (splitStr[0].length > 3 && splitStr[1].length > 2)
        input = formulaArray[0].toFixed(3);
    else if (splitStr[0].length > 2 && splitStr[1].length > 3)
        input = formulaArray[0].toFixed(4);
    else if (splitStr[0].length > 1 && splitStr[1].length > 4)
        input = formulaArray[0].toFixed(5);
    else if (splitStr[1].length > 5) {
        input = formulaArray[0].toFixed(6);
    }
    inputArea.innerHTML = input;
    formulaArray = [];
}

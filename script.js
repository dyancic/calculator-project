let input = "";
let output = 0;
let formulaArray = [];
let operatorActive = false;
let equalActive = false;
let power = false;
let decimalActive = false;
const inputArea = document.getElementById("calcInput");
const outputArea = document.getElementById("calcOutput");
const numberButton = document.querySelectorAll(".calc__number");
const operatorButton = document.querySelectorAll(".calc__operator");
const equalButton = document.getElementById("buttonEqual");
const clearButton = document.getElementById("buttonClear");
const screen = document.querySelector("#screen");

////LISTENERS
//keyboard
//change to switch statement
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
numberButton.forEach((button) => {
    button.addEventListener("click", () => onNumberClick(button.value));
});

//operators
operatorButton.forEach((button) => {
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
        setTimeout(() => {
            inputArea.innerHTML = "";
            power = true;
        }, 2000);
    }
});

document.getElementById("off").addEventListener("click", () => {
    if (power) {
        power = false;
        clearInput(true);
        inputArea.innerHTML = "GOODBYE";

        setTimeout(() => {
            inputArea.innerHTML = "";
            screen.classList.add("calc__screen--off");
        }, 2000);
    }
});

////FUNCTIONS
//Adds number to the input area
function onNumberClick(num) {
    if (!power || input.length > 7) return;
    if (equalActive) clearInput(true), (equalActive = false);

    operatorActive = false;

    if (num === ".") {
        if (decimalActive) return;
        input === "" ? (input = "0.") : (input += num);
        decimalActive = true;
    } else input += num;

    if (!decimalActive && input[0] === "0" && input.length > 1) {
        input = input.substring(1);
    }

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
    decimalActive = false;
}

//on operator click pushes input and the operator to the storage array
function operatorClick(oper) {
    if (!power || operatorActive) return;
    if (input === "" && oper === " - ") {
        input = "-";
        inputArea.innerHTML = input;
        return;
    }
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
    decimalActive = false;
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
    if (formulaArray[0] >= 100000 || formulaArray[0] <= -10000) {
        inputArea.innerHTML = formulaArray[0].toExponential(2);
        formulaArray = [];
        return;
    }
    //for loop that keeps the answer within 8 char limit if needed
    const splitStr = input.split(".");
    let dec = 4;
    let inc = 1;
    if (splitStr[1]) {
        for (let i = 2; i < 7; i++) {
            if (splitStr[0].length > dec && splitStr[1].length > inc) {
                input = formulaArray[0].toFixed(i);
                break;
            }
            inc++, dec--;
        }
    }
    inputArea.innerHTML = input;
    formulaArray = [];
}

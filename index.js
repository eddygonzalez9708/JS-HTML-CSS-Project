const val = document.querySelector(".calc-val");
const calc = document.querySelector(".calc");

let primaryVal = '';
let secondaryVal = '';
let oppClicked = false;

const ops = {
    "×": "*",
    "÷": "/",
    "+": "+",
    "−": "-"
}

calc.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const isNum = !isNaN(parseInt(e.target.innerText));
        const text = e.target.innerText;
        
        if (isNum) {
            primaryVal += text;
            secondaryVal += text;
            val.innerText = secondaryVal;
            oppClicked = false;
        } else if (text === "C") {
            primaryVal = "";
            secondaryVal = "";
            val.innerText = "0";
            oppClicked = false;
        } else if (text === "←") {
            if (primaryVal.slice(-1) === " ") {
                primaryVal = primaryVal.slice(0, -3);
                secondaryVal = secondaryVal.slice(0, -3);
                oppClicked = false;
            } else {
                primaryVal = primaryVal.slice(0, -1);
                secondaryVal = secondaryVal.slice(0, -1);
            }
                
            val.innerText = secondaryVal.length > 0 ? secondaryVal : "0";
        } else if (text === "=" && !oppClicked && primaryVal !== "") {
            primaryVal = eval(primaryVal).toString();
            secondaryVal = primaryVal;
            val.innerText = secondaryVal;

            if (primaryVal === "0" || primaryVal === "Infinity") {
                primaryVal = "";
                secondaryVal = "";
            }

            oppClicked = false;
        } else if (!oppClicked && primaryVal !== "") {
            primaryVal += ` ${ops[text]} `;
            secondaryVal += ` ${text} `;
            val.innerText = secondaryVal;
            oppClicked = true;
        }
    }
});
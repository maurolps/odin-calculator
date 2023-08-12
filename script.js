let firstNumber = undefined;
let secondNumber = undefined;
let operator = "";
let displayContent = "";
let isOperator = false;

const display = document.getElementById('display');
const btn = document.querySelectorAll("button");

function operate(para1, para2, op){
  let opResult = null;
  para1 = parseFloat(para1);
  para2 = parseFloat(para2);

  switch (op) {
    case "/":
      if (para2 === 0) {
        para2 = 1;
      }
      opResult = para1/para2;
      break;
    case "*":
      opResult = para1*para2;
      break;
    case "+":
      opResult = para1+para2;
      break;
    case "-":
      opResult = para1-para2;
    	break;
  }
  console.log(para1+op+para2+"="+opResult);
  firstNumber = opResult;
  (Math.floor(opResult) !== opResult)?
  display.textContent = opResult.toFixed(2):
  display.textContent = opResult;
}

function updateDisplay(content) {
  if(isOperator) { 
    displayContent = content;
    display.textContent = displayContent;
    isOperator = false;
  }
  else {
   displayContent += content;
   display.textContent = displayContent;
  }

}

function buttonClick(para) {
  let opClass = para.target.className;

  if (opClass === "btnBlue") {
    updateDisplay(this.textContent);
 
  }
  if (opClass === "btnBrown") {
    if (this.textContent === "Back") {
      console.log(display.textContent);
      if (display.textContent === "0") {return};
      display.textContent = display.textContent.slice(0,-1);
      if (display.textContent === "") {display.textContent="0"};
      console.log(display.textContent);
      return;
    }
    if (this.textContent === "CE") {
      display.textContent = "0";
      displayContent = "";
      return;
    }
    firstNumber = undefined;
    isOperator = false;
    displayContent = "";
    display.textContent = "0";
  }
  if (opClass === "btnRed") {
    isOperator = true;
    if (this.textContent === "=") {
      if(firstNumber === undefined){return};
      secondNumber = display.textContent;
      operate(firstNumber, secondNumber,operator);
      firstNumber = undefined;
      return;
    }
    if (firstNumber === undefined) {
      firstNumber = display.textContent;
      operator = this.textContent;
      console.log(firstNumber);
    } else { 
      secondNumber = display.textContent;
      console.log(secondNumber);
      operate(firstNumber, secondNumber,operator);
      operator = this.textContent;
    }
    

  }

}

btn.forEach((btns) => {
  btns.addEventListener("click",buttonClick);
});

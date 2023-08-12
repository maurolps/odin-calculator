let firstNumber = undefined;
let secondNumber = undefined;
let operator = "";
let displayContent = "";
let isOperator = false;
let memoryNumber = 0;
const display = document.getElementById('display');
const btn = document.querySelectorAll("button");
const memoryContainer = document.getElementById('mContainer');

function operate(para1, para2, op) {
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
    case "^":
      opResult = para1**para2;
      break;     
  }
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

function keyPad(key) {
  if (key === "⁺⁄₋") {
    display.textContent = -display.textContent;
    return;
  }
  isOperator = true;
  if (key === "=") {
    if(firstNumber === undefined){return};
    secondNumber = display.textContent;
    operate(firstNumber, secondNumber,operator);
    firstNumber = undefined;
    return;
  }
  if (firstNumber === undefined) {
    firstNumber = display.textContent;
    operator = key;
  } else { 
    secondNumber = display.textContent;
    operate(firstNumber, secondNumber,operator);
    operator = key;
  }
  
}

function keyClear(key) {
  if (key === "Back") {
    if (display.textContent === "0") {return};
    display.textContent = display.textContent.slice(0,-1);
    if (display.textContent === "") {display.textContent="0"};
    return;
  }
  if (key === "CE") {
    display.textContent = "0";
    displayContent = "";
    return;
  }
  firstNumber = undefined;
  isOperator = false;
  displayContent = "";
  display.textContent = "0";
}

function keyNumber(key) {
  if (key === ".") {
    if (display.textContent.includes(".")) return;
  }
  updateDisplay(key);
}

function keyMemory(key) {

  switch (key) {
    case "MC":
      memoryNumber = "";
      break;
    case "MR":
      if (memoryNumber===0 || memoryNumber === ""){break;}
      display.textContent = memoryNumber;
      break;
    case "MS":
      memoryNumber = display.textContent;
      break;
    case "M+":
      memoryNumer = parseInt(memoryNumber);
      memoryNumber += parseInt(display.textContent);
      break;
  }
  memoryContainer.textContent = memoryNumber;
  
}

function buttonClick(para) {
  let opClass = para.target.className;
  const key = this.textContent;

  if (opClass === "btnBlue2") {
    if (key === "%") {
      display.textContent = display.textContent/100;
      return
    }
    if (key === ""){return};
    opClass = "btnRed";
  }

  if(opClass === "btnBlue"){keyNumber(key)}
  if(opClass === "btnBrown"){keyClear(key)}
  if(opClass === "btnRed"){keyPad(key)}
  if(opClass === "btnMem"){keyMemory(key)}

}

btn.forEach((btns) => {
  btns.addEventListener("click",buttonClick);
});

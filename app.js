class Calculator {
  constructor(calcDisplay) {
    this.display = calcDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }
  chooseOperation(operation) {}

  compute() {}

  updateDisplay() {
    this.display.innerText = this.currentOperand.toString();
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const opButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const display = document.querySelector("[data-display]");

const calculator = new Calculator(display);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

opButton.forEach((op) => {
  op.addEventListener("click", () => {
    calculator.appendNumber(op.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

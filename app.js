class Calculator {
  constructor(calcDisplay) {
    this.display = calcDisplay;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
    if (this.operation === "Sin" || this.operation === "Cos") this.compute();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (this.operation === "Cos") {
      computation = Math.cos(prev);
      this.currentOperand = computation;
      this.operation = undefined;
      this.prevOperand = "";
      return;
    }
    if (this.operation === "Sin") {
      computation = Math.sin(prev);
      this.currentOperand = computation;
      this.operation = undefined;
      this.prevOperand = "";
      return;
    }
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev + current;
        break;
      case "Sin":
        computation = Math.sin(current);
        break;
      case "Cos":
        computation = Math.cos(current);
        break;
      default:
        break;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  updateDisplay() {
    if (this.operation) {
      this.display.innerText =
        this.prevOperand.toString() +
        this.operation +
        this.currentOperand.toString();
    } else {
      this.display.innerText =
        this.prevOperand.toString() + this.currentOperand.toString();
    }
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
    calculator.chooseOperation(op.innerText);
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

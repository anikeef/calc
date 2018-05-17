function enterSymbol(symbol) {
  expression = expression.toString();
  const isOperator = /[\/\*\+\-\.]/g;
  const lastSymbol = expression.substr(-1, 1);
  if (symbol.match(isOperator) && lastSymbol.match(isOperator)) return;

  if (expression === '0' && !symbol.match(isOperator)) {
    uploadDisplay(symbol);
    return;
  }

  uploadDisplay(expression + symbol.toString());
}

function uploadDisplay(newExpression) {
  expression = newExpression;
  displayText.textContent = expression;
  resizeText();
}

function resizeText() {
  let width = parseInt(getComputedStyle(displayText).width);
  let fontSize = parseInt(getComputedStyle(displayText).fontSize);

  while (width > 233) {
    displayText.style.fontSize = fontSize - 1 + 'px';
    width = parseInt(getComputedStyle(displayText).width);
    fontSize = parseInt(getComputedStyle(displayText).fontSize);
  }
}

const calc = document.querySelector('.calc')
const displayText = document.querySelector('p');
const inputButtons = Array.from(document.querySelectorAll('button:not(.special)'));

const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const negate = document.querySelector("#negate");

let expression = '0';
uploadDisplay(expression);

inputButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const char = e.target.getAttribute('data-char');
    enterSymbol(char);
  })
})

equal.addEventListener('click', function() {
  const answer = Math.round(eval(expression) * 100000) / 100000;
  if (answer === Infinity || isNaN(answer)) {
    uploadDisplay('Good Bye!');
    calc.classList.add('disappear');
    return;
  }
  uploadDisplay(answer.toString());
});

clear.addEventListener('click', function() {
  uploadDisplay('0');
  displayText.style.fontSize = '40px';
})

backspace.addEventListener('click', function() {
  if (expression.toString().length === 1) {
    uploadDisplay('0');
    return;
  }

  uploadDisplay(expression.slice(0, -1));
})

negate.addEventListener('click', function() {
  if (expression.substr(0, 1) == '-') {
    uploadDisplay(expression.substr(1))
    return;
  }

  uploadDisplay('-' + expression);
})

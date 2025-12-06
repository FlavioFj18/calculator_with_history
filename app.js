var display = document.getElementById("display");
var buttons = document.querySelectorAll(".btn");
var clean = document.getElementById("clean");
var backSpace = document.getElementById('backspace');
var historyList = document.getElementById("history-list");
var calcHistory = [];
var currentText = '';
var result = '';

function safeEval(expr) {
  const allowedChars = /^[0-9+\-*/().%]+$/;

  if (!allowedChars.test(expr)) {
    throw new Error("Invalid characters in the expression");
  }

  try {
    const result = eval(expr);
    return result;
  } catch (error) {
    throw new Error("Calculation error");
  }
}

clean.addEventListener('click', () => {
  currentText = '';
  display.value = '';
})

backSpace.addEventListener('click', () => {
  currentText = currentText.slice(0, currentText.length - 1);
  display.value = currentText;
})

buttons.forEach((e) => {
  e.addEventListener('click', () => {
    if (currentText === '' && e.className != 'btn operator p')
    {
      display.value = "Error";
      currentText = '';
      console.log('There are no values');
      alert('Invalid expression!');
      return ;
    }
    else if (e.textContent === "=")
    {
      try {
        result = safeEval(currentText);
        updateHistory(currentText + '=' + result);
        currentText = result;
        display.value = result;
      } catch (error) {
        currentText = '';
        display.value = "Error";
        alert(error);
        return ;
      }
    }
    else
    {
      currentText += e.textContent;
      display.value = currentText
    }
  })
});

function updateHistory(expression) {
  calcHistory.push(expression);
  historyList.innerHTML = '';
  let oldItems = calcHistory.slice().reverse();
  for (let i = 0; i < oldItems.length; i++) {
    let li = document.createElement('li');
    li.textContent = oldItems[i];
    historyList.appendChild(li);
  }
}


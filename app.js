var display = document.getElementById("display");
var buttons = document.querySelectorAll(".btn");
var clean = document.getElementById("clean");
var backSpace = document.getElementById('backspace');
var historyList = document.getElementById("history-list");
var calcHistory = [];
var currentText = '';
var result = '';


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
    if (currentText === '' && e.className != 'btn number')
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
        result = eval(currentText);
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


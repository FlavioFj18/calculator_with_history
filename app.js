var display = document.getElementById("display");
var buttons = document.querySelectorAll(".btn");
var clean = document.getElementById("clean");
var backSpace = document.getElementById('backspace');
var historyList = document.getElementById("history-list");
var currentText = '';
var result = '';


//console.log(buttons[4].textContent);

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
        console.log(result);
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
      console.log(currentText);
    }
  })
});

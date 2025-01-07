function increaseValue() {
    const input = document.getElementById('numericInput');
    const currentValue = parseInt(input.value) ;
    const max = parseInt(input.max);
  
    if (currentValue < max) {
      input.value = currentValue + 1;
    }
    console.log(input.value);
  }

function decreaseValue () {
    const input = document.getElementById('numericInput');
    const currentValue = parseInt(input.value) ;
    const min = parseInt(input.min);

    if (currentValue > min) {
        input.value = currentValue-1
    }
}
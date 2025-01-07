const selectElement = document.getElementById('prov');

selectElement.addEventListener('change', () => {
  if (selectElement.value !== "") {
    selectElement.classList.add('changed');
  } else {
    selectElement.classList.remove('changed');
  }
});
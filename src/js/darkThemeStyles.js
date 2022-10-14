const body = document.body;

const checkbox = document.querySelector('.toggle-input');
const initialState = localStorage.getItem('toggleState') == 'true';
checkbox.checked = initialState;

onToggleChecked();
checkbox.addEventListener('change', onToggleChecked);

function onToggleChecked() {
  if (checkbox.checked) {
    body.classList.add('dark__theme');
  } else {
    body.classList.remove('dark__theme');
  }
}

checkbox.addEventListener('change', function () {
  localStorage.setItem('toggleState', checkbox.checked);
});

const btnAdd = document.getElementById('btnAdd');
const btnsEdit = document.getElementsByClassName('btn-edit');

btnAdd.addEventListener('click', () => {
  window.location.href = '/district/add';
});

for (let i = 0; i < btnsEdit.length; i++) {
  const id = btnsEdit[i].getAttribute('data-id');
  btnsEdit[i].onclick = () => {
    window.location.href = `/district/edit/${id}`;
  };
}

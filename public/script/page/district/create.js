const formAdd = document.getElementById('formAdd');

formAdd.onsubmit = async (e) => {
  e.preventDefault();

  const inputName = document.getElementById('inputName');

  const urlencoded = new URLSearchParams();
  urlencoded.append('name', inputName.value);

  const response = await fetch('/admin/district', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: urlencoded,
  });
  if (response.status === 201) {
    window.location.href = '/admin/district';
  }
};

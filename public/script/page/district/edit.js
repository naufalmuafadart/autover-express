const formEdit = document.getElementById('formEdit');

formEdit.onsubmit = async (e) => {
  e.preventDefault();

  const inputId = document.getElementsByName('id')[0];
  const inputName = document.getElementById('inputName');

  const urlencoded = new URLSearchParams();
  urlencoded.append('name', inputName.value);

  const response = await fetch(`/api/district/${inputId.value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'X-HTTP-Method-Override': 'PUT',
    },
    body: urlencoded,
  });
  if (response.status === 200) {
    window.location.href = '/district';
  }
};

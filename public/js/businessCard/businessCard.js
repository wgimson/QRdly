/* eslint-env jquery, browser */
document.addEventListener('DOMContentLoaded', () => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelectorAll('#frmCreateBusinessCard')[0];

  function submitForm(e) {
    e.preventDefault();
    // const name = document.getElementById('name');
    const img = document.getElementById('logoImg');
    const formData = new FormData();
    // formData.append('name', name.value);
    for (let i = 0; i < img.files.length; i++) {
      formData.append('img', img.files[i]);
    }
    fetch('/dashboard/business-card/create', {
      method: 'post',
      body: formData
    })
      .then((res) => console.log(res))
      .catch((err) => ('Error occured', err));
  }

  form.addEventListener('submit', submitForm);
});

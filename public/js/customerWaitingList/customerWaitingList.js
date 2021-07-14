/* eslint-env jquery, browser */
$(() => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('#frmCreateBusinessCard');
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
});

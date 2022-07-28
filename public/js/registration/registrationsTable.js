/* eslint-env jquery, browser */
(() => {
  function showRegistrationDetails(e) {
    console.log('hello');
    e.preventDefault();
    const id = e.currentTarget.parm.getAttribute('data-id');
    axios.get(`/signup/${id}`)
      .then((response) => {
        console.log('success');
        document.open();
        document.write(response.data);
        document.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btnRegistrationDetails = document.querySelectorAll('.btnRegistrationDetails');
    btnRegistrationDetails.forEach((det) => {
      det.addEventListener('click', showRegistrationDetails, false);
      det.parm = det;
    });
  });
})();

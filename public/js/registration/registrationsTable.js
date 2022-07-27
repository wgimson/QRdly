/* eslint-env jquery, browser */
(() => {
  function showRegistrationDetails(e) {
    e.preventDefault();
  }

  document.addEventListener('DOMContentLoaded', () => {
    console.log('hello');
    const btnRegistrationDetails = document.querySelectorAll('.btnRegistrationDetails');
    btnRegistrationDetails.forEach((det) => {
      det.addEventListener('click', showRegistrationDetails);
    });
  });
})();

/* eslint-env jquery, browser */
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // register billing address from to appear if the user selects different address
    const sameAsBillingAddress = document.querySelector('#chkbxSameAsBilling');
    // eslint-disable-next-line no-use-before-define
    sameAsBillingAddress.addEventListener('input', toggleBillingAddressForm);
  });

  function toggleBillingAddressForm(e) {
    e.preventDefault();
    const shippingAddressGroup = document.querySelector('#shipping-address');
    if (shippingAddressGroup.style.display === 'none') {
      shippingAddressGroup.style.display = 'block';
    } else {
      shippingAddressGroup.style.display = 'none';
    }
  }
})();

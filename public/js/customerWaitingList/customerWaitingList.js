/* eslint-env jquery, browser */
$(() => {
  function editCustomer() {
    const thiss = $(this);
    console.log(`lets edit: ${thiss.attr('data-id')}`);
  }

  $('.btn-edit-customer').on('click', editCustomer);
});

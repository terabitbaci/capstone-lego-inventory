//jquery related functionality
//definitions: function , objects/data, variables, etc.

///////////////////////////////////////////////////////////////////
//Invocations (calling)& function Triggers
// When the page loads
$(function () {
    $('.hide-everything').hide();
    $('#landingPage').show();
    $('#inventory-filters').hide();
    $('#inventory-table').hide();
});

$(".signup-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#inventoryPage').show();
});

$('#change-form-login').click(function (event) {
    event.preventDefault();
    location.reload();
});

$(".login-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#inventoryPage').show();
});

$('#change-form-signup').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#signUpPage').show();
});

$(".add-to-inventory-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#inventoryPage').show();
    $('#inventory-filters').show();
    $('#inventory-table').show();
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();


});

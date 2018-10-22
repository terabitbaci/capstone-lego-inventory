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
    $('.inventory-part-details-wrapper').parent().hide();
    $('.inventory-MOC-details-wrapper').parent().hide();
    $('.inventory-set-details-wrapper').parent().hide();
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

$('.showPartDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().show();
});

$('.showMOCDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().show();
});

$('.showSetDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().show();
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

$('#filterViewButtons select').change(function (event) {
    event.preventDefault();
    alert("view all clicked");
});

$('#filterLockButtons select').change(function (event) {
    event.preventDefault();
    alert("include permanent clicked");
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();


});

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
    $('#searchPage').hide();
    $('#searchResultsActionSubpage').hide();
    $('#buildCalculationSubpage').hide();
    $('#wishlistPage').hide();
});

$('#menu-inventory').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#inventoryPage').show();
    $('#inventory-filters').hide();
    $('#inventory-table').hide();
    $('.inventory-part-details-wrapper').parent().hide();
    $('.inventory-MOC-details-wrapper').parent().hide();
    $('.inventory-set-details-wrapper').parent().hide();
});

$('#menu-wishlist').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#wishlistPage').show();
    $('#inventory-filters').hide();
    $('#inventory-table').hide();
    $('.inventory-part-details-wrapper').parent().hide();
    $('.inventory-MOC-details-wrapper').parent().hide();
    $('.inventory-set-details-wrapper').parent().hide();
});

$('#menu-plan').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#buildPage').show();
    $('#inventory-filters').hide();
    $('#inventory-table').hide();
    $('.inventory-part-details-wrapper').parent().hide();
    $('.inventory-MOC-details-wrapper').parent().hide();
    $('.inventory-set-details-wrapper').parent().hide();
});

$('#menu-search').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#searchPage').show();
    $('#inventory-filters').hide();
    $('#inventory-table').hide();
    $('.inventory-part-details-wrapper').parent().hide();
    $('.inventory-MOC-details-wrapper').parent().hide();
    $('.inventory-set-details-wrapper').parent().hide();
});

$(".login-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $(".login-form-username").val();
    const password = $(".login-form-password").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                //            htmlUserDashboard();

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    };
});

$('#change-form-signup').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#signUpPage').show();
});

$(".signup-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $(".signup-form-username").val();
    const password = $(".signup-form-password").val();

    //validate the input
    if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            username: username,
            password: password
        };
        console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                //            populateUserDashboardDate(result.username);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$('#change-form-login').click(function (event) {
    event.preventDefault();
    location.reload();
});

$(".add-to-inventory-form").submit(function (event) {
    event.preventDefault();
    //take the input from the user
    const itemNum = $(".number-form-number").val();
    const itemType = $(".number-form-type").val();
    const loggedInUserName = $("#loggedInUserName").val();

    //validate the input
    if (itemNum == "") {
        alert('Please enter item number');
    }
    //if the input is valid
    else {

        //create the payload object (what data we send to the api call)
        const entryObject = {
            itemNum: itemNum,
            itemType: itemType,
            loggedInUserName: loggedInUserName,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/item/create',
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                $('#add-entry-container').hide();
                //                noEntries();
                //Add Entry to page
                $('#user-list').prepend(addEntryRenderHTML(result));
                $('html, body').animate({
                    scrollTop: $(`#${result._id}`).offset().top
                }, 1000);

                //                $().scrollTop();

                //                updateEditFormValues(result);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
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

$('.showPartDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().toggle("slow");
});

$('.showMOCDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().toggle("slow");
});

$('.showSetDetails').click(function (event) {
    event.preventDefault();
    $(this).parent().parent().next().toggle("slow");
});

$('.itemLock').click(function (event) {
    event.preventDefault();
    $(this).parent().find(".itemLock").toggleClass("itemLockActive");
});

$('.deleteBtn').click(function (event) {
    event.preventDefault();
    alert("item(s) deleted from Inventory");
});

$(".search-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#searchPage').show();
    $('#searchResultsActionSubpage').show();
});

$('.newTabRebrickable').click(function (event) {
    event.preventDefault();
    alert("open a new tab in Rebrickable");
});

$('.inventoryAddBtn').click(function (event) {
    event.preventDefault();
    alert("item(s) added to Inventory");
});

$('.addWishBtn').click(function (event) {
    event.preventDefault();
    alert("item(s) added to Wishlist");
});

$(".plan-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#buildPage').show();
    $('#buildCalculationSubpage').show();
});

$('.printBtn').click(function (event) {
    event.preventDefault();
    alert("list of needed parts sent to printer");
});

$(".wishlist-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#wishlistPage').show();
});

$('.viewBuild').click(function (event) {
    event.preventDefault();
    $(this).parent().find(".viewBuild").removeClass("fa-toggle-on");
    $(this).parent().find(".viewBuild").addClass("fa-toggle-off");
    alert("viewing the build")
});

$('.removeBuild').click(function (event) {
    event.preventDefault();
    alert("build is removed\r(Removing a MOC build subtracts the needed parts from your Wishlist)");
});

$(".recalculate").click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#wishlistPage').show();
    alert("recalculating")
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();
});

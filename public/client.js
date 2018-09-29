//jquery related functionality
//definitions: function , objects/data, variables, etc.

///////////////////////////////////////////////////////////////////
//Invocations (calling)& function Triggers
// When the page loads
$(function () {
    $('.hide-everything').hide();
    $('#landingPage').show();
});

$(".sign-up-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const name = $("#signUpName").val();
    const username = $("#signUpUsername").val();
    const password = $("#signUpPassword").val();

    //validate the input
    if (name == "") {
        alert('Please add a name');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            name: name,
            username: username,
            password: password
        };
        //console.log(newUserObject);

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
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                populateUserDashboardDate(result.username);
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

$(".login-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

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
        //console.log(loginUserObject);

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
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                //            htmlUserDashboard();
                populateUserDashboardDate(result.username); //AJAX call in here??
                //                noEntries();

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

$(".entry-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const entryType = $(".addEntryType").val();
    const inputDate = $(".addInputDate").val();
    const inputPlay = $(".addInputPlay").val();
    const inputAuthor = $(".addInputAuthor").val();
    const inputRole = $(".addInputRole").val();
    const inputCo = $(".addInputCo").val();
    const inputLocation = $(".addInputLocation").val();
    const inputNotes = $(".addInputNotes").val();
    const loggedInUserName = $("#loggedInUserName").val();

    //validate the input
    if (entryType == "") {
        alert('Please input entry type');
    } else if (inputDate == "") {
        alert('Please input addInputDate');
    } else if (inputPlay == "") {
        alert('Please input addInputPlay');
    } else if (inputAuthor == "") {
        alert('Please input addInputAuthor');
    } else if (inputNotes == "") {
        alert('Please input addInputNotes');
    }
    //if the input is valid
    else {

        //create the payload object (what data we send to the api call)
        const entryObject = {
            entryType: entryType,
            inputDate: inputDate,
            inputPlay: inputPlay,
            inputAuthor: inputAuthor,
            inputRole: inputRole,
            inputCo: inputCo,
            inputLocation: inputLocation,
            inputNotes: inputNotes,
            loggedInUserName: loggedInUserName,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/entry/create',
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
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();


});

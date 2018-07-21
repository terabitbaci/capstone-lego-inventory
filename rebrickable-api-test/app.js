//curl - X GET--header 'Accept: application/json'--header 'Authorization: key 4f8845c5d9212c179c08fe6f0e0d2d0c' 'https://rebrickable.com/api/v3/lego/sets/42053-1/parts/'

function getDataFromApi(setNum) {

    // make the api call
    $.ajax({
            type: "GET",
            url: 'https://rebrickable.com/api/v3/lego/sets/' + setNum + '/parts/',
            data: {
                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
            },
            dataType: 'json',
        })

        // if api call is successful
        .done(function (dataOutput) {

            //displays the external api json object in the console
            console.log(dataOutput);
            displaySearchData(dataOutput);
        })

        // if api call is a failure
        .fail(function (jqXHR, error, errorThrown) {

            //display errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};



function displaySearchData(data) {

    //validate results
    //if the are no results
    if (data.parts == "") {

        //show and alert
        alert("No results");
    }

    //if there are results
    else {

        //display them in the html page (use "<pre><code>" to auto format the lyrics)
        $('.js-search-results').html("<pre><code>" + data.lyrics + "</code></pre>");
    }
}



function watchSubmit() {

    //triger for the form submission
    $(".js-search-form").submit(function (event) {

        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //get the Lego set number (value) from the input box
        let setNum = $(event.currentTarget).find('.js-query').val();

        //validate artist
        if (setNum == '') {
            alert("Please enter a LEGO set");
        }


        //use that Lego set number value to call the getResults function defined at the top
        getDataFromApi(setNum);
    });
}



$(watchSubmit);

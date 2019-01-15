//jquery related functionality
//definitions: function , objects/data, variables, etc.
function getTotalInInventory(itemNumber, itemType, loggedInUserName) {
    if (itemType == 'part') {
        // search for total number of this part in the inventory
        $.ajax({
                type: 'GET',
                url: '/inventory-part/count/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //console.log(result);
                $(".totalInInventoryValue" + itemNumber).text(result.totalQuantity);
                $(".totalInInventoryAvailable" + itemNumber).text(result.totalAvailable);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (itemType == 'set') {
        // search for total number of this set in the inventory
    } else if (itemType == 'moc') {
        // search for total number of this moc in the inventory
    }
}

function getInYourSets(itemNumber, itemType, loggedInUserName) {
    if (itemType == 'part') {
        // search for total number of this part in the inventory
        $.ajax({
                type: 'GET',
                url: '/inventory-part/get-in-your-sets/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //console.log(result);
                $(".in-your-sets-" + itemNumber).text(result.totalInYourSetsString);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (itemType == 'set') {
        // search for total number of this set in the inventory
    } else if (itemType == 'moc') {
        // search for total number of this moc in the inventory
    }
}


function showInventory(loggedInUserName) {
    $.ajax({
            type: 'GET',
            url: '/inventory-part/show-aggregate/' + loggedInUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (aggregateResult) {
            //            console.log(aggregateResult);
            //            console.log(aggregateResult.parts);
            // check to see if there are any parts in the inventory
            if (aggregateResult.parts.length == 0) {
                alert("no parts in the inventory");
            } else {
                //BOOKMARK - uncomment this after the sets and mocs are displayed dynamically in the inventory
                //$("#inventory-table>table").html("");
                $.each(aggregateResult.parts, function (aggregatedResultKey, aggregatedResultValue) {
                    //show the details of the aggregated parts
                    $.ajax({
                            type: 'GET',
                            url: '/inventory-part/show-details/' + loggedInUserName + '/' + aggregatedResultValue._id,
                            dataType: 'json',
                            contentType: 'application/json'
                        })
                        //if call is successful
                        .done(function (detailedResult) {
                            //                            console.log(detailedResult);
                            //                            console.log(detailedResult.parts);
                            let buildTheHtmlOutput = "";
                            let currentPartNumber = "";
                            let oldPartNumber = "";
                            // check to see if there are any parts in the inventory
                            if (detailedResult.parts.length == 0) {
                                alert("no parts in the inventory");
                            } else {
                                $.each(detailedResult.parts, function (resultKey, resultValue) {
                                    currentPartNumber = resultValue.part_num;

                                    //console.log(currentPartNumber, oldPartNumber);
                                    //if the part number is not duplicated
                                    if (currentPartNumber != oldPartNumber) {
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showPartDetails">' + resultValue.part_num + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<a href="#" class="showPartDetails">';
                                        buildTheHtmlOutput += '<img src="' + resultValue.part_img_url + '" alt="' + resultValue.part_name + '" height="60px">';
                                        buildTheHtmlOutput += '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showPartDetails">' + resultValue.part_name + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<input type="hidden" value="' + resultValue.part_name + '" class="itemLockPartNameValue">';

                                        //if the item is not locked ...
                                        if (resultValue.permanent_build == 0) {
                                            //display it as is
                                            buildTheHtmlOutput += '<input type="hidden" value="0" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLock">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }
                                        //if it is locked ...
                                        else {
                                            //display the lock icon instead
                                            buildTheHtmlOutput += '<input type="hidden" value="1" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLock itemLockActive">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }

                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        buildTheHtmlOutput += '<tr style="display: none;">';
                                        buildTheHtmlOutput += '<td class="inventory-part-details-wrapper" colspan="4">';
                                        //                    buildTheHtmlOutput += 'PART details';
                                        buildTheHtmlOutput += '<table class="inventory-part-details">';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<th colspan="2">' + resultValue.part_num + '</th>';
                                        buildTheHtmlOutput += '<th colspan="4">' + resultValue.part_name + '</th>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"><img src="' + resultValue.part_img_url + '" alt="' + resultValue.part_name + '" height="90px"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">total in inventory</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryValue' + resultValue.part_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">available</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryAvailable' + resultValue.part_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        if (resultValue.set_num != 0) {
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">in your sets</td>';
                                            buildTheHtmlOutput += '<td colspan="2" class="in-your-sets-' + resultValue.part_num + '"></td>';
                                            buildTheHtmlOutput += '</tr>';
                                            buildTheHtmlOutput += '<tr>';
                                        }
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">appears in years</td>';
                                        buildTheHtmlOutput += '<td colspan="2">' + resultValue.part_year_from + ' - ' + resultValue.part_year_to + '</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">Wishlist';
                                        buildTheHtmlOutput += '<i class="fas fa-shopping-cart"></i>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td colspan="2">14</td>';
                                        buildTheHtmlOutput += '</tr>';

                                        //only delete parts that are not in permanent sets or mocs and no more than the max available value
                                        //if the part is not locked show the delete functionality
                                        //othewise display message to unlock
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<input type="number" class="sm-input" value="1" min="1" max="50">';
                                        buildTheHtmlOutput += '<input type="hidden" class="deletePartNumValue" value="' + resultValue.part_num + '" >';
                                        buildTheHtmlOutput += '<button class="sm-btn deleteBtn">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">delete from Inventory</span>';
                                        buildTheHtmlOutput += '<i class="fas fa-minus-circle"> </i>';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</button>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Big collector? Enter a bin/drawer storage location.</span>bin/storage location';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>23-7</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '</table>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';

                                        //call the function to populate the inventory value
                                        getTotalInInventory(resultValue.part_num, "part", loggedInUserName);

                                        //call the function to dynamically populate "in your sets"
                                        getInYourSets(resultValue.part_num, "part", loggedInUserName);

                                        //check if the current part was already shown (so it doesn't show twice)
                                        oldPartNumber = currentPartNumber;
                                    }

                                });
                                //use the HTML output to show it in the index.html
                                $("#inventory-table>table").append(buildTheHtmlOutput);
                                $('#inventoryPage').show();
                                $('#inventory-filters').show();
                                $('#inventory-table').show();
                                $('#inventory-part-details-wrapper').hide();
                            }
                        })
                        //if the call is failing
                        .fail(function (jqXHR, error, errorThrown) {
                            console.log(jqXHR.status);
                            console.log(error);
                            console.log(errorThrown);
                        });
                });

            }
        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR.status);
            console.log(error);
            console.log(errorThrown);
        });
}

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
    const loggedInUserName = $("#loggedInUserName").val();
    showInventory(loggedInUserName);
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
            //if call is successful
            .done(function (result) {
                console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                showInventory(result.username);
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
            //if call is successful
            .done(function (result) {
                console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                showInventory(result.username);
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
            //if call is successful
            .done(function (result) {
                console.log(result);
                //                $('#loggedInName').text(result.name);
                //                $('#loggedInUserName').val(result.username);
                $('.hide-everything').hide();

                showInventory(loggedInUserName);

                $('#inventoryPage').show();
                $('#inventory-filters').show();
                $('#inventory-table').show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                if (jqXHR.status == "444") {
                    alert("The " + itemType + " with number " + itemNum + " was not found")
                }
                console.log(error);
                console.log(errorThrown);
                // if no results, check if the item number ends with "-1"
                if (itemNum.includes("-1") == false) {
                    // if the doesn't end with "-1", add "-1" and make the api call one more time
                    const entryObject = {
                        itemNum: itemNum + "-1",
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
                        //if call is successful
                        .done(function (result) {
                            console.log(result);
                            //                            $('#loggedInName').text(result.name);
                            //                            $('#loggedInUserName').val(result.username);
                            $('.hide-everything').hide();
                            $('#inventoryPage').show();
                            $('#inventory-filters').show();
                            $('#inventory-table').show();
                            showInventory(loggedInUserName);
                        })
                        //if the call is failing
                        .fail(function (jqXHR, error, errorThrown) {
                            console.log(jqXHR.status);
                            if (jqXHR.status == "444") {
                                alert("The second search for the " + itemType + " with number " + itemNum + "-1 also returned no results")
                            }
                            console.log(error);
                            console.log(errorThrown);
                        });
                }

            });
    };
});

$('#filterViewButtons select').change(function (event) {
    event.preventDefault();
    alert("view all clicked");
});

$('#filterLockButtons select').change(function (event) {
    event.preventDefault();
    alert("include permanent clicked");
});

$(document).on("click", ".showPartDetails", function (event) {
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

$(document).on('click', '.itemLock', function (event) {
    event.preventDefault();
    $(this).parent().find(".itemLock").toggleClass("itemLockActive");
    let itemLockPartNameValue = $(this).parent().find(".itemLockPartNameValue").val();
    let itemLockPermanentBuildValue = $(this).parent().find(".itemLockPermanentBuildValue").val();
    updatedItemLockPermanentBuildValue = 0;
    //if the item is permanent build switch to the opposite
    if (itemLockPermanentBuildValue == 1) {
        updatedItemLockPermanentBuildValue = 0;
    } else {
        updatedItemLockPermanentBuildValue = 1;
    }
    console.log(itemLockPartNameValue);
    //create the payload object (what data we send to the api call)
    const updatePartByNameObject = {
        part_name: itemLockPartNameValue,
        permanent_build: updatedItemLockPermanentBuildValue
    };

    //make the api call using the payload above
    $.ajax({
            type: 'PUT',
            url: '/inventory-part/update-permanent-build',
            dataType: 'json',
            data: JSON.stringify(updatePartByNameObject),
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (result) {
            console.log(result);
            //            $('.hide-everything').hide();
            //            $('#inventoryPage').show();
            //            $('#loggedInName').text(result.username);
            //            $('#loggedInUserName').val(result.username);
            //            showInventory(result.username);
        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Incorrect Username or Password');
        });
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

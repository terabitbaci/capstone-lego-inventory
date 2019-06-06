//jquery related functionality
//definitions: function , objects/data, variables, etc.

//DOM error logger
function displayError(message, identifier, timer = 1) {

    //console.log(message, identifier);

    //create the new message html
    $("#messageBox").append("<span>" + message + "</span>");

    //display the new message
    $("#messageBox").fadeIn();

    //only hide the old message if a new one becomes active
    if (timer != 0) {
        $("#messageBox").fadeOut(15000);
    }

    // if there are more than 3 spans, delete the first one
    let count = $("#messageBox").children().length;
    //    console.log(count);
    if (count > 3) {
        $("#messageBox span:first-child").remove();
    }
};

function applyFilterLockButtons() {
    let selectedOption = $("#filterLockButtons select").val();
    //console.log("applyFilterLockButtons ==>", selectedOption);
    if (selectedOption == "see") {
        $(".itemLockSet").parent().parent().show();
        $(".itemLockMoc").parent().parent().show();
        $(".itemLockPart").parent().parent().show();
    } else if (selectedOption == "hide") {
        console.log("applyFilterLockButtons else ==>", $(".itemLockActive").parent().parent().next());
        $(".itemLockActive").parent().parent().hide();
        $(".itemLockActive").parent().parent().next().hide();
    }
}

function getPartsToDelete(itemNumber, itemType, loggedInUserName) {
    if (itemType == 'part') {
        // search for total number of this part in the inventory
        $.ajax({
                type: 'GET',
                url: '/inventory-part/show-details/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //console.log(result);


                let buildTheHtmlOutput = "<table>";

                $.each(result.parts, function (resultKey, resultValue) {
                    buildTheHtmlOutput += '<tr>';

                    buildTheHtmlOutput += '<td>Delete up to ';
                    buildTheHtmlOutput += resultValue.quantity;
                    buildTheHtmlOutput += ' from set / moc / part ';
                    buildTheHtmlOutput += resultValue.set_num;
                    buildTheHtmlOutput += '</td>';

                    buildTheHtmlOutput += '<td>';
                    buildTheHtmlOutput += '<input type="number" class="sm-input deleteFromInventoryValue' + resultValue.part_num + '" value="1" min="1" max="' + resultValue.quantity + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="sm-input deletePartMaxQuantityValue' + resultValue.part_num + '" value="' + resultValue.quantity + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="deletePartNumValue" value="' + resultValue.part_num + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deletePartIDValue" value="' + resultValue._id + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deletePartQuantityValue" value="' + resultValue.quantity + '" >';
                    buildTheHtmlOutput += '<button class="sm-btn deleteBtnPart">';
                    buildTheHtmlOutput += '<div class="tooltip">';
                    buildTheHtmlOutput += '<span class="tooltiptext">delete from Inventory</span>';
                    buildTheHtmlOutput += '<i class="fas fa-minus-circle"> </i>';
                    buildTheHtmlOutput += '</div>';
                    buildTheHtmlOutput += '</button>';
                    buildTheHtmlOutput += '</td>';
                    buildTheHtmlOutput += '</tr>';
                });
                buildTheHtmlOutput += '</table>';

                $(".getPartsToDelete" + itemNumber).html(buildTheHtmlOutput);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (itemType == 'set') {
        // search for total number of this set in the inventory

        $.ajax({
                type: 'GET',
                url: '/inventory-set/show-details/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //                console.log(result);


                let buildTheHtmlOutput = "";

                $.each(result.sets, function (resultKey, resultValue) {
                    buildTheHtmlOutput = "";
                    $(".getSetsToDelete" + itemNumber).html("");
                    buildTheHtmlOutput += '<table>';
                    buildTheHtmlOutput += '<tr>';

                    buildTheHtmlOutput += '<td>Delete all or just 1 set at a time (';
                    buildTheHtmlOutput += resultValue.set_num;
                    buildTheHtmlOutput += ')</td>';

                    buildTheHtmlOutput += '<td>';
                    buildTheHtmlOutput += '<input type="number" class="sm-input deleteFromInventoryValue' + resultValue.set_num + '" value="1" min="1" max="1">';
                    buildTheHtmlOutput += '<input type="hidden" class="sm-input deleteSetMaxQuantityValue' + resultValue.set_num + '" value="' + (resultKey + 1) + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteSetNumValue" value="' + resultValue.set_num + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteSetIDValue" value="' + resultValue._id + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteSetQuantityValue" value="' + (resultKey + 1) + '" >';
                    buildTheHtmlOutput += '<button class="sm-btn deleteBtnSet">';
                    buildTheHtmlOutput += '<div class="tooltip">';
                    buildTheHtmlOutput += '<span class="tooltiptext">delete from Inventory</span>';
                    buildTheHtmlOutput += '<i class="fas fa-minus-circle"> </i>';
                    buildTheHtmlOutput += '</div>';
                    buildTheHtmlOutput += '</button>';
                    buildTheHtmlOutput += '</td>';
                    buildTheHtmlOutput += '</tr>';
                    buildTheHtmlOutput += '</table>';
                    $(".getSetsToDelete" + itemNumber).html(buildTheHtmlOutput);
                });
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (itemType == 'moc') {
        // search for total number of this moc in the inventory

        $.ajax({
                type: 'GET',
                url: '/inventory-moc/show-details/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //                console.log(result);


                let buildTheHtmlOutput = "";

                $.each(result.mocs, function (resultKey, resultValue) {
                    buildTheHtmlOutput = "";
                    $(".getMocsToDelete" + itemNumber).html("");
                    buildTheHtmlOutput += '<table>';

                    buildTheHtmlOutput += '<tr>';

                    buildTheHtmlOutput += '<td>Delete all or just 1 MOC at a time (';
                    buildTheHtmlOutput += resultValue.moc_num;
                    buildTheHtmlOutput += ')</td>';


                    buildTheHtmlOutput += '<td>';
                    buildTheHtmlOutput += '<input type="number" class="sm-input deleteFromInventoryValue' + resultValue.moc_num + '" value="1" min="1" max="1">';
                    buildTheHtmlOutput += '<input type="hidden" class="sm-input deleteMocMaxQuantityValue' + resultValue.moc_num + '" value="' + (resultKey + 1) + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteMocNumValue" value="' + resultValue.moc_num + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteMocIDValue" value="' + resultValue._id + '" >';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteMocQuantityValue" value="' + (resultKey + 1) + '" >';
                    buildTheHtmlOutput += '<button class="sm-btn deleteBtnMoc">';
                    buildTheHtmlOutput += '<div class="tooltip">';
                    buildTheHtmlOutput += '<span class="tooltiptext">delete from Inventory</span>';
                    buildTheHtmlOutput += '<i class="fas fa-minus-circle"> </i>';
                    buildTheHtmlOutput += '</div>';
                    buildTheHtmlOutput += '</button>';
                    buildTheHtmlOutput += '</td>';
                    buildTheHtmlOutput += '</tr>';

                    buildTheHtmlOutput += '</table>';
                    $(".getMocsToDelete" + itemNumber).html(buildTheHtmlOutput);
                });
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    }
}

function getTotalInInventory(itemNumber, itemType, loggedInUserName) {
    //console.log(itemNumber, itemType, loggedInUserName);
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
                $(".totalInWishListAvailable" + itemNumber).text(result.totalInWishList);
                $(".deletePartMaxQuantityValue" + itemNumber).val(result.totalAvailable);
                $(".deleteFromInventoryValue" + itemNumber).attr({
                    "max": result.totalAvailable
                });
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
    } else if (itemType == 'set') {
        // search for total number of this set in the inventory
        $.ajax({
                type: 'GET',
                url: '/inventory-set/count/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                //console.log(result);
                $(".totalInInventoryValue" + itemNumber).text(result.totalQuantity);
                $(".totalInInventoryAvailable" + itemNumber).text(result.totalAvailable);
                $(".totalInWishListAvailable" + itemNumber).text(result.totalInWishList);
                $(".deletePartMaxQuantityValue" + itemNumber).val(result.totalAvailable);
                $(".deleteFromInventoryValue" + itemNumber).attr({
                    "max": result.totalAvailable
                });
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });


    } else if (itemType == 'moc') {
        // search for total number of this moc in the inventory
        $.ajax({
                type: 'GET',
                url: '/inventory-moc/count/' + loggedInUserName + '/' + itemNumber,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if call is successful
            .done(function (result) {
                // console.log(result);
                $(".totalInInventoryValue" + itemNumber).text(result.totalQuantity);
                $(".totalInInventoryAvailable" + itemNumber).text(result.totalAvailable);
                $(".totalInWishListAvailable" + itemNumber).text(result.totalInWishList);
                $(".deletePartMaxQuantityValue" + itemNumber).val(result.totalAvailable);
                $(".deleteFromInventoryValue" + itemNumber).attr({
                    "max": result.totalAvailable
                });
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                console.log(error);
                console.log(errorThrown);
            });
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

        $.ajax({
                type: 'GET',
                url: '/inventory-set/get-in-your-sets/' + loggedInUserName + '/' + itemNumber,
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

    } else if (itemType == 'moc') {
        // search for total number of this moc in the inventory

        $.ajax({
                type: 'GET',
                url: '/inventory-moc/get-in-your-sets/' + loggedInUserName + '/' + itemNumber,
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
    }
}


function showSetsInInventory(loggedInUserName, callback) {
    //    console.log("inside showSetsInInventory");
    $.ajax({
            type: 'GET',
            url: '/inventory-set/show-aggregate/' + loggedInUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (aggregateResult) {
            //console.log(aggregateResult);

            $("#inventory-table #inventory-sets-table").html("");
            // check to see if there are any parts in the inventory
            if (aggregateResult.sets.length == 0) {
                //displayError("no sets in the inventory", "showSetsInInventory-function");
                let displayErrorSets = '<tr class="inventory-item"><td>No sets in the inventory</td></tr>';
                $("#inventory-table #inventory-sets-table").html(displayErrorSets);
                $("#inventory-table").show();
            } else {
                //create the table head separately from the rest of the rows
                let buildTheHeaderOutput = "";
                buildTheHeaderOutput += '<tr>';
                buildTheHeaderOutput += '<th>Set number</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">image</th>';
                buildTheHeaderOutput += '<th>name</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">';
                buildTheHeaderOutput += '<div class="tooltip">';
                buildTheHeaderOutput += '<span class="tooltiptext">click the lock for a permanent build</span>';
                buildTheHeaderOutput += '<i class="fas fa-lock fa-lg"> </i>';
                buildTheHeaderOutput += '</div>';
                buildTheHeaderOutput += '</th>';
                buildTheHeaderOutput += '</tr>';
                $("#inventory-table #inventory-sets-table").append(buildTheHeaderOutput);


                //add the rest of the rows to the table
                $.each(aggregateResult.sets, function (aggregatedResultKey, aggregatedResultValue) {
                    //show the details of the aggregated parts
                    $.ajax({
                            type: 'GET',
                            url: '/inventory-set/show-details/' + loggedInUserName + '/' + aggregatedResultValue._id,
                            dataType: 'json',
                            contentType: 'application/json'
                        })
                        //if call is successful
                        .done(function (detailedResult) {
                            //console.log("detailed results sets", detailedResult);
                            //                            console.log(detailedResult.parts);
                            let buildTheHtmlOutput = "";

                            //bookmark test the output of the sets

                            let currentSetNumber = "";
                            let oldSetNumber = "";
                            // check to see if there are any sets in the inventory
                            if (detailedResult.sets.length == 0) {
                                //                                displayError("no aggregated sets in the inventory", "showSetsInInventory-function");
                            } else {
                                $.each(detailedResult.sets, function (resultKey, resultValue) {
                                    currentSetNumber = resultValue.set_num;

                                    //console.log(currentSetNumber, oldSetNumber);
                                    //if the set number is not duplicated
                                    if (currentSetNumber != oldSetNumber) {
                                        buildTheHtmlOutput += '<tr class="inventory-item">';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showSetDetails">' + resultValue.set_num + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<a href="#" class="showSetDetails">';
                                        buildTheHtmlOutput += '<img src="' + resultValue.set_img_url + '" alt="' + resultValue.set_name + '" height="60px">';
                                        buildTheHtmlOutput += '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showSetDetails">' + resultValue.set_name + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<input type="hidden" value="' + resultValue.set_name + '" class="itemLockSetNameValue">';

                                        //if the item is not locked ...
                                        //                                        console.log(resultValue.permanent_build);
                                        if (resultValue.permanent_build == 0) {
                                            //display it as is
                                            buildTheHtmlOutput += '<input type="hidden" value="0" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLockSet">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }
                                        //if it is locked ...
                                        else {
                                            //display the lock icon instead
                                            buildTheHtmlOutput += '<input type="hidden" value="1" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLockSet itemLockActive">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }

                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        buildTheHtmlOutput += '<tr  class="inventory-item-details" style="display: none;">';
                                        buildTheHtmlOutput += '<td class="inventory-set-details-wrapper" colspan="4">';
                                        //                    buildTheHtmlOutput += 'PART details';
                                        buildTheHtmlOutput += '<table class="inventory-set-details">';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<th colspan="2">' + resultValue.set_num + '</th>';
                                        buildTheHtmlOutput += '<th colspan="4">' + resultValue.set_name + '</th>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"><img src="' + resultValue.set_img_url + '" alt="' + resultValue.set_name + '" height="90px"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">total in inventory</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryValue' + resultValue.set_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">available</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryAvailable' + resultValue.set_num + '">-</td>';

                                        buildTheHtmlOutput += '</tr>';
                                        //                                        if (resultValue.set_num != 0) {
                                        //
                                        //                                            buildTheHtmlOutput += '<tr>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2">in your sets</td>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2" class="in-your-sets-' + resultValue.set_num + '"></td>';
                                        //                                            buildTheHtmlOutput += '</tr>';
                                        //                                            buildTheHtmlOutput += '<tr>';
                                        //                                        }
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">appears in years</td>';
                                        buildTheHtmlOutput += '<td colspan="2">' + resultValue.year + '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Big collector? Enter a bin/drawer storage location.</span>bin/storage location';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';

                                        buildTheHtmlOutput += '<input type="hidden" class="storageBinSetNumValue" value="' + resultValue.set_num + '" >';
                                        buildTheHtmlOutput += '<input type="text" class="storageBinValueSet" value="' + resultValue.storage_location + '" placeholder="Enter storage location">';
                                        buildTheHtmlOutput += '<button class="sm-btn storageBinButtonSet">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Add bin/drawer storage location</span>';
                                        buildTheHtmlOutput += '<i class="fas fa-plus-circle"> </i>';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</button>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">Wishlist';
                                        buildTheHtmlOutput += '<i class="fas fa-shopping-cart"></i>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInWishListAvailable' + resultValue.set_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        //only delete sets that are not permanent and no more than the max available value
                                        //if the set is not locked show the delete functionality
                                        //othewise display message to unlock

                                        //if the part is not locked
                                        if (resultValue.permanent_build == 0) {
                                            //show the delete functionality
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td class="getSetsToDelete' + resultValue.set_num + '">';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        } else {
                                            //display message to unlock it first
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td>';
                                            buildTheHtmlOutput += 'unlock this set in order to delete it';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        }



                                        buildTheHtmlOutput += '</table>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';

                                        //call the function to populate the inventory value
                                        getTotalInInventory(resultValue.set_num, "set", loggedInUserName);
                                        getPartsToDelete(resultValue.set_num, "set", loggedInUserName);

                                        //call the function to dynamically populate "in your sets"
                                        //getInYourSets(resultValue.set_num, "set", loggedInUserName);

                                        //check if the current set was already shown (so it doesn't show twice)
                                        oldSetNumber = currentSetNumber;
                                    }

                                });
                                //use the HTML output to show it in the index.html
                                $("#inventory-table #inventory-sets-table").append(buildTheHtmlOutput);
                                $('#inventoryPage').show();
                                $('#inventory-filters').show();
                                $('#inventory-table').show();
                                $('#inventory-set-details-wrapper').hide();
                                applyFilterLockButtons();
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

    if (callback && typeof (callback) === "function") {
        //run the call back function too
        callback();
    }
}

function showMocsInInventory(loggedInUserName, callback) {
    //    console.log("inside showMocsInInventory");
    $.ajax({
            type: 'GET',
            url: '/inventory-moc/show-aggregate/' + loggedInUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (aggregateResult) {
            //console.log(aggregateResult);
            $("#inventory-table #inventory-mocs-table").html("");
            // check to see if there are any parts in the inventory
            if (aggregateResult.mocs.length == 0) {
                //displayError("no mocs in the inventory", "showMocsInInventory-function");
                let displayErrorMocs = '<tr class="inventory-item"><td>No MOCs in the inventory</td></tr>';
                $("#inventory-table #inventory-mocs-table").html(displayErrorMocs);
                $("#inventory-table").show();
            } else {
                //create the table head separately from the rest of the rows
                let buildTheHeaderOutput = "";
                buildTheHeaderOutput += '<tr>';
                buildTheHeaderOutput += '<th>MOC number</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">image</th>';
                buildTheHeaderOutput += '<th>name</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">';
                buildTheHeaderOutput += '<div class="tooltip">';
                buildTheHeaderOutput += '<span class="tooltiptext">click the lock for a permanent build</span>';
                buildTheHeaderOutput += '<i class="fas fa-lock fa-lg"> </i>';
                buildTheHeaderOutput += '</div>';
                buildTheHeaderOutput += '</th>';
                buildTheHeaderOutput += '</tr>';
                $("#inventory-table #inventory-mocs-table").append(buildTheHeaderOutput);


                //add the rest of the rows to the table
                $.each(aggregateResult.mocs, function (aggregatedResultKey, aggregatedResultValue) {
                    //show the details of the aggregated parts
                    $.ajax({
                            type: 'GET',
                            url: '/inventory-moc/show-details/' + loggedInUserName + '/' + aggregatedResultValue._id,
                            dataType: 'json',
                            contentType: 'application/json'
                        })
                        //if call is successful
                        .done(function (detailedResult) {
                            //console.log("detailed results mocs", detailedResult);
                            //                            console.log(detailedResult.parts);
                            let buildTheHtmlOutput = "";

                            let currentMocNumber = "";
                            let oldMocNumber = "";
                            // check to see if there are any mocs in the inventory
                            if (detailedResult.mocs.length == 0) {
                                //                                displayError("no aggregated mocs in the inventory", "showMocsInInventory-function");
                            } else {
                                $.each(detailedResult.mocs, function (resultKey, resultValue) {
                                    currentMocNumber = resultValue.moc_num;

                                    //console.log(currentMocNumber, oldMocNumber);
                                    //if the moc number is not duplicated
                                    if (currentMocNumber != oldMocNumber) {
                                        buildTheHtmlOutput += '<tr class="inventory-item">';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showMocDetails">' + resultValue.moc_num + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<a href="#" class="showMocDetails">';
                                        buildTheHtmlOutput += '<img src="' + resultValue.moc_img_url + '" alt="' + resultValue.moc_name + '" height="60px">';
                                        buildTheHtmlOutput += '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';
                                        buildTheHtmlOutput += '<a href="#" class="showMocDetails">' + resultValue.moc_name + '</a>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td class="table-center-cell">';
                                        buildTheHtmlOutput += '<input type="hidden" value="' + resultValue.moc_name + '" class="itemLockMocNameValue">';

                                        //if the item is not locked ...
                                        if (resultValue.permanent_build == 0) {
                                            //display it as is
                                            buildTheHtmlOutput += '<input type="hidden" value="0" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLockMoc">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }
                                        //if it is locked ...
                                        else {
                                            //display the lock icon instead
                                            buildTheHtmlOutput += '<input type="hidden" value="1" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLockMoc itemLockActive">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }

                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr  class="inventory-item-details" style="display: none;">';
                                        buildTheHtmlOutput += '<td class="inventory-moc-details-wrapper" colspan="4">';
                                        //                    buildTheHtmlOutput += 'PART details';
                                        buildTheHtmlOutput += '<table class="inventory-moc-details">';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<th colspan="2">' + resultValue.moc_num + '</th>';
                                        buildTheHtmlOutput += '<th colspan="4">' + resultValue.moc_name + '</th>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"><img src="' + resultValue.moc_img_url + '" alt="' + resultValue.moc_name + '" height="90px"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">total in inventory</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryValue' + resultValue.moc_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';
                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">available</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInInventoryAvailable' + resultValue.moc_num + '">-</td>';

                                        buildTheHtmlOutput += '</tr>';
                                        //                                        if (resultValue.set_num != 0) {
                                        //
                                        //                                            buildTheHtmlOutput += '<tr>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2">in your sets</td>';
                                        //                                            buildTheHtmlOutput += '<td colspan="2" class="in-your-sets-' + resultValue.moc_num + '"></td>';
                                        //                                            buildTheHtmlOutput += '</tr>';
                                        //                                            buildTheHtmlOutput += '<tr>';
                                        //                                        }
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">appears in years</td>';
                                        buildTheHtmlOutput += '<td colspan="2">' + resultValue.year + '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Big collector? Enter a bin/drawer storage location.</span>bin/storage location';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';

                                        buildTheHtmlOutput += '<input type="hidden" class="storageBinMocNumValue" value="' + resultValue.moc_num + '" >';
                                        buildTheHtmlOutput += '<input type="text" class="storageBinValueMoc" value="' + resultValue.storage_location + '" placeholder="Enter storage location">';
                                        buildTheHtmlOutput += '<button class="sm-btn storageBinButtonMoc">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Add bin/drawer storage location</span>';
                                        buildTheHtmlOutput += '<i class="fas fa-plus-circle"> </i>';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</button>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">Wishlist';
                                        buildTheHtmlOutput += '<i class="fas fa-shopping-cart"></i>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInWishListAvailable' + resultValue.moc_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        //only delete mocs that are not permanent and no more than the max available value
                                        //if the moc is not locked show the delete functionality
                                        //othewise display message to unlock

                                        //if the part is not locked
                                        if (resultValue.permanent_build == 0) {
                                            //show the delete functionality
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td class="getMocsToDelete' + resultValue.moc_num + '">';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        } else {
                                            //display message to unlock it first
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td>';
                                            buildTheHtmlOutput += 'unlock this moc in order to delete it';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        }



                                        buildTheHtmlOutput += '</table>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';

                                        //call the function to populate the inventory value
                                        getTotalInInventory(resultValue.moc_num, "moc", loggedInUserName);
                                        getPartsToDelete(resultValue.moc_num, "moc", loggedInUserName);

                                        //call the function to dynamically populate "in your sets"
                                        //getInYourSets(resultValue.moc_num, "moc", loggedInUserName);

                                        //check if the current moc was already shown (so it doesn't show twice)
                                        oldMocNumber = currentMocNumber;
                                    }

                                });
                                //use the HTML output to show it in the index.html
                                $("#inventory-table #inventory-mocs-table").append(buildTheHtmlOutput);
                                $('#inventoryPage').show();
                                $('#inventory-filters').show();
                                $('#inventory-table').show();
                                $('#inventory-moc-details-wrapper').hide();
                                applyFilterLockButtons();
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

    if (callback && typeof (callback) === "function") {
        //run the call back function too
        callback();
    }
}


function showPartsInInventory(loggedInUserName, callback) {
    //    console.log("inside showPartsInInventory");
    $.ajax({
            type: 'GET',
            url: '/inventory-part/show-aggregate/' + loggedInUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (aggregateResult) {
            //console.log(aggregateResult);
            $("#inventory-table #inventory-parts-table").html("");
            // check to see if there are any parts in the inventory
            if (aggregateResult.parts.length == 0) {
                //displayError("no parts in the inventory", "showPartsInInventory-function");
                let displayErrorParts = '<tr class="inventory-item"><td>No parts in the inventory</td></tr>';
                $("#inventory-table #inventory-parts-table").html(displayErrorParts);
                $("#inventory-table").show();
            } else {
                //create the table head separately from the rest of the rows
                let buildTheHeaderOutput = "";
                buildTheHeaderOutput += '<tr>';
                buildTheHeaderOutput += '<th>Part number</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">image</th>';
                buildTheHeaderOutput += '<th>name</th>';
                buildTheHeaderOutput += '<th class="table-center-cell">';
                buildTheHeaderOutput += '<div class="tooltip">';
                buildTheHeaderOutput += '<span class="tooltiptext">click the lock for a permanent build</span>';
                buildTheHeaderOutput += '<i class="fas fa-lock fa-lg"> </i>';
                buildTheHeaderOutput += '</div>';
                buildTheHeaderOutput += '</th>';
                buildTheHeaderOutput += '</tr>';
                $("#inventory-table #inventory-parts-table").append(buildTheHeaderOutput);


                //add the rest of the rows to the table
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
                            //console.log("detailed results parts", detailedResult);
                            //                            console.log(detailedResult.parts);
                            let buildTheHtmlOutput = "";

                            let currentPartNumber = "";
                            let oldPartNumber = "";
                            // check to see if there are any parts in the inventory
                            if (detailedResult.parts.length == 0) {
                                //                                displayError("no aggregated parts in the inventory", "showPartsInInventory-function");
                            } else {
                                $.each(detailedResult.parts, function (resultKey, resultValue) {
                                    currentPartNumber = resultValue.part_num;

                                    //console.log(currentPartNumber, oldPartNumber);
                                    //if the part number is not duplicated
                                    if (currentPartNumber != oldPartNumber) {
                                        buildTheHtmlOutput += '<tr class="inventory-item">';
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
                                            buildTheHtmlOutput += '<button class="itemLockPart">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }
                                        //if it is locked ...
                                        else {
                                            //display the lock icon instead
                                            buildTheHtmlOutput += '<input type="hidden" value="1" class="itemLockPermanentBuildValue">';
                                            buildTheHtmlOutput += '<button class="itemLockPart itemLockActive">';
                                            buildTheHtmlOutput += '<i class="fas fa-lock fa-lg"></i>';
                                            buildTheHtmlOutput += '</button>';
                                        }

                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        buildTheHtmlOutput += '<tr  class="inventory-item-details" style="display: none;">';
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
                                        buildTheHtmlOutput += '<td colspan="2">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Big collector? Enter a bin/drawer storage location.</span>bin/storage location';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td>';

                                        buildTheHtmlOutput += '<input type="hidden" class="storageBinPartNumValue" value="' + resultValue.part_num + '" >';
                                        buildTheHtmlOutput += '<input type="text" class="storageBinValuePart" value="' + resultValue.storage_location + '" placeholder="Enter storage location">';
                                        buildTheHtmlOutput += '<button class="sm-btn storageBinButtonPart">';
                                        buildTheHtmlOutput += '<div class="tooltip">';
                                        buildTheHtmlOutput += '<span class="tooltiptext">Add bin/drawer storage location</span>';
                                        buildTheHtmlOutput += '<i class="fas fa-plus-circle"> </i>';
                                        buildTheHtmlOutput += '</div>';
                                        buildTheHtmlOutput += '</button>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';


                                        buildTheHtmlOutput += '<tr>';
                                        buildTheHtmlOutput += '<td colspan="2"></td>';
                                        buildTheHtmlOutput += '<td colspan="2">Wishlist';
                                        buildTheHtmlOutput += '<i class="fas fa-shopping-cart"></i>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '<td colspan="2" class="totalInWishListAvailable' + resultValue.part_num + '">-</td>';
                                        buildTheHtmlOutput += '</tr>';



                                        //only delete parts that are not in permanent sets or mocs and no more than the max available value
                                        //if the part is not locked show the delete functionality
                                        //othewise display message to unlock

                                        //if the part is not locked
                                        if (resultValue.permanent_build == 0) {
                                            //show the delete functionality
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td class="getPartsToDelete' + resultValue.part_num + '">';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        } else {
                                            //display message to unlock it first
                                            buildTheHtmlOutput += '<tr>';
                                            buildTheHtmlOutput += '<td colspan="2"></td>';
                                            buildTheHtmlOutput += '<td colspan="2">delete from inventory</td>';
                                            buildTheHtmlOutput += '<td>';
                                            buildTheHtmlOutput += 'unlock this part in order to delete it';
                                            buildTheHtmlOutput += '</td>';
                                            buildTheHtmlOutput += '</tr>';
                                        }



                                        buildTheHtmlOutput += '</table>';
                                        buildTheHtmlOutput += '</td>';
                                        buildTheHtmlOutput += '</tr>';

                                        //call the function to populate the inventory value
                                        getTotalInInventory(resultValue.part_num, "part", loggedInUserName);
                                        getPartsToDelete(resultValue.part_num, "part", loggedInUserName);

                                        //call the function to dynamically populate "in your sets"
                                        getInYourSets(resultValue.part_num, "part", loggedInUserName);

                                        //check if the current part was already shown (so it doesn't show twice)
                                        oldPartNumber = currentPartNumber;
                                    }

                                });
                                //use the HTML output to show it in the index.html
                                $("#inventory-table #inventory-parts-table").append(buildTheHtmlOutput);
                                $('#inventoryPage').show();
                                $('#inventory-filters').show();
                                $('#inventory-table').show();
                                $('#inventory-part-details-wrapper').hide();
                                applyFilterLockButtons();
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

    if (callback && typeof (callback) === "function") {
        //run the call back function too
        callback();
    }
}

///////////////////////////////////////////////////////////////////
//Invocations (calling)& function Triggers
// When the page loads
$(function () {
    // if the user is not logged in, don't show top navigation
    if ($("#loggedInUserName").val() == '') {
        $('.menu-wrapper').hide();
    }
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
    $("#messageBox").hide();
});

$('#menu-inventory').click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#inventoryPage').show();
    const loggedInUserName = $("#loggedInUserName").val();
    showPartsInInventory(loggedInUserName);
    showSetsInInventory(loggedInUserName);
    showMocsInInventory(loggedInUserName);

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
        displayError('Please input user name', "login-form-trigger");
    } else if (password == "") {
        displayError('Please input password', "login-form-trigger");
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
            //if call is successful
            .done(function (result) {
                //console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                $('.menu-wrapper').show();
                //                showPartsInInventory(result.username);
                //                showSetsInInventory(result.username);
                //                showMocsInInventory(result.username);


                showSetsInInventory(result.username, showMocsInInventory(result.username, showPartsInInventory(result.username)));

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                displayError('Incorrect Username or Password', "login-form-trigger");
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
        displayError('Please add a user name', "signup-form-trigger");
    } else if (password == "") {
        displayError('Please add a password', "signup-form-trigger");
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
                //                console.log(result);
                $('.hide-everything').hide();
                $('#inventoryPage').show();
                $('#loggedInName').text(result.username);
                $('#loggedInUserName').val(result.username);
                $('.menu-wrapper').show();
                showPartsInInventory(result.username);
                showSetsInInventory(result.username);
                showMocsInInventory(result.username);
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
        displayError('Please enter item number', "add-to-inventory-form-trigger");
    }
    //if the input is valid
    else {


        //create the payload object (what data we send to the api call)
        const entryObject = {
            itemNum: itemNum,
            itemType: itemType,
            loggedInUserName: loggedInUserName,
        };
        //        console.log(entryObject);
        displayError("Loading...", "add-to-inventory-form-trigger", 0);
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
                //                console.log(result);
                //                $('#loggedInName').text(result.name);
                //                $('#loggedInUserName').val(result.username);
                $('.hide-everything').hide();
                //bookmark: start sets and mocs functionality from here
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
                displayError("Loaded", "add-to-inventory-form-trigger");
                $('#inventoryPage').show();
                $('#inventory-filters').show();
                $('#inventory-table').show();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR.status);
                if (jqXHR.status == "444") {
                    displayError("The " + itemType + " with number " + itemNum + " was not found. Searching for " + itemNum + "-1...", "add-to-inventory-form-trigger", 0)
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
                            showPartsInInventory(loggedInUserName);
                            showSetsInInventory(loggedInUserName);
                            showMocsInInventory(loggedInUserName);
                        })
                        //if the call is failing
                        .fail(function (jqXHR, error, errorThrown) {
                            console.log(jqXHR.status);
                            if (jqXHR.status == "444") {
                                displayError("The second search for the " + itemType + " with number " + itemNum + "-1 also returned no results", "add-to-inventory-form-trigger")
                            } else {
                                displayError("The second search for the " + itemType + " with number " + itemNum + "-1 returned an error", "add-to-inventory-form-trigger")
                            }
                            console.log(error);
                            console.log(errorThrown);
                        });
                }
                // if no results, check if the item number ends with "-1"
                else {
                    displayError("Searching for the " + itemType + " with number " + itemNum + " returned no results", "add-to-inventory-form-trigger")
                }

            });
    };
});

$('#filterViewButtons select').change(function (event) {
    event.preventDefault();
    let selectedOption = $("#filterViewButtons select").val();
    if (selectedOption == "viewAll") {
        $("#inventory-sets-table").show();
        $("#inventory-mocs-table").show();
        $("#inventory-parts-table").show();
        displayError("Displaying MOCs, sets and parts", "filterViewButtons-trigger");
    } else if (selectedOption == "viewSets") {
        $("#inventory-sets-table").show();
        $("#inventory-mocs-table").hide();
        $("#inventory-parts-table").hide();
        displayError("Displaying sets only", "filterViewButtons-trigger");
    } else if (selectedOption == "viewMOCs") {
        $("#inventory-sets-table").hide();
        $("#inventory-mocs-table").show();
        $("#inventory-parts-table").hide();
        displayError("Displaying MOCs only");
    } else if (selectedOption == "viewParts") {
        $("#inventory-sets-table").hide();
        $("#inventory-mocs-table").hide();
        $("#inventory-parts-table").show();
        displayError("Displaying parts only", "filterViewButtons-trigger");
    }
});

$('#filterLockButtons select').change(function (event) {
    event.preventDefault();
    //hiding and showing the locked items
    applyFilterLockButtons();
    //display the message related to the hiding and showing
    let selectedOptionForErrorDisplay = $("#filterLockButtons select").val();
    if (selectedOptionForErrorDisplay == "see") {
        displayError("Displaying locked and unlocked items", "filterLockButtons-trigger");
    } else if (selectedOptionForErrorDisplay == "hide") {
        displayError("Displaying only unlocked items", "filterLockButtons-trigger");
    }
});

$(document).on("click", ".showPartDetails", function (event) {
    event.preventDefault();
    $(this).parent().parent().next().toggle("slow");
});

$(document).on("click", ".showSetDetails", function (event) {
    event.preventDefault();
    $(this).parent().parent().next().toggle("slow");
});

$(document).on("click", ".showMocDetails", function (event) {
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

$(document).on('click', '.itemLockPart', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the part name and the permanent initial value
    let itemLockPartNameValue = $(this).parent().find(".itemLockPartNameValue").val();
    let itemLockPermanentBuildValue = $(this).parent().find(".itemLockPermanentBuildValue").val();

    updatedItemLockPermanentBuildValue = 0;
    //if the item is permanent build switch to the opposite
    if (itemLockPermanentBuildValue == 1) {
        updatedItemLockPermanentBuildValue = 0;
    } else {
        updatedItemLockPermanentBuildValue = 1;
    }
    //console.log(itemLockPartNameValue);
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
            //            console.log(result);
            //show that the button is locked
            $(this).parent().find(".itemLockPart").toggleClass("itemLockActive");

            //update the inventory after lock
            showPartsInInventory(loggedInUserName);
            showSetsInInventory(loggedInUserName);
            showMocsInInventory(loggedInUserName);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});



$(document).on('click', '.storageBinButtonPart', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the part name and the permanent initial value
    let storageBinValuePart = $(this).parent().find(".storageBinValuePart").val();
    let storageBinPartNumValue = $(this).parent().find(".storageBinPartNumValue").val();

    //basic validation
    if (storageBinValuePart == "") {
        displayError("Type a bin/drawer storage location", "storageBinButtonPart-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const storageBinObject = {
            loggedInUserName: loggedInUserName,
            storage_location: storageBinValuePart,
            part_num: storageBinPartNumValue
        };

        console.log(storageBinObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: '/inventory-part/add-storage-bin',
                dataType: 'json',
                data: JSON.stringify(storageBinObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                displayError("Added bin/storage location", "storageBinButtonPart-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});



$(document).on('click', '.deleteBtnPart', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the part name and the permanent initial value
    let deletePartNumValue = $(this).parent().find(".deletePartNumValue").val();
    let deletePartIDValue = $(this).parent().find(".deletePartIDValue").val();
    let deletePartQuantityValue = $(this).parent().find(".deletePartQuantityValue").val();
    let deletePartMaxQuantityValue = $(this).parent().find(".deletePartMaxQuantityValue" + deletePartNumValue).val();

    let deleteFromInventoryValue = $(this).parent().find(".deleteFromInventoryValue" + deletePartNumValue).val();

    //basic validation (not able to delete 0 parts or more parts than we have in the inventory)
    if (deletePartMaxQuantityValue < deleteFromInventoryValue) {
        displayError("You only have " + deletePartMaxQuantityValue + " parts to delete.", "deleteBtnPart-trigger");
    } else if (deleteFromInventoryValue == 0) {
        displayError("Enter the number of parts to delete.", "deleteBtnPart-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const deletePartByNameObject = {
            part_name: deletePartNumValue,
            deleteFromInventoryValue: deleteFromInventoryValue,
            deletePartIDValue: deletePartIDValue,
            deletePartQuantityValue: deletePartQuantityValue,
            deletePartMaxQuantityValue: deletePartMaxQuantityValue
        };

        console.log(deletePartByNameObject);

        //make the api call using the payload above
        $.ajax({
                type: 'DELETE',
                url: '/inventory-part/delete-part-by-id',
                dataType: 'json',
                data: JSON.stringify(deletePartByNameObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                //show that the button is locked
                $(this).parent().find(".itemLockPart").toggleClass("itemLockActive");
                displayError("item(s) deleted from Inventory", "deleteBtnPart-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});

///////////////////////////////sets/////////////////////////////

$(document).on('click', '.itemLockSet', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the set name and the permanent initial value
    let itemLockSetNameValue = $(this).parent().find(".itemLockSetNameValue").val();
    let itemLockPermanentBuildValue = $(this).parent().find(".itemLockPermanentBuildValue").val();

    updatedItemLockPermanentBuildValue = 0;
    //if the item is permanent build switch to the opposite
    if (itemLockPermanentBuildValue == 1) {
        updatedItemLockPermanentBuildValue = 0;
    } else {
        updatedItemLockPermanentBuildValue = 1;
    }
    console.log(itemLockSetNameValue);
    //create the payload object (what data we send to the api call)
    const updateSetByNameObject = {
        set_name: itemLockSetNameValue,
        permanent_build: updatedItemLockPermanentBuildValue
    };
    //console.log(updateSetByNameObject);
    //make the api call using the payload above
    $.ajax({
            type: 'PUT',
            url: '/inventory-set/update-permanent-build',
            dataType: 'json',
            data: JSON.stringify(updateSetByNameObject),
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (result) {
            //            console.log(result);
            //show that the button is locked
            console.log($(this).parent().find(".itemLockSet"));
            $(this).parent().find(".itemLockSet").toggleClass("itemLockActive");
            //update the inventory after lock
            showPartsInInventory(loggedInUserName);
            showSetsInInventory(loggedInUserName);
            showMocsInInventory(loggedInUserName);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


$(document).on('click', '.storageBinButtonSet', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the set name and the permanent initial value
    let storageBinValueSet = $(this).parent().find(".storageBinValueSet").val();
    let storageBinSetNumValue = $(this).parent().find(".storageBinSetNumValue").val();

    //basic validation
    if (storageBinValueSet == "") {
        displayError("Type a bin/drawer storage location", "storageBinButtonSet-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const storageBinObject = {
            loggedInUserName: loggedInUserName,
            storage_location: storageBinValueSet,
            set_num: storageBinSetNumValue
        };

        console.log(storageBinObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: '/inventory-set/add-storage-bin',
                dataType: 'json',
                data: JSON.stringify(storageBinObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                displayError("Added bin/storage location", "storageBinButtonSet-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});



$(document).on('click', '.deleteBtnSet', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the set name and the permanent initial value
    let deleteSetNumValue = $(this).parent().find(".deleteSetNumValue").val();
    let deleteSetIDValue = $(this).parent().find(".deleteSetIDValue").val();
    let deleteSetQuantityValue = $(this).parent().find(".deleteSetQuantityValue").val();
    let deleteSetMaxQuantityValue = $(this).parent().find(".deleteSetMaxQuantityValue" + deleteSetNumValue).val();

    let deleteFromInventoryValue = $(this).parent().find(".deleteFromInventoryValue" + deleteSetNumValue).val();

    //basic validation (not able to delete 0 sets or more sets than we have in the inventory)
    if (deleteSetMaxQuantityValue < deleteFromInventoryValue) {
        displayError("You only have " + deleteSetMaxQuantityValue + " sets to delete.", "deleteBtnSet-trigger");
    } else if (deleteFromInventoryValue == 0) {
        displayError("Enter the number of sets to delete.", "deleteBtnSet-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const deleteSetByNumberObject = {
            set_num: deleteSetNumValue,
            loggedInUserName: loggedInUserName,
            deleteFromInventoryValue: deleteFromInventoryValue,
            deleteSetIDValue: deleteSetIDValue,
            deleteSetQuantityValue: deleteSetQuantityValue,
            deleteSetMaxQuantityValue: deleteSetMaxQuantityValue
        };

        console.log(deleteSetByNumberObject);

        //make the api call using the payload above
        $.ajax({
                type: 'DELETE',
                url: '/inventory-set/delete-set-by-number',
                dataType: 'json',
                data: JSON.stringify(deleteSetByNumberObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                //show that the button is locked
                $(this).parent().find(".itemLockSet").toggleClass("itemLockActive");
                displayError("item(s) deleted from Inventory", "deleteBtnSet-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});




////////////////////moc/////////////////////////////////

$(document).on('click', '.itemLockMoc', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the moc name and the permanent initial value
    let itemLockMocNameValue = $(this).parent().find(".itemLockMocNameValue").val();
    let itemLockPermanentBuildValue = $(this).parent().find(".itemLockPermanentBuildValue").val();

    updatedItemLockPermanentBuildValue = 0;
    //if the item is permanent build switch to the opposite
    if (itemLockPermanentBuildValue == 1) {
        updatedItemLockPermanentBuildValue = 0;
    } else {
        updatedItemLockPermanentBuildValue = 1;
    }
    console.log(itemLockMocNameValue);
    //create the payload object (what data we send to the api call)
    const updateMocByNameObject = {
        moc_name: itemLockMocNameValue,
        permanent_build: updatedItemLockPermanentBuildValue
    };

    //make the api call using the payload above
    $.ajax({
            type: 'PUT',
            url: '/inventory-moc/update-permanent-build',
            dataType: 'json',
            data: JSON.stringify(updateMocByNameObject),
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (result) {
            //            console.log(result);
            //show that the button is locked
            $(this).parent().find(".itemLockMoc").toggleClass("itemLockActive");
            //update the inventory after lock
            showPartsInInventory(loggedInUserName);
            showSetsInInventory(loggedInUserName);
            showMocsInInventory(loggedInUserName);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


$(document).on('click', '.storageBinButtonMoc', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the moc name and the permanent initial value
    let storageBinValueMoc = $(this).parent().find(".storageBinValueMoc").val();
    let storageBinMocNumValue = $(this).parent().find(".storageBinMocNumValue").val();

    //basic validation
    if (storageBinValueMoc == "") {
        displayError("Type a bin/drawer storage location", "storageBinButtonMoc-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const storageBinObject = {
            loggedInUserName: loggedInUserName,
            storage_location: storageBinValueMoc,
            moc_num: storageBinMocNumValue
        };

        console.log(storageBinObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: '/inventory-moc/add-storage-bin',
                dataType: 'json',
                data: JSON.stringify(storageBinObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                displayError("Added bin/storage location", "storageBinButtonMoc-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});



$(document).on('click', '.deleteBtnMoc', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the moc name and the permanent initial value
    let deleteMocNumValue = $(this).parent().find(".deleteMocNumValue").val();
    let deleteMocIDValue = $(this).parent().find(".deleteMocIDValue").val();
    let deleteMocQuantityValue = $(this).parent().find(".deleteMocQuantityValue").val();
    let deleteMocMaxQuantityValue = $(this).parent().find(".deleteMocMaxQuantityValue" + deleteMocNumValue).val();

    let deleteFromInventoryValue = $(this).parent().find(".deleteFromInventoryValue" + deleteMocNumValue).val();

    //basic validation (not able to delete 0 mocs or more mocs than we have in the inventory)
    if (deleteMocMaxQuantityValue < deleteFromInventoryValue) {
        displayError("You only have " + deleteMocMaxQuantityValue + " mocs to delete.", "deleteBtnMoc-trigger");
    } else if (deleteFromInventoryValue == 0) {
        displayError("Enter the number of mocs to delete.", "deleteBtnMoc-trigger");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const deleteMocByNumberObject = {
            set_num: deleteMocNumValue,
            loggedInUserName: loggedInUserName,
            deleteFromInventoryValue: deleteFromInventoryValue,
            deleteMocIDValue: deleteMocIDValue,
            deleteMocQuantityValue: deleteMocQuantityValue,
            deleteMocMaxQuantityValue: deleteMocMaxQuantityValue
        };

        console.log(deleteMocByNumberObject);

        //make the api call using the payload above
        $.ajax({
                type: 'DELETE',
                url: '/inventory-moc/delete-moc-by-number',
                dataType: 'json',
                data: JSON.stringify(deleteMocByNumberObject),
                contentType: 'application/json'
            })
            //if call is successful
            .done(function (result) {
                //                console.log(result);
                //show that the button is locked
                $(this).parent().find(".itemLockMoc").toggleClass("itemLockActive");
                displayError("item(s) deleted from Inventory", "deleteBtnMoc-trigger");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
                showSetsInInventory(loggedInUserName);
                showMocsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});


$(".search-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#searchPage').show();
    $('#searchResultsActionSubpage').show();
});

$('.newTabRebrickable').click(function (event) {
    event.preventDefault();
    displayError("open a new tab in Rebrickable", "newTabRebrickable-trigger");
});

$('.inventoryAddBtn').click(function (event) {
    event.preventDefault();
    displayError("item(s) added to Inventory", "inventoryAddBtn-trigger");
});

$('.addWishBtn').click(function (event) {
    event.preventDefault();
    displayError("item(s) added to Wishlist", "addWishBtn-trigger");
});

$(".plan-form").submit(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#buildPage').show();
    $('#buildCalculationSubpage').show();
});

$('.printBtn').click(function (event) {
    event.preventDefault();
    displayError("list of needed parts sent to printer", "printBtn-trigger");
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
    displayError("viewing the build", "viewBuild-trigger")
});

$('.removeBuild').click(function (event) {
    event.preventDefault();
    displayError("build is removed\r(Removing a MOC build subtracts the needed parts from your Wishlist)", "removeBuild-trigger");
});

$(".recalculate").click(function (event) {
    event.preventDefault();
    $('.hide-everything').hide();
    $('#wishlistPage').show();
    displayError("recalculating", "recalculate-trigger")
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();
});

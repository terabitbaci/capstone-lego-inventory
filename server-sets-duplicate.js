$(document).on('click', '.itemLock', function (event) {
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
            //show that the button is locked
            $(this).parent().find(".itemLock").toggleClass("itemLockActive");
            //update the inventory after lock
            showPartsInInventory(loggedInUserName);
        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Incorrect Username or Password');
        });
});


$(document).on('click', '.storageBinButton', function (event) {
    event.preventDefault();

    //get the loggedInUserName in order to update the inventory after lock
    const loggedInUserName = $("#loggedInUserName").val();

    //get the part name and the permanent initial value
    let storageBinValue = $(this).parent().find(".storageBinValue").val();
    let storageBinPartNumValue = $(this).parent().find(".storageBinPartNumValue").val();

    //basic validation
    if (storageBinValue == "") {
        alert("Type a bin/drawer storage location");
    }
    //if the input is valid ...
    else {
        //prompt "are you sure?"

        //create the payload object (what data we send to the api call)
        const storageBinObject = {
            loggedInUserName: loggedInUserName,
            storage_location: storageBinValue,
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
                console.log(result);
                alert("Added bin/storage location");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    }
});



$(document).on('click', '.deleteBtn', function (event) {
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
        alert("You only have " + deletePartMaxQuantityValue + " parts to delete.");
    } else if (deleteFromInventoryValue == 0) {
        alert("Enter the number of parts to delete.");
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
                console.log(result);
                //show that the button is locked
                $(this).parent().find(".itemLock").toggleClass("itemLockActive");
                alert("item(s) deleted from Inventory");

                //update the inventory after lock
                showPartsInInventory(loggedInUserName);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    }
});

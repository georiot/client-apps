document.addEventListener('DOMContentLoaded', function () {
    if (localStorage["apiKey"] == null && localStorage["apiSecret"] == null) {
        localStorage.setItem("apiKey", "");
        localStorage.setItem("apiSecret", "");

    }

    $(document).ready(function() {
        $('#tutorial').on('click', 'a', function () {
            chrome.tabs.create({
                url: $(this).attr('href')
            });
            return false;
        });

    });

 

var apiKeysViewModel = {
    apiKey: ko.observable(document.getElementById("apiKey").value = localStorage["apiKey"]),
    apiSecret: ko.observable(document.getElementById("apiSecret").value = localStorage["apiSecret"])
};

    if (localStorageHasValue("defaultGroup")) {
        $("#help").css("visibility", "hidden");
        $("#back").css("visibility", "visible");
    } else {
        $("#back").css("visibility", "hidden");
        $("#help").css("visibility", "visible");
    }


    var saveButton = document.getElementById('saveButton');

    apiKey.addEventListener('change', function() {
        var apiKey = document.getElementById("apiKey").value;
        localStorage.setItem("apiKey", apiKey);
    });

    apiSecret.addEventListener('change', function() {
        var apiKey = document.getElementById("apiSecret").value;
        localStorage.setItem("apiSecret", apiKey);
    });

    // onClick funcion
    saveButton.addEventListener('click', function() {
        var apiKey = document.getElementById("apiKey").value;
        var apiSecret = document.getElementById("apiSecret").value;
        if (apiKey != null && apiSecret != null && apiKey != "" && apiSecret != "") {
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("apiSecret", apiSecret);
            chrome.browserAction.setPopup({
                popup: "groups.html"
            });


        } else {
            $("#dialog").dialog({
                draggable: false,
                modal: true
            });

            $("#networkError").html("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");


        }
        console.log("save button works");

    });
});

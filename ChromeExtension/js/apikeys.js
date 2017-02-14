// document.addEventListener('DOMContentLoaded', function () {
//     // if (localStorage["apiKey"] == null && localStorage["apiSecret"] == null) {
//     //     localStorage.setItem("apiKey", "");
//     //     localStorage.setItem("apiSecret", "");

//     // }

//     $(document).ready(function () {
//         $('#tutorial').on('click', 'a', function () {
//             chrome.tabs.create({
//                 url: $(this).attr('href')
//             });
//             return false;
//         });

//     });



//     // document.getElementById("apiKey").value = localStorage["apiKey"];
//     // document.getElementById("apiSecret").value = localStorage["apiSecret"];



//     // var saveButton = document.getElementById('saveButton');

    // apiKey.addEventListener('change', function () {
    //     var apiKey = document.getElementById("apiKey").value;
    //     localStorage.setItem("apiKey", apiKey);
    // });

    // apiSecret.addEventListener('change', function () {
    //     var apiKey = document.getElementById("apiSecret").value;
    //     localStorage.setItem("apiSecret", apiKey);
    // });

//     // onClick funcion
//     // saveButton.addEventListener('click', function () {
//     //     var apiKey = document.getElementById("apiKey").value;
//     //     var apiSecret = document.getElementById("apiSecret").value;
//     //     if (apiKey != null && apiSecret != null && apiKey != "" && apiSecret != "") {
//     //         localStorage.setItem("apiKey", apiKey);
//     //         localStorage.setItem("apiSecret", apiSecret);
//     //         chrome.browserAction.setPopup({
//     //             popup: "groups.html"
//     //         });


//     //     } else {
//     //         $("#dialog").dialog({
//     //             draggable: false,
//     //             modal: true
//     //         });

//     //         $("#networkError").html("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");


//     //     }
//     //     console.log("save button works");

//     // });



// });

function apiKeyViewModel() {
    if (localStorage["apiKey"] == null && localStorage["apiSecret"] == null) {
        localStorage.setItem("apiKey", "");
        localStorage.setItem("apiSecret", "");

    }
        apiKey.addEventListener('change', function () {
        var apiKey = document.getElementById("apiKey").value;
        localStorage.setItem("apiKey", apiKey);
    });

    apiSecret.addEventListener('change', function () {
        var apiKey = document.getElementById("apiSecret").value;
        localStorage.setItem("apiSecret", apiKey);
    });

    var self = this;
    self.apiKey = ko.observable(localStorage["apiKey"]);
    self.apiSecret = ko.observable(localStorage["apiSecret"]);
    self.showBackLink = ko.observable(false);
    self.showHelpLink = ko.observable(true);
    self.loadKey = function () {
        var ak = localStorage["apiKey"];
        if (ak == '') {
            self.apiKey(ak);
        }

        var as = localStorage["apiKey"];
        if (as == '') {
            self.apiSecret(as);
        }
        self.loadKey();
    }

    if (localStorageHasValue("defaultGroup")) {
        self.showBackLink(true);
        self.showHelpLink(false);
    }

    self.saveKeys = function () {
        var apiKey = document.getElementById("apiKey").value;
        var apiSecret = document.getElementById("apiSecret").value;
        if (self.apiKey() != null && self.apiSecret() != null && self.apiKey() != "" && self.apiSecret() != "") {
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
    }




}


var apiModel = new apiKeyViewModel();

if (typeof testModel === 'undefined') {
    ko.applyBindings(apiModel);

} else {
    testModel = apiModel;
}
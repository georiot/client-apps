function getJSON(url, extraParameters) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url + "?apiKey=" + localStorage["apiKey"] + "&apiSecret=" + localStorage["apiSecret"] + "&format=json&" + extraParameters);
        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);

            } else {
                reject(Error(req.statusText));
                if (req.status == 401) {
                    $(function() {
                        $("#dialog").dialog({
                            draggable: false,
                            modal: true
                        });

                    });
                    $("#networkError").html("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");


                }
                if (req.status == 500) {
                    $(function() {
                        $("#dialog").dialog({
                            draggable: false,
                            modal: true
                        });

                    });
                    $("#networkError").html("Hmm.. looks like we're having trouble connecting. Try again, or email help@geni.us to let us know.");

                }
            }
        };
        req.onerror = function() {
            reject(Error("Network Error"));
        };
        req.send();
    });
}


function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage != "";
}

// Add link function

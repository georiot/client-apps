function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage != '';
}

var lastCreatedLink = localStorage['lastCreatedLink'];
document.getElementById("lastCreatedLink").innerHTML = lastCreatedLink;
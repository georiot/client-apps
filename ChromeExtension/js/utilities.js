function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage != '';
}

if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneInside.html" || window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneOutside.html") {
    var lastCreatedLink = localStorage['lastCreatedLink'];
    document.getElementById("lastCreatedLink").innerHTML = lastCreatedLink;
    var linkPath = lastCreatedLink.split("/");
    document.getElementById("dashboardLink").href = "https://my.geni.us/links#!editlink=" + linkPath[3];
}
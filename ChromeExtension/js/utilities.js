if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneInside.html" || window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneOutside.html") {
    chrome.storage.local.get(["lastCreatedLink"]).then((result) => {
        var lastCreatedLink = result.lastCreatedLink;
        document.getElementById("lastCreatedLink").innerHTML = lastCreatedLink;
        var linkPath = lastCreatedLink.split("/");
        document.getElementById("dashboardLink").href = "https://my.geni.us/links#!editlink=" + linkPath[3];
    });
}
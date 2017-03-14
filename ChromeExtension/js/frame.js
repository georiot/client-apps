if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html") {
    setTimeout(function () {
        window.location.href = "alertDoneInside.html";
    }, 1000);
}

if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneInside.html") {
    setTimeout(function () {
        window.close();
    }, 4000);
}
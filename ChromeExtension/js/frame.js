if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertDoneInside.html") {
    setTimeout(function () {
        window.close();
    }, 4000);
}
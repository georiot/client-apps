if (window.location.href === "chrome-extension://haebimmpcepjkbodcfbajdnlhhijimec/alertLoadingInside.html") {
    setTimeout(function () {
        window.location.href = "alertDoneInside.html";
    }, 1000);
}

if (window.location.href === "chrome-extension://haebimmpcepjkbodcfbajdnlhhijimec/alertDoneInside.html") {
    setTimeout(function () {
        window.close();
    }, 5000);
}
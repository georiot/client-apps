chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.local.set({"createdLinks": "0"});
        chrome.storage.local.set({"doneReview": "false"});
        chrome.storage.local.set({"selectedDomainName": "geni.us"});

        var dateobj = new Date();
        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        var result = pad(dateobj.getMonth() + 1) + "/" + pad(dateobj.getDate()) + "/" + dateobj.getFullYear();
        chrome.storage.local.set({"installDate": result});
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

async function createOffscreen() {
    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['BLOBS'],
        justification: 'keep service worker running',
    }).catch(() => {});
}

chrome.runtime.onStartup.addListener(createOffscreen);
self.onmessage = e => {}; // keepAlive
createOffscreen();
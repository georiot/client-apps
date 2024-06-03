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

function CreateContextMenus() {
    chrome.storage.local.get(["defaultGroup"]).then((r1) => {
        var defaultGroup = r1.defaultGroup;
        if (defaultGroup != null && defaultGroup != '') {
            chrome.contextMenus.removeAll()
            chrome.contextMenus.create({
                title: 'Create geni.us link from current tab',
                contexts: ['page'],
                id: 'child1'
            });

            chrome.contextMenus.create({
                title: 'Create geni.us link from selected URL',
                contexts: ['link'],
                id: 'child2'
            });

            chrome.contextMenus.onClicked.addListener(function(info, tab) {
                if (info.id === "child1") {
                    chrome.tabs.sendMessage(tab.id, {
                        action: "createGeniusCurrentTab"
                    }, function (response) {});
                }

                if (info.id === "child2") {
                    chrome.tabs.sendMessage(tab.id, {
                        action: "createGeniusCurrentLink"
                    }, function (response) {});
                }
            });
        }
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == 'CreateContextMenus') {
        CreateContextMenus();
    }

    sendResponse();
});

chrome.storage.local.get(["defaultGroup"]).then((result) => {
    var defaultGroup = result.defaultGroup;
    if (defaultGroup !== '' && typeof defaultGroup !== 'undefined') {
        chrome.action.setPopup({
            popup: "groups.html"
        });
    }
});

CreateContextMenus();
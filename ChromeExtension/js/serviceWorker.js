chrome.runtime.onInstalled.addListener(async function (details) {
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

    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({url: cs.matches})) {
          if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
            continue;
          }

          chrome.scripting.executeScript({
            files: cs.js,
            target: {tabId: tab.id, allFrames: cs.all_frames},
            injectImmediately: cs.run_at === 'document_start',
          });
        }
    }
});

function sendMessageToCreateLink(url) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "createGeniusLink",
            url: url
        }, function (response) {});
    });
}

function getCurrentTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({
            active: true, // Select active tabs
            lastFocusedWindow: true // In the current window
        }, function (tabs) {
            resolve(tabs[0]);
        });
    });
}

function createGeniusCurrentTab() {
    getCurrentTab().then(function (tab) {
        var url = tab.url;
        sendMessageToCreateLink(url);
    })
}

function createGeniusCurrentLink(url) {
    if (url != undefined && url !== "") {
        sendMessageToCreateLink(url);
    }
}

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
                if (info.menuItemId === "child1") {
                    createGeniusCurrentTab();
                }

                if (info.menuItemId === "child2") {
                    createGeniusCurrentLink(info.linkUrl);
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
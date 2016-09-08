function getCurrentTab() {
    return new Promise(function(resolve, reject) {
        chrome.tabs.query({
            active: true, // Select active tabs
            lastFocusedWindow: true // In the current window
        }, function(tabs) {
            resolve(tabs[0]);
        });
    });
}

function goTo(page) {
    if (localStorage["defaultGroup"] != null && localStorage != "") {
        chrome.browserAction.setPopup({
            popup: page
        });
    }
};





function createGeniusCurrentTab() {
    getCurrentTab().then(function(tab) {
        var url = tab.url;
        createGeniusLink(url);
    })
}

function createGeniusCurrentLink(e) {
    if(e.linkUrl)
    {
        createGeniusLink(e.linkUrl);
    }
}

function createGeniusLink(url) {
    var req = new XMLHttpRequest();
    req.open('POST', "https://api.geni.us/v2/shorturl?apiKey=" + localStorage["apiKey"] + "&apiSecret=" + localStorage["apiSecret"] + "&format=json&GroupId=" + localStorage["defaultGroupId"] + "&bulkMode=0&domain=geni.us&Url=" + url);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onload = function() {
        if (req.status == 200) {
            alert("Geni.us link created! Added to group: " + localStorage["defaultGroup"] + ".");
            req.response;
        } else {
            if (req.status == 401) {
                alert("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");
            }
            if (req.status == 500) {
                alert("Hmm.. looks like we're having trouble connecting. Try again, or email help@geni.us to let us know.");
            }
        }
    };
    req.onerror = function() {
        Error("Network Error");
    };
    req.send();

}



function CreateContentMenus() {

    if (localStorage["defaultGroup"] != null && localStorage["defaultGroup"] != "") {
        chrome.contextMenus.removeAll()
        chrome.contextMenus.create({
            title: "Create geni.us link from current tab",
            contexts: ["page"],
            id: "child1",
            onclick: createGeniusCurrentTab
        });

        chrome.contextMenus.create({
            title: "Create geni.us link from selected URL",
            contexts: ["link"],
            id: "child2",
            onclick: createGeniusCurrentLink
        });
    }
}



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == "CreateContentMenus") {
        CreateContentMenus();
    }
});

goTo("groups.html");
CreateContentMenus();
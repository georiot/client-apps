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
function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage != "";
}

function goTo(page) {
    chrome.browserAction.setPopup({
        popup: page
    });
};


//sources for copyToClipboard function: 
//http://www.is-beer-a-vegetable.com/wiki/index.php/Copy_text_to_clipboard_using_Javascript_(Chrome) 
//http://stackoverflow.com/questions/25622359/clipboard-copy-paste-on-content-script-chrome-extension 
function copyToClipBoard(text) {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = (text);
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

function createGeniusCurrentTab() {
    getCurrentTab().then(function (tab) {
        var url = tab.url;
        createGeniusLink(url);
    })
}

function createGeniusCurrentLink(e) {
    if (e.linkUrl) {
        createGeniusLink(e.linkUrl);
    }
}

function createGeniusLink(url) {

 // no entiendo porque no coge los parametros que le envio en el segundo paramentro(spot) de la funcion
    var client = new GeniusLinkServiceClientPost("https://api.geni.us/v2", localStorage["apiKey"], localStorage["apiSecret"]);
    client.postToService("shorturl?apiKey=" + localStorage["apiKey"] + "&apiSecret=" + localStorage["apiSecret"] + "&Url=" + url + "&GroupId=" + localStorage["defaultGroupId"] + "&bulkMode=0", 
    {
        
    },
        function (data) {
            newLink = data.NewLink;
            copyToClipBoard(newLink);
            alert("Geni.us link created and copied to clipboard!\n " + newLink + " added to group: " + localStorage["defaultGroup"] + ".");

        },
        function (xhr) {
            //aqui me quede, no se manejar ese error el problema esta en la manera que servicestack maneja los errores CREO.
            alert(xhr)


        });


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



chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name == "CreateContentMenus") {
        CreateContentMenus();
    }
});

if (localStorageHasValue("defaultGroup")) {
    goTo("groups.html");
}
CreateContentMenus();
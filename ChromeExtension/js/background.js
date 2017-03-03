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
   
    var client = new GeniusLinkServiceClient('https://api.geni.us/v2', localStorage['apiKey'], localStorage['apiSecret']);
    client.postToService('shorturl', {
            GroupId: localStorage['defaultGroupId'],
            Url: url
        },
        function (data) {
            newLink = data.NewLink;
            copyToClipBoard(newLink);
            alert('Geni.us link created and copied to clipboard!\n ' + newLink + ' added to group: ' + localStorage['defaultGroup'] + '.');

        },
        function (error) {
            var parseError = JSV.parse(error);
            var error401 = parseError.ResponseStatus.ErrorCode;
            if (error401 == 'AuthenticationException') {
                alert('Oops! Those keys don\'t appear to be right. Please double check your API Key and Secret.');
            }
            else {
                alert('Hmm.. looks like we\'re having trouble connecting. Try again, or email help@geni.us to let us know.');
            }

        });


}



function CreateContentMenus() {

    if (localStorage['defaultGroup'] != null && localStorage['defaultGroup'] != '') {
        chrome.contextMenus.removeAll()
        chrome.contextMenus.create({
            title: 'Create geni.us link from current tab',
            contexts: ['page'],
            id: 'child1',
            onclick: createGeniusCurrentTab
        });

        chrome.contextMenus.create({
            title: 'Create geni.us link from selected URL',
            contexts: ['link'],
            id: 'child2',
            onclick: createGeniusCurrentLink
        });
    }
}



chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name == 'CreateContentMenus') {
        CreateContentMenus();
    }
});

if (localStorageHasValue('defaultGroup')) {
    goTo('groups.html');
}
CreateContentMenus();
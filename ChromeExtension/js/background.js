chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        localStorage.setItem("createdLinks", "0");
        localStorage.setItem("doneReview", "false");
        localStorage.setItem("selectedDomain", JSON.stringify({
            name: 'geni.us',
            ssl: true
        }));
        var dateobj = new Date();

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }
        var result = pad(dateobj.getMonth() + 1) + "/" + pad(dateobj.getDate()) + "/" + dateobj.getFullYear();
        localStorage.setItem("installDate", result);
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
document.addEventListener('DOMContentLoaded', function () {

    var dateobj = new Date();

    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    var today = pad(dateobj.getMonth() + 1) + "/" + pad(dateobj.getDate()) + "/" + dateobj.getFullYear();

    //sources for parseDate and daydiff to http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    function daydiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    var installDate = localStorage["installDate"];
    var daysInstalled = daydiff(parseDate(installDate), parseDate(today));
    if (daysInstalled >= 14 && localStorage["createdLinks"] > 3 && localStorage["doneReview"] === "false") {

        chrome.browserAction.setPopup({
            popup: "groupsReview.html"
        });

    } else {
        chrome.browserAction.setPopup({
            popup: "groups.html"
        });

    }

    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('custom-domains/domains', {
        format: 'jsv'
    }, function (resp) {
        var ak = localStorage["selectedDomain"];
        var selectedDomainExists = false;
        var domains = [];

        var result = resp['Domains'];
        for (var i = 0; i < result.length; i++) {
            var newItem = {
                name: result[i]['Name'],
                ssl: result[i]['HasValidSslCert'],
                id: i
            };
            domains.push(newItem);

            if (typeof ak !== 'undefined' && JSON.parse(ak)['name'] === result[i]['Name']) {
                localStorage.setItem("selectedDomain", JSON.stringify(newItem));
                selectedDomainExists = true;
            }
        }

        if (typeof ak !== 'undefined' && !selectedDomainExists){
            var selected = JSON.parse(ak);
            selected.id = domains.length;
            domains.push(selected);
        }
        
        localStorage.setItem("customDomains", JSON.stringify(domains));
    }, function (error) {
        alert(error)
    });

});

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
    var groupsUrl = "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html";
    if (window.location.href !== groupsUrl && localStorage["wrongKeys"] === "false") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "loading"
            }, function (response) {});
        });

    }


    var client = new GeniusLinkServiceClient('https://api.geni.us/v3', localStorage['apiKey'], localStorage['apiSecret']);
    client.postToService('shorturls', {
            GroupId: localStorage['defaultGroupId'],
            Domain: JSON.parse(localStorage['selectedDomain'])['Name'],
            Url: url
        },
        function (data) {

            newLink = data.ShortUrl.Domain + "/" + data.ShortUrl.BaseCode;
            copyToClipBoard(newLink);
            localStorage.setItem("lastCreatedLink", newLink);
            var createdLinks = parseInt(localStorage["createdLinks"]);
            localStorage.setItem("createdLinks", createdLinks + 1);
            if (window.location.href != groupsUrl) {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "linkCreated"
                    }, function (response) {});
                });


            }

            if (window.location.href === "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html") {

                window.location.href = "alertDoneInside.html";

            }
        },
        function (error) {
            var parseError = JSV.parse(error);
            var error401 = parseError.ResponseStatus.ErrorCode;
            if (error401 == 'AuthenticationException') {
                alert('Oops! Those keys don\'t appear to be right. Please double check your API Key and Secret.');
            } else {
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


if (localStorage['defaultGroup'] !== '' && typeof localStorage['defaultGroup'] !== 'undefined') {
    chrome.browserAction.setPopup({
        popup: "groups.html"
    });
}
CreateContentMenus();

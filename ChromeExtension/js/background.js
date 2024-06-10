document.addEventListener('DOMContentLoaded', function () {
    var dateobj = new Date();

    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    var today = pad(dateobj.getMonth() + 1) + "/" + pad(dateobj.getDate()) + "/" + dateobj.getFullYear();

    //sources for parseDate and daydiff to http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(str) {
        var mdy = str.toString().split('/');
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    function daydiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    chrome.storage.local.get(["installDate"]).then((r1) => {
        var installDate = r1.installDate;
        if (installDate == undefined || installDate === "") installDate = today;
        var daysInstalled = daydiff(parseDate(installDate), parseDate(today));

        chrome.storage.local.get(["createdLinks"]).then((r2) => {
            var createdLinks = r2.createdLinks;
            chrome.storage.local.get(["doneReview"]).then((r3) => {
                var doneReview = r3.doneReview;
                if (daysInstalled >= 14 && createdLinks > 3 && doneReview === "false") {
                    chrome.action.setPopup({
                        popup: "groupsReview.html"
                    });
                } else {
                    chrome.action.setPopup({
                        popup: "groups.html"
                    });
                }
            });
        });
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

function tryHandleSuccess(newLink) {
    try {
        copyToClipBoard(newLink);

        if (window.location.href != "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html") {
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
    } catch (e) {
        // User doesn't have the extension popup open, and we can't programatically open/modify it in Manifest V3
        // so we need to find another way to alert user that the link creation is successful..
        alert(`Done! ${newLink} is copied to your clipboard and can be managed in your Genius Link dashboard.`)
    }    
}

async function createGeniusLink(url) {
    let groupsUrl = "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html";
    let wrongKeys = (await chrome.storage.local.get(["wrongKeys"])).wrongKeys;
    let apiKey = (await chrome.storage.local.get(["apiKey"])).apiKey;
    let apiSecret = (await chrome.storage.local.get(["apiSecret"])).apiSecret;
    let defaultGroupId = (await chrome.storage.local.get(["defaultGroupId"])).defaultGroupId;
    let selectedDomainName = (await chrome.storage.local.get(["selectedDomainName"])).selectedDomainName;

    if (window.location.href !== groupsUrl && wrongKeys === "false") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "loading"
            }, function (response) {});
        });
    }

    let client = new GeniusLinkServiceClient('https://api.geni.us/v3', apiKey, apiSecret);
    client.postToService('shorturls', {
        GroupId: defaultGroupId,
        Domain: selectedDomainName,
        Url: url
    }, function (data) {
        let domain = data.ShortUrl.Domain.toString();

        if (domain.includes("geni.us")){ // Only if geni.us link, force https
            if (domain.startsWith("http://")){
                domain = domain.replace("http://", "https://");
            }
            if (!domain.startsWith("https://")){
                domain = "https://" + domain;
            }                
        } else { // Otherwise, for now, default the rest to using http
            if (!domain.startsWith("http://") && !domain.startsWith("https://")){
                domain = "http://" + domain;
            }
        }

        newLink = domain + "/" + data.ShortUrl.Code;
        chrome.storage.local.set({"lastCreatedLink": newLink});
        chrome.storage.local.get(["createdLinks"]).then((r6) => {
            chrome.storage.local.set({"createdLinks": parseInt(r6.createdLinks) + 1});
        });

        tryHandleSuccess(newLink);
    }, function (error) {
        let error401 = JSV.parse(error).ResponseStatus.ErrorCode;
        if (error401 == 'AuthenticationException') {
            alert('Oops! Those keys don\'t appear to be right. Please double check your API Key and Secret.');
        } else {
            alert('Hmm.. looks like we\'re having trouble connecting. Try again, or email help@geni.us to let us know.');
        }
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "createGeniusLink" && msg.url) {
        createGeniusLink(msg.url);
    }

    sendResponse();
});

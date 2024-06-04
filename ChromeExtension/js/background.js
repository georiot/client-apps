document.addEventListener('DOMContentLoaded', function () {
    var options = {
        attribute: "data-bind",        // default "data-sbind"
        globals: window,               // default {}
        bindings: ko.bindingHandlers,  // default ko.bindingHandlers
        noVirtualElements: false       // default true
    };
    ko.bindingProvider.instance = new ko.secureBindingsProvider(options);

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

function createGeniusLink(url) {
    var groupsUrl = "chrome-extension://" + chrome.runtime.id + "/alertLoadingInside.html";
    chrome.storage.local.get(["wrongKeys"]).then((r1) => {
        var wrongKeys = r1.wrongKeys;
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

        chrome.storage.local.get(["apiKey"]).then((r2) => {
            var apiKey = r2.apiKey;
            chrome.storage.local.get(["apiSecret"]).then((r3) => {
                var apiSecret = r3.apiSecret;

                chrome.storage.local.get(["defaultGroupId"]).then((r4) => {
                    var defaultGroupId = r4.defaultGroupId;
                    chrome.storage.local.get(["selectedDomainName"]).then((r5) => {
                        var selectedDomainName = r5.selectedDomainName;
                        
                        fetch("https://api.geni.us/v3/shorturls", {
                            method: 'POST',
                            headers: {
                                'X-Api-Key': apiKey,
                                'X-Api-Secret': apiSecret,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                GroupId: defaultGroupId,
                                Domain: selectedDomainName,
                                Url: url
                            })
                          }).then(response => {
                            alert(JSON.stringify(response));
                            if (!response.ok) {
                                throw Error(response.status);
                            }
                            
                            return response.json();
                        }).then(data => {
                            alert(JSON.stringify(data));
                            var domain = data.shortUrl.domain.toString();

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

                            newLink = domain + "/" + data.shortUrl.code;
                            chrome.storage.local.set({"lastCreatedLink": newLink});
                            chrome.storage.local.get(["createdLinks"]).then((r6) => {
                                var createdLinks = r6.createdLinks;
                                chrome.storage.local.set({"createdLinks": parseInt(createdLinks) + 1});
                            });

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
                            
                            copyToClipBoard(newLink);
                        }).catch(error => {
                            if (error.message == '401') {
                                alert('Oops! Those keys don\'t appear to be right. Please double check your API Key and Secret.');
                            } else {
                                alert('Hmm.. looks like we\'re having trouble connecting. Try again, or email help@geni.us to let us know.');
                            }
                        });
                    });
                });
            });
        });
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "createGeniusLink" && msg.url != undefined && msg.url !== "") {
        createGeniusLink(msg.url);
    }

    sendResponse();
});

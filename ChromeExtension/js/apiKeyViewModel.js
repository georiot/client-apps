var apiKeyViewModel = {
    apiKey: ko.observable(''),
    apiSecret: ko.observable(''),
    showBackLink: ko.observable(false),
    showHelpLink: ko.observable(true),
    newInstall: ko.observable(true),
    UrlApiKeys: ko.observable('')
};

apiKeyViewModel.apiKey.subscribe(function (newValue) {
    chrome.storage.local.set({"apiKey": newValue});
});

apiKeyViewModel.apiSecret.subscribe(function (newValue) {
    chrome.storage.local.set({"apiSecret": newValue});
});

chrome.storage.local.get(["defaultGroup"]).then((group) => {
    if (group) {
        apiKeyViewModel.showBackLink(true);
        apiKeyViewModel.showHelpLink(false);
        apiKeyViewModel.newInstall(false);
        apiKeyViewModel.UrlApiKeys = ('https://my.geni.us/tools#api-section');
    }
});

apiKeyViewModel.loadKey = function() {
    chrome.storage.local.get(["apiKey"]).then((result) => {
        if (typeof result.apiKey !== 'undefined') {
            apiKeyViewModel.apiKey(result.apiKey);
        }
    });

    chrome.storage.local.get(["apiSecret"]).then((result) => {
        if (typeof result.apiSecret !== 'undefined') {
            apiKeyViewModel.apiSecret(result.apiSecret);
        }
    });
};

apiKeyViewModel.saveKeys = function () {
    if (apiKeyViewModel.apiKey() !== "" && apiKeyViewModel.apiSecret() !== "") {
        chrome.storage.local.set({"apiKey":  apiKeyViewModel.apiKey()});
        chrome.storage.local.set({"apiSecret":  apiKeyViewModel.apiSecret()});
    } else {
        $("#dialog").dialog({
            draggable: false,
            modal: true
        });

        $("#networkError").html("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");
    }
};

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

apiKeyViewModel.loadKey();
if (testModel == undefined) {
    ko.applyBindings(apiKeyViewModel);
} else {
    testModel = apiModel;
}
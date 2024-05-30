function apiKeyViewModel() {
    var self = this;
    self.apiKey = ko.observable('');
    self.apiSecret = ko.observable('');
    self.showBackLink = ko.observable(false);
    self.showHelpLink = ko.observable(true);
    self.newInstall = ko.observable(true);
    self.UrlApiKeys = ko.observable('');

    self.apiKey.subscribe(function (newValue) {
        chrome.storage.local.set({"apiKey": newValue});
    });

    self.apiSecret.subscribe(function (newValue) {
        chrome.storage.local.set({"apiSecret": newValue});
    });

    self.loadKey = function () {
        chrome.storage.local.get(["apiKey"]).then((ak) => {
            if (typeof ak !== 'undefined') {
                self.apiKey(ak);
            }
        });
        chrome.storage.local.get(["apiSecret"]).then((asa) => {
            if (typeof asa !== 'undefined') {
                self.apiSecret(asa);
            }
        });
    }

    chrome.storage.local.get(["defaultGroup"]).then((group) => {
        if (group != null && group != "") {
            self.showBackLink(true);
            self.showHelpLink(false);
            self.newInstall(false);
            self.UrlApiKeys = ('https://my.geni.us/tools#api-section');
        }
    });

    self.saveKeys = function () {
        var Empty = "";
        if (self.apiKey() !== null && self.apiSecret() !== null && self.apiKey() !== Empty && self.apiSecret() !== Empty) {
            chrome.storage.local.set({"apiKey":  self.apiKey()});
            chrome.storage.local.set({"apiSecret":  self.apiSecret()});
        } else {
            $("#dialog").dialog({
                draggable: false,
                modal: true
            });

            $("#networkError").html("Oops! Those keys don't appear to be right. Please double check your API Key and Secret.");
        }
    }
}

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

var apiModel = new apiKeyViewModel();
apiModel.loadKey();
if (typeof testModel === 'undefined') {
    ko.applyBindings(apiModel);
} else {
    testModel = apiModel;
}
function apiKeyViewModel() {


    var self = this;
    self.apiKey = ko.observable('');
    self.apiSecret = ko.observable('');
    self.showBackLink = ko.observable(false);
    self.showHelpLink = ko.observable(true);
    self.newInstall = ko.observable(true);
    self.UrlApiKeys = ko.observable('');


    self.apiKey.subscribe(function (newValue) {
        localStorage.setItem("apiKey", newValue);
    });

    self.apiSecret.subscribe(function (newValue) {
        localStorage.setItem("apiSecret", newValue);
    });


    self.loadKey = function () {
        var ak = localStorage["apiKey"];
        if (typeof ak !== 'undefined') {
            self.apiKey(ak);
        }
        var asa = localStorage["apiSecret"];
        if (typeof asa !== 'undefined') {
            self.apiSecret(asa);
        }

    }

    if (localStorageHasValue("defaultGroup")) {
        self.showBackLink(true);
        self.showHelpLink(false);
        self.newInstall(false);
        self.UrlApiKeys = ('https://my.geni.us/tools#api-section');
    }

    self.saveKeys = function () {
        var Empty = "";
        if (self.apiKey() !== null && self.apiSecret() !== null && self.apiKey() !== Empty && self.apiSecret() !== Empty) {
            localStorage.setItem("apiKey", self.apiKey());
            localStorage.setItem("apiSecret", self.apiSecret());


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
function customDomainViewModel() {
    var self = this;
    self.selectedDomain = ko.observable();
    self.domainArray = ko.observableArray();

    self.selectedDomain.subscribe(function (newValue) {
        chrome.storage.local.set({"selectedDomainName": newValue.name});
    });

    chrome.storage.local.get(["apiKey"]).then((apiKey) => {
        chrome.storage.local.get(["apiSecret"]).then((apiSecret) => {
            var client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);

            client.getFromService('custom-domains/domains', {
                format: 'jsv'
            }, function (resp) {
                chrome.storage.local.get(["selectedDomainName"]).then((ak) => {
                    var result = resp['Domains'];
                    for (var i = 0; i < result.length; i++) {
                        var newItem = {
                            name: result[i]['Name'],
                            id: i
                        };
            
                        self.domainArray.push(newItem);
            
                        if (typeof ak !== 'undefined' && ak === result[i]['Name']) {
                            self.selectedDomain(newItem);
                        }
                    }
                });
            }, function (error) {
                alert(error)
            });
        });
    });
}

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

var customDomainModel = new customDomainViewModel();
if (typeof testModel === 'undefined') {
    ko.applyBindings(customDomainModel);
} else {
    testModel = customDomainModel;
}
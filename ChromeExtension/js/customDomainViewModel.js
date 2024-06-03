var customDomainModel = {
    selectedDomain: ko.observable(),
    domainArray: ko.observableArray()
};

customDomainModel.selectedDomain.subscribe(function (newValue) {
    chrome.storage.local.set({"selectedDomainName": newValue.name});
});

chrome.storage.local.get(["apiKey"]).then((r1) => {
    var apiKey = r1.apiKey;
    chrome.storage.local.get(["apiSecret"]).then((r2) => {
        var apiSecret = r2.apiSecret;
        var client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);

        client.getFromService('custom-domains/domains', {
            format: 'jsv'
        }, function (resp) {
            chrome.storage.local.get(["selectedDomainName"]).then((r3) => {
                var domain = r3.selectedDomainName;
                var result = resp['Domains'];
                for (var i = 0; i < result.length; i++) {
                    var newItem = {
                        name: result[i]['Name'],
                        id: i
                    };
        
                    customDomainModel.domainArray.push(newItem);
        
                    if (typeof domain !== 'undefined' && domain === result[i]['Name']) {
                        customDomainModel.selectedDomain(newItem);
                    }
                }
            });
        }, function (error) {
            alert(error)
        });
    });
});

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

if (typeof testModel === 'undefined') {
    ko.applyBindings(customDomainModel);
} else {
    testModel = customDomainModel;
}
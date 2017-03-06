function customDomainViewModel() {

    var self = this;
    self.selectedDomain = ko.observable();
    self.domainArray = ko.observableArray();

    self.selectedDomain.subscribe(function (newValue) {
        localStorage.setItem("selectedDomainName", newValue.name);

    });



    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('custom-domains/domains', {
        format: 'jsv'
    }, function (resp) {
        var ak = localStorage["selectedDomainName"];

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

        //self.loadKey();

    }, function (error) {
        alert(error)
    });




}



var customDomainModel = new customDomainViewModel();

if (typeof testModel === 'undefined') {
    ko.applyBindings(customDomainModel);

} else {
    testModel = customDomainModel;
}
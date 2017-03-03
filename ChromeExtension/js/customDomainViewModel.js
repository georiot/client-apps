function customDomainViewModel() {

    var self = this;
    self.selectedDomain = ko.observable('');
    self.domainArray = ko.observableArray();
    
    self.selectedDomain.subscribe(function(newValue) {
        localStorage.setItem("selectedDomain", newValue.name);
    });



    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('custom-domains/domains', {
        format: 'jsv'
    }, function (resp) {
        var result = resp['Domains'];
        for (var i = 0; i < result.length; i++) {
            self.domainArray.push({
                name: result[i]['Name'],
                id: i,
            
           });
        }


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
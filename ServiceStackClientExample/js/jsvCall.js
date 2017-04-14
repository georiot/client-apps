var apiKey = '';
var apiSecret = '';


var client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);

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

}, function (error) {
    alert(error)
});
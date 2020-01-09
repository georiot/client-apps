function lastLinksViewModel() {


    var self = this;
    self.loadingOption = ko.observable('Loading links...');
    self.details = ko.observable('');
    self.resultsArray = ko.observableArray('');
    self.tableHeader = ko.observable('');
    self.openTab = function (data, event) {

        chrome.tabs.create({
            url: event.target.href,
        });

    }


    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('links/list' + '?groupid=' + localStorage['defaultGroupId'] + '&take=5', {
        format: 'jsv'
    }, function (resp) {
        var results = resp['Results'];
        if (results.length === 0) {
            self.loadingOption('You don\'t have links in this group. Go ahead and add a lot!');
        } else {

            for (var i = 0; i < results.length; i++) {
				var current = results[i];
				var urlToShow = current['ShortUrlCode'];
				var baseUrl = current['ShortUrlCode'];
				if(typeof(current.Aliases) != "undefined" && current.Aliases.length > 0)
				{
					urlToShow = current.Aliases[0].Code;
					baseUrl = current.Aliases[0].BaseCode;
                }
                
                var ssl = false
                var domainsString = localStorage["customDomains"];
                if (domainsString == undefined){
                    domainsString = '[]';
                }
                var domains = JSON.parse(domainsString);
                var currentInfo = domains.filter(x => x.name == current['Domain'])[0];
                if (current['Domain'] == 'geni.us' || (domains != undefined && domains.length > 0 && currentInfo != undefined)){
                    ssl = true;
                }

                self.resultsArray.push({
                    url: (ssl? 'https://' : 'http://') + current['Domain'] + '/' + urlToShow,
                    totalClicks: current['TotalClicks'],
                    editUrl: 'https://my.geni.us/links#!editlink=' + baseUrl
                });
            }

            self.loadingOption('');
            self.tableHeader('\
                              <th>Links</th>\
                              <th>Clicks</th>\
                              ');
        }
    }, function (error) {

        $('#loadingOption').remove();
        $('#dialog').dialog({
            draggable: false,
            modal: true
        });

        $('#networkError').html('Hmm.. we couldn\'t find any groups in your account. Create a new one, or email help@geni.us and we can take a look.');
        console.error('Error: ', error);
    });




}
$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});


var lastLinksModel = new lastLinksViewModel();
if (typeof testModel === 'undefined') {
    ko.applyBindings(lastLinksModel);

} else {
    testModel = lastLinksModel;
}
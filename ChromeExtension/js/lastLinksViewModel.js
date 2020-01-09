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
                
                var ssl = false;
                if (current['Domain'] == 'geni.us'){
                    // todo: should add a force-refresh button so we can load domains
                    // and know its SSL cert validity from the get-go
                    // Right now, we're checking for domains + SSL whenever we visit the specific options
                    // e.g. "View last 5 links" and "Select custom domain", which equals degraded performance
                    // If we were to check from the first/home "page", we won't be able to refresh the
                    // domains and links list, thus we need the force-refresh button implemented
                    // For now, this shall do
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
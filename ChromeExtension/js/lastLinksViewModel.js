function lastLinksViewModel() {


    var self = this;
    self.loadingOption = ko.observable('Loading links...');
    self.details = ko.observable('');
    self.resultsArray = ko.observableArray();
    self.openTab = function (data, event) {
        
        chrome.tabs.create({
                url: event.target.href,
             });
    }


    var client = new GeniusLinkServiceClient("https://api.geni.us/v1", localStorage["apiKey"], localStorage["apiSecret"]);

    client.getFromService("links/list" + "?groupid=" + localStorage["defaultGroupId"] + "&numberoflinks=5", {
        format: "jsv"
    }, function (resp) {        
        var results = resp["Results"];                
        if (results.length === 0) {
            self.loadingOption('You don\'t have links in this group. Go ahead and add a lot!');
        }
        else
        {
            for (var i = 0; i < results.length; i++) {
                self.resultsArray.push({
                    url: "http://geni.us/" + results[i]["ShortUrlCode"],
                    totalClicks: results[i]["TotalClicks"]
                });
            }    
        }
        self.loadingOption("");    


    }, function (error) {

        $("#loadingOption").remove();
        $("#dialog").dialog({
            draggable: false,
            modal: true
        });
        $("#networkError").html('Hmm.. we couldn\'t find any groups in your account. Create a new one, or email help@geni.us and we can take a look.');
        console.error("Error: ", error);
    });




}


var lastLinksModel = new lastLinksViewModel();
if (typeof testModel === 'undefined') {
    ko.applyBindings(lastLinksModel);

} else {
    testModel = lastLinksModel;
}
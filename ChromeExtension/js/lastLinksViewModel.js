function lastLinksViewModel() {


    var self = this;
    self.loadingOption = ko.observable('Loading links...');
    self.details = ko.observable('');
    self.resultsArray = ko.observableArray('');
    // self.openTab =  function(data, event) {
    //    alert("you clicked " + event.target.href);
    // }
    self.openTab = function (data, event) {
        chrome.tabs.create({
                url: event.target.href,
                
                
            });
    }


    var client = new GeniusLinkServiceClient("https://api.geni.us/v1", localStorage["apiKey"], localStorage["apiSecret"]);

    client.getFromService("links/list" + "?groupid=" + localStorage["defaultGroupId"] + "&numberoflinks=5", {
        format: "jsv"
    }, function (data) {
        var resp = data;
        var results = resp["Results"];
        self.resultsArray(results);
        console.log(self.resultsArray);
        if (results.length == 0) {
            self.loadingOption("You don't have links in this group. Go ahead and add a lot!");
        }

        for (var i = 0; i < 5; i++) {

            // self.details("<li style=font-size:13px><a  href=http://geni.us/" + results[i]["ShortUrlCode"] + ">http://geni.us/" + results[i]["ShortUrlCode"] + "</a>&nbsp;Total Clicks:&nbsp;" + results[i]["TotalClicks"] + "</li>");
            self.resultsArray("<li style=font-size:13px><a  href=http://geni.us/" + results[i]["ShortUrlCode"] + ">http://geni.us/" + results[i]["ShortUrlCode"] + "</a>&nbsp;Total Clicks:&nbsp;" + results[i]["TotalClicks"] + "</li>")
            
            self.loadingOption("")

        }





    }, function (error) {

        $("#loadingOption").remove();
        $("#dialog").dialog({
            draggable: false,
            modal: true
        });
        $("#networkError").html("Hmm.. we couldn't find any groups in your account. Create a new one, or email help@geni.us and we can take a look.");
        console.error("Error: ", error);
    });




}


var lastLinksModel = new lastLinksViewModel();
if (typeof testModel === 'undefined') {
    ko.applyBindings(lastLinksModel);

} else {
    testModel = lastLinksModel;
}
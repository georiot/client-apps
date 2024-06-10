var lastLinksModel = {
    loadingOption: ko.observable('Loading links...'),
    details: ko.observable(''),
    resultsArray: ko.observableArray(),
    tableHeader: ko.observable(''),
    openTab: function (data, event) {
        chrome.tabs.create({
            url: event.target.href,
        });
    }
};

let apiKey = (await chrome.storage.local.get(["apiKey"])).apiKey;
let apiSecret = (await chrome.storage.local.get(["apiSecret"])).apiSecret;
let defaultGroupId = (await chrome.storage.local.get(["defaultGroupId"])).defaultGroupId;
let client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);
client.getFromService('links/list' + '?groupid=' + defaultGroupId + '&take=5', {
    format: 'jsv'
}, function (resp) {
    let results = resp['Results'];
    if (results.length === 0) {
        lastLinksModel.loadingOption('You don\'t have links in this group. Go ahead and add a lot!');
    } else {
        for (let i = 0; i < results.length; i++) {
            let current = results[i];
            let currentDomain = current['Domain'];
            let urlToShow = current['ShortUrlCode'];
            let baseUrl = current['ShortUrlCode'];
            if(typeof(current.Aliases) != "undefined" && current.Aliases.length > 0)
            {
                currentDomain = current.Aliases[0].Domain;
                urlToShow = current.Aliases[0].Code;
                baseUrl = current.Aliases[0].BaseCode;
            }
            lastLinksModel.resultsArray.push({
                url: (currentDomain == 'geni.us'? 'https://' : 'http://') + currentDomain + '/' + urlToShow,
                totalClicks: current['TotalClicks'],
                editUrl: 'https://my.geni.us/links#!editlink=' + baseUrl
            });
        }

        lastLinksModel.loadingOption('');
        lastLinksModel.tableHeader('\
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

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

if (testModel == undefined) {
    ko.applyBindings(lastLinksModel);
} else {
    testModel = lastLinksModel;
}
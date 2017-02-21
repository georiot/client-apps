function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage != "";
}

// Add link function

GeniusLinkServiceClient.prototype = JsvServiceClient.prototype;

function GeniusLinkServiceClient(baseUrl, apiKey, apiSecret) {
    var that = this;
    JsvServiceClient.call(this, baseUrl);
    that.baseSyncReplyUri = baseUrl;
    that.baseAsyncOneWayUri = baseUrl;
    that.apiSecret = apiSecret;
    that.apiKey = apiKey;
    that.getFromService = function (url, objectToProcess, callback) {
        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;
        objectToProcess.format = "jsv";

        GeniusLinkServiceClient.prototype.getFromService.call(this, url, objectToProcess, callback);
    }
}




var client = new GeniusLinkServiceClient("https://api.geni.us/v1", "key", "alfredo");

client.getFromService("affiliate/stats", {
    format: "jsv"
}, function (data) {
    alert(data.TotalProgramsAvailable);
}, function (data) {});
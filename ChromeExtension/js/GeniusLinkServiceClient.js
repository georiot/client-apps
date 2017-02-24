GeniusLinkServiceClient.prototype = JsvServiceClient.prototype;



function GeniusLinkServiceClient(baseUrl, apiKey, apiSecret) {

    var that = this;
    JsvServiceClient.call(this, baseUrl);
    that.baseSyncReplyUri = baseUrl;
    that.baseAsyncOneWayUri = baseUrl;
    that.apiSecret = apiSecret;
    that.apiKey = apiKey;
    that.getFromService = function (url, objectToProcess, callback, error) {
        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;
        objectToProcess.format = 'jsv';
        GeniusLinkServiceClient.prototype.getFromService.call(this, url, objectToProcess, callback, error);
    };
    that.postFormDataToService = function (url, objectToProcess, callback, error) {
        GeniusLinkServiceClient.prototype.postFormDataToService.call(this, url + '?apiKey=' + that.apiKey + '&apiSecret=' + that.apiSecret + '&format=jsv' , objectToProcess,
            callback, error);
    };
    that.postToService = function (url, objectToProcess, callback, error) {

        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;
        GeniusLinkServiceClient.prototype.postFormDataToService.call(this, url + '?apiKey=' + that.apiKey + '&apiSecret=' + that.apiSecret + '&format=jsv', objectToProcess,
            callback, error);
    };
}
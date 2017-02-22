GeniusLinkServiceClient.prototype = JsvServiceClient.prototype;


function GeniusLinkServiceClient(baseUrl, apiKey, apiSecret) {
    var that = this;
    JsvServiceClient.call(this, baseUrl);
    that.baseSyncReplyUri = baseUrl;
    that.baseAsyncOneWayUri = baseUrl;
    that.apiSecret = apiSecret;
    that.apiKey = apiKey;
    that.getFromService = function (url, objectToProcess, callback,error) {
        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;
        objectToProcess.format = "jsv";

        GeniusLinkServiceClient.prototype.getFromService.call(this, url, objectToProcess, callback, error);
    }




}
GeniusLinkServiceClientPost.prototype = JsvServiceClient.prototype;
GeniusLinkServiceClientPost2.prototype = JsvServiceClient.prototype;
function GeniusLinkServiceClientPost(baseUrl, apiKey, apiSecret) {
    var that = this;
    JsvServiceClient.call(this, baseUrl);
    that.baseSyncReplyUri = baseUrl;
    that.baseAsyncOneWayUri = baseUrl;
    that.apiSecret = apiSecret;
    that.apiKey = apiKey;
    that.postFormDataToService = function (url, objectToProcess, callback, error) {
        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;

        GeniusLinkServiceClientPost.prototype.postFormDataToService.call(this, url, objectToProcess,
            callback, error);
    }
}
function GeniusLinkServiceClientPost2(baseUrl, apiKey, apiSecret) {
    var that = this;
    JsvServiceClient.call(this, baseUrl);
    that.baseSyncReplyUri = baseUrl;
    that.baseAsyncOneWayUri = baseUrl;
    that.apiSecret = apiSecret;
    that.apiKey = apiKey;
    that.postToService = function (url, objectToProcess, callback, error) {
        objectToProcess.apiKey = that.apiKey;
        objectToProcess.apiSecret = that.apiSecret;

        GeniusLinkServiceClientPost2.prototype.postFormDataToService.call(this, url, objectToProcess,
            callback, error);
    }
}
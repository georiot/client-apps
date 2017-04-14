var apiKey = '';
var apiSecret = '';
var fetchUrl = 'custom-domains/domains';


var client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);

client.getFromService(fetchUrl, {
    format: 'jsv'
}, function (resp) {

    alert(resp);

}, function (error) {
    var parseError = JSV.parse(error);
    var error401 = parseError.ResponseStatus.ErrorCode;
     if (error401 == 'AuthenticationException' || error401 == 'Unauthorized') {
         alert("oops, wrong keys");
     }
});
const baseUrl = 'https://api.geni.us';

export function getLinksList(key, secret) {
    const endpoint = '/v1/links/list';
    const groupId = 0;
    const maxlinks = 100;

    var url = baseUrl + endpoint + '?groupid=' + groupId + '&numberoflinks=' + maxlinks;
    var options = 
    {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
            'X-Api-Secret': secret,
            Accept: 'application/json',
        }
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => responseJson.Results);
}

export function getGroupsList(key, secret) {
    const endpoint = '/v1/groups/list';

    var url = baseUrl + endpoint;
    var options = 
    {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
            'X-Api-Secret': secret,
            Accept: 'application/json',
        }
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => responseJson.Groups);
}

export function getReportsClicksTrendByResolution(key, secret) {
    const endpoint = '/v1/reports/click-trend-by-resolution';

    var url = baseUrl + endpoint;
    var options =
    {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
            'X-Api-Secret': secret,
            Accept: 'application/json',
        }
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => responseJson.ClicksByDate);
}

export function getLinkErrors(key, secret){
    const endpoint = '/v2/link-errors';

    var url = baseUrl + endpoint;
    var options =
    {
        method: 'GET',
        headers: {
            'X-Api-Key': key,
            'X-Api-Secret': secret,
            Accept: 'application/json',
        }
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => responseJson.TotalShown);
}

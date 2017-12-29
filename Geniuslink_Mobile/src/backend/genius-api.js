const baseUrl = 'https://api.geni.us';

export function listLinks(key, secret) {
    const baseUrl = 'https://api.geni.us';
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

    return fetch(url, options);
}
  
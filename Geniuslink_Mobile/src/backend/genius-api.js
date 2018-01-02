const baseUrl = 'https://api.geni.us';

export function listLinks(key, secret) {
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

export function listGroups(key, secret) {
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

export function createSimpleLink(key,secret,url,tsid)
{
    
    var encodedUrl = encodeURI(url);
    var payload =  {
        'url':encodedUrl,
        'tsid':tsid,
        'domain':'geni.us'
    };
    
    const endpoint = '/v1/links/add';
    
        var url = baseUrl + endpoint;
        var options = 
        {
            method: 'POST',
            headers: {
                'X-Api-Key': key,
                'X-Api-Secret': secret,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(payload)
        };
    
        fetch(url, options).then((response)=>alert(JSON.stringify(response))); // Ideally this should be a proper inspection and answer or give back a user message.
}

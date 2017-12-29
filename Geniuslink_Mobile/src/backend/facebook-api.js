const baseUrl = 'https://graph.facebook.com/v2.11/';
const access_token = '';

export function getCampaignInsights(campaign_id, access_token) {
    const fields = 'date_start,date_stop,impressions,spend,account_id,campaign_id,campaign_name,cpc,cpm,cpp,reach';

    // Need to pass the access_token

    var url = baseUrl + campaign_id + '/insights?fields=' + fields;

    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => responseJson.data[0]);
}

/* Basically here is what I got to work with cURL:

curl -G \
        -d "access_token=${FACEBOOK_TOKEN}" \
        "https://graph.facebook.com/v2.11/6086180072611/insights?fields=date_start,date_stop,impressions,spend,account_id,campaign_id,campaign_name,cpc,cpm,cpp,reach"

*/

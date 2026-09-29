function localStorageHasValue(val) {
    return localStorage[val] != null && localStorage[val] !== '';
}

if (location.pathname === '/alertDoneInside.html' || location.pathname === '/alertDoneOutside.html') {
    var params = new URLSearchParams(location.hash.slice(1));
    var lastCreatedLink = params.get('url') || localStorage['lastCreatedLink'];
    document.getElementById('lastCreatedLink').textContent = lastCreatedLink || '';
    if (lastCreatedLink) {
        var linkPath = new URL(lastCreatedLink).pathname.slice(1);
        document.getElementById('dashboardLink').href = 'https://my.geni.us/links#!editlink=' + encodeURIComponent(linkPath);
    }
    if (params.get('copied') === 'false') {
        document.querySelector('.successText').textContent = 'Link created. Automatic copy failed; select and copy the link above.';
    }
}

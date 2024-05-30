document.addEventListener('DOMContentLoaded', function() {

    $('#instructions').on('click', 'a', function() {
        chrome.tabs.create({
            url: $(this).attr('href')
        });
        return false;
    });

    chrome.storage.local.get(["defaultGroup"]).then((group) => {
        if (group != null && group != "") {
            $('#apikeys').css('visibility', 'hidden');
            $('#groups').css('visibility', 'visible');
        } else {
            $('#groups').css('visibility', 'hidden');
            $('#apikeys').css('visibility', 'visible');
        }
    });

    $('#back').on('click','a', function(){
        window.location.href = window.history.back(1);
    });
});

document.addEventListener("DOMContentLoaded", function() {

    $('#instructions').on('click', 'a', function() {
        chrome.tabs.create({
            url: $(this).attr('href')
        });
        return false;
    });



});

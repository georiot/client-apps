document.addEventListener("DOMContentLoaded", function() {

    $('#instructions').on('click', 'a', function() {
        chrome.tabs.create({
            url: $(this).attr('href')
        });
        return false;
    });

    if (localStorage["defaultGroup"] != null && localStorage != "") {
        $("#apikeys").css("visibility", "hidden");
        $("#groups").css("visibility", "visible");
    } else {
        $("#groups").css("visibility", "hidden");
        $("#apikeys").css("visibility", "visible");
    }


});

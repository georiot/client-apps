document.addEventListener('DOMContentLoaded', function() {


    var getGroupList = getJSON("https://api.geni.us/v1/links/list", "groupid=" + localStorage["defaultGroupId"] + "&numberoflinks=5").then(function(response) {
        console.log("json saved");
        var resp = JSON.parse(response);
        var results = resp["Results"];

        console.log(results);

        if(results.length == 0) {
          $("#loadingOption").text("You don't have links in this group. Go ahead and add a lot!");
        }

        for (var i = 0; i < 5; i++) {
            $("#results").append("<li style=font-size:13px><a href=http://geni.us/" + results[i]["ShortUrlCode"] + ">http://geni.us/" + results[i]["ShortUrlCode"] + "</a>&nbsp;Total Clicks:&nbsp;" + results[i]["TotalClicks"] + "</li>");
            $("#loadingOption").remove();




        }






    }, function(error) {

        $("#loadingOption").remove();
        $("#dialog").dialog({
            draggable: false,
            modal: true
        });
        $("#networkError").html("Hmm.. we couldn't find any groups in your account. Create a new one, or email help@geni.us and we can take a look.");
        console.error("Error: ", error);
    });

    $('#results').on('click', 'a', function() {
        chrome.tabs.create({
            url: $(this).attr('href')
        });
        return false;
    });


});

var groupsList = [];

var groupsIds = [];

function groupsViewModel() {

    var self = this;
    self.createLinkFromButton = function () {
        createGeniusCurrentTab();
        setTimeout(function () {
            window.location.href = "alertLoadingInside.html";
        }, 1000);



    }
}

document.addEventListener('DOMContentLoaded', function () {

    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('groups/list', {
        format: 'jsv'
    }, function (data) {
        var resp = data;
        var groups = resp['Groups'];
        if (groups.length === 0) {
            $('#dialog').dialog({
                draggable: false,
                modal: true
            });
            $('#networkError').html('Hmm.. we couldn\'t find any groups in your account. Create a new one, or email help@geni.us and we can take a look.');


        }
        for (var i = 0; i < groups.length; i++) {
            if (groups[i]['Enabled'] == 1) {
                groupsList.push(groups[i]['Name']);
                groupsIds.push(groups[i]['Id']);
            }

            if (localStorage['defaultGroup'] == null) {
                localStorage.setItem('defaultGroup', groups[0]['Name']);
                localStorage.setItem('defaultGroupId', groups[0]['Id']);
            }
        }

        localStorage.setItem('groups', JSON.stringify(groupsList));
        localStorage.setItem('groupsIds', JSON.stringify(groupsIds));

        var groups = JSON.parse(localStorage['groups']);
        var listId = JSON.parse(localStorage['groupsIds']);
        var x = document.getElementById('listOfGroups');

        for (var i = 0; i < groups.length; i++) {
            var c = document.createElement('option')
            c.id = groups[i];
            c.value = listId[i];
            c.text = groups[i];
            x.options.add(c, i);


        }

        $('#loadingOption').remove();
        $('#' + localStorage['defaultGroup'] + '').attr('selected', true);

        chrome.extension.sendMessage({
                name: 'CreateContentMenus',
            },
            function (response) {});


    }, function (error) {
        $('#loadingOption').text('Please verify your keys');
        $('#dialog').dialog({
            draggable: false,
            modal: true
        });

        $('#networkError').html('Hmm.. we couldn\'t find any groups in your account. Create a new one, or email help@geni.us and we can take a look.');

        console.error('Error: ', error);
    });
}, function (data) {})



listOfGroups.addEventListener('change', function () {

    var defaultGroup = document.getElementById('listOfGroups').value;
    var e = document.getElementById('listOfGroups');
    var groupName = e.options[e.selectedIndex].text;
    var groupId = e.options[e.selectedIndex].value;

    localStorage.setItem('defaultGroup', groupName);
    localStorage.setItem('defaultGroupId', groupId);




    document.getElementById("result").innerHTML = 'Saved! <img src=images/check.svg>';
    $('#result').fadeIn(3000);

    setTimeout(function () {

        $("#result").html("&nbsp;").fadeIn(3000);
    }, 3000);





    chrome.storage.sync.set({
        'defaultGroup': groupName
    });


});


var groupsModel = new groupsViewModel();
if (typeof testModel === 'undefined') {
    ko.applyBindings(groupsModel);

} else {
    testModel = groupsModel;
}
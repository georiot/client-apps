var groupsList = [];

var groupsIds = [];

var groupsModel = {
    createLinkFromButton: function () {
        window.location.href = "alertLoadingInside.html";
    },
    thumbsup: function () {
        bootbox.confirm({
            size: "large",
            title: "Great to hear!",
            message: "Would you mind helping us out by leaving a review at the Chrome Store? \n Each review makes a huge difference.",
            buttons: {
                confirm: {
                    label: 'Sure, take me there!',
                    className: 'btn btn-primary btn-sm pull-left'
                },
                cancel: {
                    label: 'Done / Dismiss',
                    className: 'btn btn-danger btn-sm pull-right'
                }
            },
            callback: function (result) {
                if (result == true) {
                    var url = "https://chrome.google.com/webstore/detail/geniuslink-intelligent-li/fgoilnlnleemcedbmhoalpmhkefdppbm/reviews";
                    chrome.tabs.create({
                        url: url
                    });
                }

                chrome.storage.local.set({"doneReview": true});
                chrome.action.setPopup({
                    popup: "groups.html"
                });

                setTimeout(function () {
                    window.location.href = "groups.html";
                }, 500);
            }
        });
    },
    thumbsdown: function () {
        bootbox.confirm({
            size: "large",
            title: "Sorry to hear that!",
            message: "Please let us know if there is anything we can help with or if you have any suggestions.",
            buttons: {
                cancel: {
                    label: 'Contact us',
                    className: 'btn btn-primary btn-sm '
                },
                confirm: {
                    label: 'Ok',
                    className: 'btn btn-danger btn-sm '
                },
            },
            callback: function (result) {
                if (!result) {
                    var url = "https://www.geni.us/contact";
                    chrome.tabs.create({
                        url: url
                    });
                }

                chrome.storage.local.set({"doneReview": true});
                chrome.action.setPopup({
                    popup: "groups.html"
                });

                setTimeout(function () {
                    window.location.href = "groups.html";
                }, 500);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(["apiKey"]).then((r1) => {
        var apiKey = r1.apiKey;
        chrome.storage.local.get(["apiSecret"]).then((r2) => {
            var apiSecret = r2.apiSecret;
            var client = new GeniusLinkServiceClient('https://api.geni.us/v1', apiKey, apiSecret);

            client.getFromService('groups/list', {
                format: 'jsv'
            }, function (data) {
                var resp = data;
                var groups = resp['Groups'];

                chrome.storage.local.set({"wrongKeys": false});
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
                }

                var defaultGroupName = groups[0]['Name'];
                var defaultGroupId = groups[0]['Id'];
                chrome.storage.local.get(["defaultGroup"]).then((r3) => {
                    var defaultGroup = r3.defaultGroup;
                    if (defaultGroup == null) {
                        chrome.storage.local.set({'defaultGroup': defaultGroupName});
                        chrome.storage.local.set({'defaultGroupId': defaultGroupId});
                    }
                });
                
                chrome.storage.local.set({'groups': JSON.stringify(groupsList)});
                chrome.storage.local.set({'groupsIds': JSON.stringify(groupsIds)});

                var groupsLst = groupsList;
                var listId = groupsIds;
                var x = document.getElementById('listOfGroups');

                for (var i = 0; i < groupsLst.length; i++) {
                    var c = document.createElement('option')
                    c.id = groupsLst[i];
                    c.value = listId[i];
                    c.text = groupsLst[i];
                    x.options.add(c, i);
                }

                chrome.storage.local.get(["defaultGroup"]).then((r4) => {
                    var defaultGroup = r4.defaultGroup;
                    $('#loadingOption').remove();
                    $('#listOfGroups option[id="' + defaultGroup + '"]').attr('selected', true);

                    chrome.runtime.sendMessage({
                        action: 'CreateContextMenus',
                    }, function (response) {});
                });
            }, function (error) {
                var parseError = JSV.parse(error);
                var error401 = parseError.ResponseStatus.ErrorCode;
                
                chrome.storage.local.set({"wrongKeys": true});
                if (error401 == 'AuthenticationException' || error401 == 'Unauthorized') {
                    chrome.action.setPopup({
                        popup: "apikeys.html"
                    });

                    bootbox.confirm({
                        size: "large",
                        title: "Authentication error",
                        message: "Oops! Those keys don\'t appear to be right. Please double check your API Key and Secret.",
                        buttons: {
                            cancel: {
                                label: 'Get my API Keys',
                                className: 'btn btn-primary btn-sm '
                            },
                            confirm: {
                                label: 'Ok',
                                className: 'btn btn-danger btn-sm '
                            },
                        },
                        callback: function (result) {
                            if (!result) {
                                var url = "https://my.geni.us/tools#api-section";
                                chrome.tabs.create({
                                    url: url
                                });

                            }
                            setTimeout(function () {
                                window.location.href = "apikeys.html";
                            }, 500);
                        }
                    });
                }

                console.error('Error: ', error);
            });
        });
    });
}, function (data) {})

listOfGroups.addEventListener('change', function () {
    var e = document.getElementById('listOfGroups');
    var groupName = e.options[e.selectedIndex].text;
    var groupId = e.options[e.selectedIndex].value;

    chrome.storage.local.set({'defaultGroup': groupName});
    chrome.storage.local.set({'defaultGroupId': groupId});

    document.getElementById("result").innerHTML = 'Saved! <img src=images/check.svg>';
    $('#result').fadeIn(3000);

    setTimeout(function () {
        $("#result").html("&nbsp;").fadeIn(3000);
    }, 3000);

    chrome.storage.sync.set({
        'defaultGroup': groupName
    });
});

if (typeof testModel === 'undefined') {
    ko.applyBindings(groupsModel);
} else {
    testModel = groupsModel;
}
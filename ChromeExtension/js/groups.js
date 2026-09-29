var groupsList = [];

var groupsIds = [];

function groupsViewModel() {

    var self = this;
    self.createLinkFromButton = function () {
        window.location.href = "alertLoadingInside.html";
    }
    self.thumbsup = function () {
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
                localStorage.setItem("doneReview", true);
                chrome.action.setPopup({
                    popup: "groups.html"
                });

                setTimeout(function () {
                    window.location.href = "groups.html";
                }, 500);

            }
        })
    }

    self.thumbsdown = function () {
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
                localStorage.setItem("doneReview", true);
                chrome.action.setPopup({
                    popup: "groups.html"
                });

                setTimeout(function () {
                    window.location.href = "groups.html";
                }, 500);

            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function () {

    var client = new GeniusLinkServiceClient('https://api.geni.us/v1', localStorage['apiKey'], localStorage['apiSecret']);

    client.getFromService('groups/list', {
        format: 'jsv'
    }, function (data) {
        var groups = data.Groups.filter(function (group) {
            return group.Enabled == 1;
        }).sort(function (a, b) {
            return a.Name.localeCompare(b.Name, undefined, { sensitivity: 'base' });
        });
        localStorage.setItem('wrongKeys', false);
        groupsList = groups.map(function (group) { return group.Name; });
        groupsIds = groups.map(function (group) { return group.Id; });
        localStorage.setItem('groups', JSON.stringify(groupsList));
        localStorage.setItem('groupsIds', JSON.stringify(groupsIds));

        var list = document.getElementById('listOfGroups');
        list.options.length = 0;
        list.disabled = groups.length === 0;
        if (groups.length === 0) {
            $('#dialog').dialog({ draggable: false, modal: true });
            $('#networkError').text('Hmm.. we couldn\'t find any groups in your account. Create a new one, or email help@geni.us and we can take a look.');
            return;
        }

        var savedId = localStorage['defaultGroupId'];
        var savedName = localStorage['defaultGroup'];
        // IDs preserve the user's choice even if the group has been renamed.
        // Older settings may have only the name, so support that fallback too.
        var selected = groups.find(function (group) {
            return savedId ? String(group.Id) === savedId : group.Name === savedName;
        }) || groups.find(function (group) {
            return group.Name.toLowerCase() === 'default';
        }) || groups[0];

        groups.forEach(function (group) {
            var option = document.createElement('option');
            option.value = group.Id;
            option.text = group.Name;
            list.options.add(option);
        });
        list.value = String(selected.Id);
        localStorage.setItem('defaultGroup', selected.Name);
        localStorage.setItem('defaultGroupId', selected.Id);

        chrome.runtime.sendMessage({
                name: 'CreateContentMenus',
            },
            function (response) {});


    }, function (error) {
        var parseError = JSV.parse(error);
        var error401 = parseError.ResponseStatus.ErrorCode;
        localStorage.setItem("wrongKeys", true);
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
                        var url = "https://my.geniuslink.com/tools#api-section";
                        chrome.tabs.create({
                            url: url
                        });

                    }
                    setTimeout(function () {
                        window.location.href = "apikeys.html";
                    }, 500);



                }
            })


        }

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

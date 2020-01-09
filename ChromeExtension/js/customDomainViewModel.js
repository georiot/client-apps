function customDomainViewModel() {
    var self = this;
    self.selectedDomain = ko.observable(JSON.parse(localStorage["selectedDomain"]));
    self.domainArray = ko.observableArray(JSON.parse(localStorage["customDomains"]));

    self.selectedDomain.subscribe(function (newValue) {
        var old = localStorage["selectedDomain"];
        if (old != undefined && JSON.parse(old)["name"] != newValue.name){
            localStorage.setItem("selectedDomain", JSON.stringify(newValue));
        }
    });
}

$('#back').on('click', 'a', function () {
    window.location.href = window.history.back(1);
});

var customDomainModel = new customDomainViewModel();

if (typeof testModel === 'undefined') {
    ko.applyBindings(customDomainModel);

} else {
    testModel = customDomainModel;
}
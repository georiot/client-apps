function customDomainViewModel() {
    var self = this;
    self.selectedDomain = ko.observable();
    self.domainArray = ko.observableArray(JSON.parse(localStorage["customDomains"]));

    if (localStorage["selectedDomain"] != undefined){
        self.selectedDomain(JSON.parse(localStorage["selectedDomain"]));
    } else {
        self.selectedDomain(self.domainArray[0]);
    }

    self.selectedDomain.subscribe(function (newValue) {
        var old = localStorage["selectedDomain"];
        if (old == undefined){
            localStorage.setItem("selectedDomain", JSON.stringify(newValue));
        }
        else {
            if (JSON.parse(old)["name"] != newValue["name"]){
                localStorage.setItem("selectedDomain", JSON.stringify(newValue));
            }
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
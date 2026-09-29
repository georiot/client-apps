// Explicit bindings replace Knockout's expression compiler (new Function),
// which Manifest V3 disallows. Define new UI bindings here as code.
(function () {
    var bindings = {
        welcome: function (c) { return { visible: c.$data.newInstall }; },
        apiKey: function (c) { return { textInput: c.$data.apiKey }; },
        apiSecret: function (c) { return { textInput: c.$data.apiSecret }; },
        saveKeys: function (c) { return { click: c.$data.saveKeys }; },
        backLink: function (c) { return { visible: c.$data.showBackLink }; },
        helpLink: function (c) { return { visible: c.$data.showHelpLink }; },
        createLink: function (c) { return { click: c.$data.createLinkFromButton }; },
        thumbsup: function (c) { return { click: c.$data.thumbsup }; },
        thumbsdown: function (c) { return { click: c.$data.thumbsdown }; },
        domains: function (c) { return { options: c.$data.domainArray, optionsText: 'name', value: c.$data.selectedDomain }; },
        loading: function (c) { return { text: c.$data.loadingOption }; },
        tableHeader: function (c) { return { html: c.$data.tableHeader }; },
        results: function (c) { return { foreach: c.$data.resultsArray }; },
        resultLink: function (c) { return { text: c.$data.url, attr: { href: c.$data.url }, click: c.$parent.openTab }; },
        clicks: function (c) { return { text: c.$data.totalClicks }; },
        editLink: function (c) { return { attr: { href: c.$data.editUrl }, click: c.$parent.openTab, text: 'Edit' }; }
    };
    ko.bindingProvider.instance = {
        nodeHasBindings: function (node) { return node.nodeType === 1 && node.hasAttribute('data-bind-key'); },
        getBindingAccessors: function (node, context) {
            var name = node.getAttribute('data-bind-key');
            if (!name) return null;
            if (!bindings[name]) throw new Error('Unknown binding: ' + name);
            var accessors = {};
            Object.keys(bindings[name](context)).forEach(function (key) {
                accessors[key] = function () { return bindings[name](context)[key]; };
            });
            return accessors;
        }
    };
}());

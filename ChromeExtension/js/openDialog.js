chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.action == 'loading') {

        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute("scrolling", "no");

            iframe.src = chrome.runtime.getURL('frame.html');

        
            iframe.style.cssText = 'position:fixed;top:0px;right:0px;display:block;' +
                'width:300px;height:50px;z-index:1000;';
            document.body.appendChild(iframe);
        }
        setTimeout(function () {
            iframe.style.visibility = "hidden";
        }, 4000);
    }


    if (msg.action == 'linkCreated') {

        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute("scrolling", "no");

            iframe.src = chrome.runtime.getURL('frame2.html');


            iframe.style.cssText = 'position:fixed;top:0px;right:0px;display:block;' +
                'width:300px;height:50px;z-index:1000;';
            document.body.appendChild(iframe);
        }

        setTimeout(function () {
            iframe.style.visibility = "hidden";
        }, 3000);
    }
});
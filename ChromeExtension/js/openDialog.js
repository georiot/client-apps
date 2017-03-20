chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (window.location.href !== "chrome-extension://" + chrome.runtime.id + "/groups.html") {
        if (msg.action == 'loading') {

            var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
            if (!location.ancestorOrigins.contains(extensionOrigin)) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute("scrolling", "no");
                iframe.className = "frameAlert";

                iframe.src = chrome.runtime.getURL('alertLoadingOutside.html');


                iframe.style.cssText = 'position:fixed;top:0px;right:0px;display:block;' +
                    'width:300px;height:50px;z-index:2147483647;border:0';
                document.body.appendChild(iframe);
            }
            setTimeout(function () {
                iframe.remove();
            }, 5000);


        }


        if (msg.action == 'linkCreated') {

            var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
            if (!location.ancestorOrigins.contains(extensionOrigin)) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute("scrolling", "no");
                iframe.className = "frameAlert";
                iframe.src = chrome.runtime.getURL('alertDoneOutside.html');


                iframe.style.cssText = 'position:fixed;top:0px;right:0px;display:block;' +
                    'width:300px;height:200px;z-index:2147483647;border:0';
                document.body.appendChild(iframe);
            }

            setTimeout(function () {
                iframe.remove();
            }, 6000);
        }
    }

});
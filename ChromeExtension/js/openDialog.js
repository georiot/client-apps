// Pass the result through the frame URL, independent of third-party storage.
(function () {
    var notification;
    var timer;
    chrome.runtime.onMessage.addListener(function (message) {
        if (!['loading', 'linkCreated', 'linkError'].includes(message.action)) return;
        if (notification) notification.remove();
        clearTimeout(timer);
        if (message.action === 'linkError') {
            notification = document.createElement('div');
            notification.textContent = message.message;
            notification.style.cssText = 'position:fixed;top:0;right:0;z-index:2147483647;padding:20px;background:white;color:#222;max-width:300px;border:1px solid #ccc';
        } else {
            notification = document.createElement('iframe');
            notification.setAttribute('scrolling', 'no');
            notification.title = 'Geniuslink notification';
            var done = message.action === 'linkCreated';
            notification.src = chrome.runtime.getURL(done ? 'alertDoneOutside.html' : 'alertLoadingOutside.html') +
                (done ? '#' + new URLSearchParams({ url: message.url, copied: String(message.copied) }) : '');
            notification.style.cssText = 'position:fixed;top:0;right:0;display:block;width:300px;z-index:2147483647;border:0;height:' + (done ? '200px' : '50px');
        }
        (document.body || document.documentElement).appendChild(notification);
        timer = setTimeout(function () { notification.remove(); }, message.action === 'loading' ? 25000 : 10000);
    });
}());

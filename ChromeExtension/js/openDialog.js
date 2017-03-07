chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.action == 'open_dialog_box') {
        document.body.style.cursor = 'wait'; 
setTimeout(function(){  document.body.style.cursor = 'default'; }, 2000);

    }
});
chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.action == 'loading') {

  if ($.fn.bootstrapFunction) {
    // bootstrap.js already included on the site
    alert("ya hay bootstrap")
  } else {
    bootbox.alert("manuellll");
  }

        
        // wrapperDiv = document.createElement("div");
        // wrapperDiv.setAttribute("style", "position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.1;");

        // iframeElement = document.createElement("iframe");
        // iframeElement.setAttribute("style", "width: 0px; height: 0px");

        // wrapperDiv.appendChild(iframeElement);

        // modalDialogParentDiv = document.createElement("div");
        // modalDialogParentDiv.setAttribute("style", "position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

        // modalDialogSiblingDiv = document.createElement("div");

        // modalDialogTextDiv = document.createElement("div");
        // modalDialogTextDiv.setAttribute("style", "text-align:center");

        // modalDialogTextSpan = document.createElement("span");
        // modalDialogText.innerHTML = "Generating shortlink...";

        // breakElement = document.createElement("br");
        // imageElement = document.createElement("img");
        // imageElement.src = chrome.extension.getURL("spinner_progress.gif");

        // modalDialogTextSpan.appendChild(modalDialogText);
        // modalDialogTextDiv.appendChild(modalDialogTextSpan);
        // modalDialogTextDiv.appendChild(breakElement);
        // modalDialogTextDiv.appendChild(breakElement);
        // modalDialogTextDiv.appendChild(imageElement);

        // modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
        // modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

        // document.body.appendChild(wrapperDiv);
        // document.body.appendChild(modalDialogParentDiv);

    }

    if (msg.action == 'linkCreated') {
        // wrapperDiv.remove();
        // modalDialogParentDiv.remove();

        // wrapperDiv = document.createElement("div");
        // wrapperDiv.setAttribute("style", "position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.1;");

        // iframeElement = document.createElement("iframe");
        // iframeElement.setAttribute("style", "width: 0px; height: 0px");

        // wrapperDiv.appendChild(iframeElement);

        // modalDialogParentDiv = document.createElement("div");
        // modalDialogParentDiv.setAttribute("style", "position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

        // modalDialogSiblingDiv = document.createElement("div");

        // modalDialogTextDiv = document.createElement("div");
        // modalDialogTextDiv.setAttribute("style", "text-align:center");

        // modalDialogTextSpan = document.createElement("span");
        // modalDialogText = document.createElement("strong");
        // modalDialogText.innerHTML = "Se creo, meowwww!!!";

        // breakElement = document.createElement("br");
        // imageElement = document.createElement("img");
        // imageElement.src = chrome.extension.getURL("spinner_progress.gif");

        // modalDialogTextSpan.appendChild(modalDialogText);
        // modalDialogTextDiv.appendChild(modalDialogTextSpan);
        // modalDialogTextDiv.appendChild(breakElement);
        // modalDialogTextDiv.appendChild(breakElement);
        // modalDialogTextDiv.appendChild(imageElement);

        // modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
        // modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

        // document.body.appendChild(wrapperDiv);
        // document.body.appendChild(modalDialogParentDiv);

        // setTimeout(function () {
        //     wrapperDiv.remove();
        //     modalDialogParentDiv.remove();
        // }, 2000);
    }

});
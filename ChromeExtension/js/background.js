// Popup bridge: background work survives the popup closing.
async function createGeniusCurrentTab() {
    try {
        var result = await chrome.runtime.sendMessage({ name: 'CreateCurrentLink' });
        if (!result || result.error) throw new Error(result && result.error || 'Could not create the link.');
        if (!result.copied) {
            alert('Your link was created, but could not be copied. Copy it here: ' + result.url);
            window.location.href = 'groups.html';
            return;
        }
        window.location.href = 'alertDoneInside.html';
    } catch (error) {
        alert(error.message);
        window.location.href = 'groups.html';
    }
}

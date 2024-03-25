// Called when the user clicks on the action icon.
chrome.action.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['bookmark-url.js']
    });
});



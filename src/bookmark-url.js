(function () {
    var id = 'ad-inspector';
    var script = document.getElementById(id);
    if (!script) {
        script = document.createElement('script');
        script.src = chrome.runtime.getURL('loader.js');
        script.id = id;
        document.body.appendChild(script);
    }
})();

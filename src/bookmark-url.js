(function () {
    var id = 'ad-inspector';
    var script = document.getElementById(id);
    if (!script) {
        script = document.createElement('script');
        script.src = 'https://forbes.github.io/ad-inspector/dist/ad-inspector.bundle.js';
        script.id = id;
        document.body.appendChild(script);
    }
})();

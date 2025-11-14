
document.addEventListener("DOMContentLoaded", function () {
    const url = document.getElementById("google_translate").src;
    if (!url) {
        loadFrame();
    }
});

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "initPopup") {
        loadFrame(message.text);
    }
});

function loadFrame(text = '') {
    Config.getOption('translateURL').then(url => {
        if (url) {
            document.getElementById("google_translate").src = url + encodeURIComponent(text);
        }
    });
}

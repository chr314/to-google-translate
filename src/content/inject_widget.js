if (document.getElementById(":1.container")) {
    injectScriptContent(`window.tgt_googleTranslate?.showBanner(true)`)
} else {
    Config.loadConfig().then(() => {
        const config = Config.config;

        document.body.insertAdjacentHTML("beforeend", `<div id="tgt_google_translate_element" style="display: none"></div>`);

        injectScriptContent(`var tgt_googleTranslate;
            function tgt_googleTranslateElementInit() {
                window.tgt_googleTranslate = new google.translate.TranslateElement({
                    pageLanguage: '${config.tpPageLang}',
                    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
                }, 'tgt_google_translate_element');
                
                const checkExist = setInterval(function () {
                    if (document.getElementById(":1.container")) {
                        document.querySelector('#tgt_google_translate_element select').value = '${config.tpUserLang}';
                        document.querySelector('#tgt_google_translate_element select').dispatchEvent(new Event('change'));
                        clearInterval(checkExist);
                    }
                }, 300);
            }`);

        const widgetScript = document.createElement('script');
        widgetScript.src = "//translate.google.com/translate_a/element.js?cb=tgt_googleTranslateElementInit";
        document.head.appendChild(widgetScript);
    });

}

function injectScriptContent(scriptContent) {
    const callbackScript = document.createElement('script');
    callbackScript.type = 'text/javascript';
    callbackScript.text = scriptContent;
    document.body.appendChild(callbackScript);
}

// depends: jquery、i18next、jquery-i18next
var translatedLngs = {
    zh: '简体中文',
    en: 'English',
    ru: 'Pусский'
};
var supportedLngs = Object.keys(translatedLngs);
var defaultLng = 'zh';

var lang = window.location.hash.replace('#', '');
if (supportedLngs.indexOf(lang) === -1) {
    lang = defaultLng;
}

$.getJSON(`./locales/${lang}/resource.json`).then((res) => {
    console.log(res)
    i18next.init({
        lng: lang,
        debug: true,
        resources: {
            [lang]: {
                translation: res
            }
        }
    }).then(function () {
        jqueryI18next.init(i18next, $, {
            tName: 't', // --> appends $.t = i18next.t
            i18nName: 'i18n', // --> appends $.i18n = i18next
            handleName: 'localize', // --> appends $(selector).localize(opts);
            selectorAttr: 'data-i18n', // selector for translating elements
            targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if different than itself)
            optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
            useOptionsAttr: false, // see optionsAttr
            parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
        });
        $("body").localize();
    })
})
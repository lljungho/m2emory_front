import i18n from "./i18n";

export const getNowLanguage = () => {
    return i18n.language;
};

export const getLanguages = () => {
    return Object.keys(i18n.options.resources);
};

export const getLanguageNames = () => {
    return {
        KR: '한국어',
        JP: '日本語',
        CN: '中文',
        EN: 'English'
    };
};

export const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    sessionStorage.setItem('lng', lng);
};
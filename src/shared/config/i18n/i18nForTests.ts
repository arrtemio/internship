import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: false,
        resources: {
            en: {
                translation: {
                    Lang: 'EN',
                },
            },
            pl: {
                translation: {
                    Lang: 'PL',
                },
            },
        },
    });

export default i18n;

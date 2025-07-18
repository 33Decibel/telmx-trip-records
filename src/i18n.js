import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationGr from './locales/gr.json';
import translationIT from './locales/it.json';
import translationSP from './locales/sp.json';
import translationENG from './locales/en.json';
import translationFR from './locales/fr.json';
import translationIN from './locales/in.json';

// the translations
const resources = {
  gr: {
    translation: translationGr,
  },
  it: {
    translation: translationIT,
  },
  sp: {
    translation: translationSP,
  },
  en: {
    translation: translationENG,
  },
  fr: {
    translation: translationFR,
  },
  in: {
    translation: translationIN,
  },
};

const language = localStorage.getItem('I18N_LANGUAGE');
if (!language) {
  localStorage.setItem('I18N_LANGUAGE', 'en');
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('I18N_LANGUAGE') || 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

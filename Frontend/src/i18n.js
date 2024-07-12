// import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend"

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next).use(Backend)
//   .init({
//     debug: true,
//     fallbackLng: 'en',
//     returnObjects:true,
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;



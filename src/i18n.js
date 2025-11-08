import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  // load translations using http (default public/locales/{lng}/translation.json)
  .use(Backend)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    lng: "en", // Force English language
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;

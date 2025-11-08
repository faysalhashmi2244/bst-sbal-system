import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = t("direction");
    document.documentElement.lang = lng;
  };

  useEffect(() => {
    // Set initial direction based on current language
    document.documentElement.dir = t("direction");
    document.documentElement.lang = i18n.language;
  }, [i18n.language, t]);

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        {t("language.english")}
      </button>
      <span className="divider">|</span>
      <button
        className={`lang-btn ${i18n.language === "ar" ? "active" : ""}`}
        onClick={() => changeLanguage("ar")}
      >
        {t("language.arabic")}
      </button>
    </div>
  );
};

export default LanguageSelector;

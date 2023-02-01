import en from "./utils/Lang/en.json";
import vn from "./utils/Lang/vn.json";

const translations = {
  en,
  vn,
};

export function getTranslation(key, language) {
  return translations[language][key];
}

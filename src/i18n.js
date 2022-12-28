import { createI18n } from "vue-i18n/dist/vue-i18n.cjs";
import ar from "@/lang/ar.json";
import en from "@/lang/en.json";

function loadLocaleMessages() {
  const locales = { ar, en };
  const messages = {};
  Object.keys(locales).forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  allowComposition: true,
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export default i18n;

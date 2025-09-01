import { d as defineCachedEventHandler, g as getRouterParam } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';

const _locale__get = defineCachedEventHandler(async (event) => {
  const locale = getRouterParam(event, "locale");
  const translations = await getTranslations(locale);
  return translations;
});
async function getTranslations(locale) {
  const baseTranslations = {
    cs: {
      navigation: {
        home: "Dom\u016F",
        thanks: "D\u011Bkujeme"
      },
      common: {
        welcome: "V\xEDtejte",
        loading: "Na\u010D\xEDt\xE1 se...",
        error: "Chyba"
      }
    },
    en: {
      navigation: {
        home: "Home",
        thanks: "Thank you bro"
      },
      common: {
        welcome: "Welcome",
        loading: "Loading...",
        error: "Error"
      }
    }
  };
  return baseTranslations[locale] || {};
}

export { _locale__get as default };
//# sourceMappingURL=_locale_.get.mjs.map

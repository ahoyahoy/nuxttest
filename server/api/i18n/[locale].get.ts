export default defineCachedEventHandler(async (event) => {
  const locale = getRouterParam(event, 'locale') as string

  const translations = await getTranslations(locale)

  return translations
})

async function getTranslations(locale: string) {
  const baseTranslations = {
    cs: {
      navigation: {
        home: "Domů",
        thanks: "Děkujeme"
      },
      common: {
        welcome: "Vítejte",
        loading: "Načítá se...",
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
  }

  return baseTranslations[locale as keyof typeof baseTranslations] || {}
}

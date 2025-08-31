export default defineI18nLocale(locale => {
  return $fetch(`/api/i18n/${locale}`)
})
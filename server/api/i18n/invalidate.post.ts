export default defineEventHandler(async (event) => {
  // TODO: invalidate all i18n cache
  
  return { success: true, message: 'All i18n cache invalidated' }
})

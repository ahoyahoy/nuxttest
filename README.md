

# Nuxt 4 Experimental Project

This project serves as a learning ground for Nuxt 4, testing various approaches to solve common problems in larger applications.

## 🎯 What's Completed

### Data Management ✅
_**Custom TanStack Query pattern**_ - implementation for efficient data handling
- **Custom hooks** - demonstrated in [app/data/hooks/players.ts](app/data/hooks/players.ts)
- **Optimistic updates** - implemented for player deletion (immediate UI updates)
- **Automatic refetch** after adding new players
  - Player sorting is not possible due to missing `createDate` field
  - Also uses UUID v4 format for IDs, which is not suitable for chronological sorting
- **Server-side validation** - player creation form handles server errors
    - ability to submit invalid IČ for testing (Zod schema condition is commented out to allow this)
- **Get Single item without proper api** - demonstrated in [app/data/hooks/classes.ts](app/data/hooks/classes.ts) with `useClassQuery` function
- **RPC types integration** - implementation in [app/data/api/players.ts](app/data/api/players.ts)
- **Keys factory** - TanStack keys factory in [app/data/utils/keys-factory.ts](app/data/utils/keys-factory.ts) ensures idiomatic cache key management

### Product Config ✅
- Each product has its own config, selected at build time from `NODE_ENV`
- Example in [app/config/products/dm-cz.ts](app/config/products/dm-cz.ts)

## 🚧 Work in Progress

### Dynamic Router
- **Problem**: Not using standard `pages/` because I want to define custom components for specific routes per product
- **Possible solution**: There might be a better way, still looking for a more elegant approach

### Translations (i18n) 
**Status**: Translations are working, but haven't figured out yet how to connect custom router with i18n for dynamic URL translations

**Next Goal**: Extract translations from the application for better maintainability

**Architecture**:
1. **Default translations** - defined outside Vue components
2. **Translation collection** - script collects translations and stores them in MongoDB as `key: translation` for default language
3. **Translator admin** - can override any default key with custom translation for any language (including 'en')
4. **Publishing** - merges individual keys into a single JSON and uploads to Redis
5. **Application** - fetches from Redis with aggressive caching
6. **Invalidation** - translation publish invalidates API route

**Benefits**:
- Developer doesn't need to handle translations
- Dictionary currency is maintained automatically
- Publishing without redeploy
- Code changes automatically update the base in MongoDB



## 🔄 Postponed

### Monorepo
- **Problem**: Had some issues with Nuxt 4
- **Status**: Postponed for later

## 📝 Notes
- Everything is WIP (Work In Progress)
- Only data management is truly complete
- Experimenting with various approaches, not all are final

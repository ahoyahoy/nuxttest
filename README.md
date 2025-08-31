

# Work Showcase - Nuxt 4 with TanStack Query


## Data Management
_**My Custom TanStack Query pattern**_ - implementation for efficient data handling
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

## Translations
*Coming soon*

## Dynamic Router
*Coming soon*
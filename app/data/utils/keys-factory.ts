type Scopes = 'players' | 'classes' | 'races'
type Kind = 'list' | 'item'
type Params = Record<string, any>
type QueryKey = readonly unknown[]

function sortObjectKeys<T extends Record<string, any>>(obj: T): T {
  const sorted = {} as T
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key as keyof T] = obj[key]
    })

  return sorted
}

/**
 * Factory function to create keys for TanStack Query
 *
 * @example
 * const kf = keysFactory('players')
 * const key = kf.create('item', {playerId: '123'})
 *
 * @param scope - the scope of the keys
 */
export const keysFactory = (scope: Scopes) => ({
  create: <T extends Params>(
    kind: Kind,
    params?: T,
  ) => {
    const key: unknown[] = [
      scope,
      kind,
    ]

    if (params) {
      key.push(sortObjectKeys(params))
    }

    return key as QueryKey
  },
})

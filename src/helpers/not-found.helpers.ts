export enum QueryBy {
  Email = 'email',
  Handle = 'handle',
  Id = 'id',
  Date = 'date',
}

export enum SearchedEntity {
  User = 'user',
  Event = 'event',
}
export const notFoundMessage = (
  searchedEntity: string,
  queryBy: QueryBy,
  query: string,
): string => {
  return `${searchedEntity} not found with ${queryBy} ${query}`;
};

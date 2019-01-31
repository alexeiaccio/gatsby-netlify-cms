// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPage = `query GetPage($id: ID!, $slug: String!) {
  getPage(id: $id, slug: $slug) {
    id
    slug
    view
    burn
  }
}
`;
export const listPages = `query ListPages(
  $filter: TablePageFilterInput
  $limit: Int
  $nextToken: String
) {
  listPages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      slug
      view
      burn
    }
    nextToken
  }
}
`;

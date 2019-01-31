// eslint-disable
// this is an auto generated file. This will be overwritten

export const getKrapiva = `query GetKrapiva($id: ID!, $slug: String!) {
  getKrapiva(id: $id, slug: $slug) {
    id
    slug
    view
    burn
  }
}
`;
export const listKrapivas = `query ListKrapivas(
  $filter: TableKrapivaFilterInput
  $limit: Int
  $nextToken: String
) {
  listKrapivas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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

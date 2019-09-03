import * as React from 'react'
import { graphql } from 'gatsby'
import { get, find } from 'lodash'

import { Layout, CategoryBody } from '@krapiva-org/theme'
import { translite } from '@krapiva-org/utils'

function CategoryPage({ data, location, pageContext}) {
  const node = get(data.allPrismicArticles, 'nodes.0')
  const title = find(
    get(node, 'tags', []),
    tag => (translite(tag) === pageContext.slug)
  )

  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
    >
    <CategoryBody
      title={title || ''}
      articles={data.allPrismicArticles.nodes}
    />
    </Layout>
  )
}

export const PagetQuery = graphql`
  query CategoryQuery($slug: [String]) {
    site {
      siteMetadata {
        siteTitle
        siteMotto
        siteUrl
      }
    }
    prismicIndex {
      data {
        title {
          text
        }
        categories {
          categorytitle {
            text
          }
          categorydescription {
            html
          }
        }
        body {
          __typename
          ... on PrismicIndexBodyBanner {
            primary {
              bannerbutton
              expiredate(difference: "days")
              bannertext {
                html
              }
              bannerlink {
                url
                target
              }
            }
          }
          ... on PrismicIndexBodyHighlight {
            primary {
              image {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 80) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
              text {
                html
              }
              link {
                url
                target
              }
              expiredate(difference: "days")
            }
          }
        }
      }
    }
    allPrismicArticles(
      filter: {tags: {}, fields: {tags: {in: $slug}}},
      sort: {fields: first_publication_date, order: DESC}
    ) {
      nodes {
        fields {
          slug
          tags
        }
        first_publication_date(locale: "ru", formatString: "DD MMMM YYYY")
        tags
        href
        data {
          title {
            text
          }
          image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 640, quality: 80) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          authors {
            author {
              document {
                ... on PrismicAuthors {
                  data {
                    name
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryPage

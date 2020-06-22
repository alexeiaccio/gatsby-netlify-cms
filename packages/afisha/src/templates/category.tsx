import * as React from 'react'
import { graphql } from 'gatsby'
import { get, find } from 'lodash'

import { Layout, AfishaBody, Places } from '@krapiva-org/theme'
import { translite } from '@krapiva-org/utils'

function CategoryPage({ data, location, pageContext}) {
  const node = [
    ...get(data.allPrismicEvents, 'nodes.0.tags', []),
    ...get(data.allPrismicPlaces, 'nodes.0.tags', [])
  ]
  const title = find(
    node,
    tag => (translite(tag) === pageContext.slug)
  )

  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: title,
        image: get(node, 'data.image'),
      }}
    >
      <AfishaBody
        events={data.allPrismicEvents.nodes}
        title={`${title || ''} | События`}
        location={location}
      />
      <Places
        places={data.allPrismicPlaces.nodes}
        title={data.allPrismicEvents.nodes.length === 0 ? `${title || ''} | Места` : 'Места'}
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
        siteDescription
        siteKeywords
        siteThemeColor
        twitter
        fbAppId
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
        }
      }
    }
    allPrismicEvents(
      filter: {tags: {}, fields: {tags: {in: $slug}}},
      sort: {fields: data___start, order: DESC}
    ) {
      nodes {
        tags
        fields {
          slug
        }
        data {
          title {
            text
          }
          start(locale: "ru", formatString: "DD MMMM YYYY")
          starttime
          end(locale: "ru", formatString: "DD MMMM YYYY")
          description {
            html
          }
          image {
            url
            fluid(maxWidth: 640) {
              ...GatsbyPrismicImageFluid
            }
          }
          caption {
            html
          }
          links {
            link {
              url
            }
          }
          places {
            place {
              document {
                ... on PrismicPlaces {
                  fields {
                    slug
                  }
                  data {
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicPlaces(filter: {tags: {}, fields: {tags: {in: $slug}}}) {
      nodes {
        fields {
          slug
        }
        tags
        href
        data {
          title {
            text
          }
          address
          image {
            alt
            url
            fluid(maxWidth: 640) {
              ...GatsbyPrismicImageFluid
            }
          }
        }
      }
    }
  }
`

export default CategoryPage

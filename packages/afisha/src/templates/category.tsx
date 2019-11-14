import * as React from 'react'
import { graphql } from 'gatsby'
import { get, find } from 'lodash'

import { Layout, AfishaBody } from '@krapiva-org/theme'
import { translite } from '@krapiva-org/utils'

function CategoryPage({ data, location, pageContext}) {
  const node = get(data.allPrismicEvents, 'nodes.0')
  const title = find(
    get(node, 'tags', []),
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
        title={title || ''}
        location={location}
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
      sort: {fields: first_publication_date, order: DESC}
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
            localFile {
              childImageSharp {
                fluid(maxWidth: 640, quality: 80) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
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
  }
`

export default CategoryPage

import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, PlaceBody } from '@krapiva-org/theme'

function PlacePage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: get(data.prismicPlaces, 'data.title.text'),
        image: get(data.prismicPlaces, 'data.image'),
      }}
    >
      <PlaceBody
        place={data.prismicPlaces}
        events={data.allPrismicEvents.nodes}
        location={location}
      />
    </Layout>
  )
}

export const PageQuery = graphql`
  query PlaceQuery($slug: String!) {
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
    prismicPlaces(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      first_publication_date
      tags
      href
      data {
        title {
          text
        }
        description {
          html
        }
        address
        links {
          link {
            url
          }
        }
        image {
          alt
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 80) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        caption {
          html
        }
      }
    }
    allPrismicEvents(
      filter: {fields: {places: {in: [$slug]}}},
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

export default PlacePage

import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import { Layout, EventBody } from '@krapiva-org/theme'

function EventPage({ data, location }: any) {
  return (
    <Layout
      location={location}
      meta={data.site.siteMetadata}
      index={data.prismicIndex.data}
      seo={{
        title: get(data.prismicEvents, 'data.title.text'),
        image: get(data.prismicEvents, 'data.image'),
      }}
    >
      <EventBody event={data.prismicEvents} />
    </Layout>
  )
}

export const PageQuery = graphql`
  query EventQuery($slug: String!) {
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
    prismicEvents(fields: { slug: { eq: $slug } }) {
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
        start(locale: "ru", formatString: "DD MMMM YYYY")
        starttime
        end(locale: "ru", formatString: "DD MMMM YYYY")
        description {
          html
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
`

export default EventPage
